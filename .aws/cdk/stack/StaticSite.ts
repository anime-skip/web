#!/usr/bin/env node
import * as cloudfront from '@aws-cdk/aws-cloudfront';
import * as route53 from '@aws-cdk/aws-route53';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3deploy from '@aws-cdk/aws-s3-deployment';
import * as acm from '@aws-cdk/aws-certificatemanager';
import * as cdk from '@aws-cdk/core';
import * as targets from '@aws-cdk/aws-route53-targets/lib';

export interface StaticSiteProps {
  domain: string;
  subdomain?: string;
  deleteOnDestroy: boolean;
}

/**
 * Static site infrastructure, which deploys site content to an S3 bucket.
 *
 * The site redirects from HTTP to HTTPS, using a CloudFront distribution,
 * Route53 alias record, and ACM certificate.
 */
export class StaticSite extends cdk.Construct {
  constructor(parent: cdk.Construct, name: string, props: StaticSiteProps) {
    super(parent, name);

    const zone = route53.HostedZone.fromLookup(this, 'Zone', { domainName: props.domain });
    const siteDomain = props.subdomain ? `${props.subdomain}.${props.domain}` : props.domain;
    new cdk.CfnOutput(this, 'Website', { value: 'https://' + siteDomain });

    // Content bucket
    const siteBucket = new s3.Bucket(this, 'WebsiteBucket', {
      bucketName: siteDomain,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html', // If the path doesn't exist, still show the same file
      publicReadAccess: true,
      removalPolicy: props.deleteOnDestroy ? cdk.RemovalPolicy.DESTROY : cdk.RemovalPolicy.RETAIN,
      autoDeleteObjects: props.deleteOnDestroy,
    });
    new cdk.CfnOutput(this, 'Bucket', { value: siteBucket.bucketName });

    // TLS certificate
    const certificateArn = new acm.DnsValidatedCertificate(this, 'WebsiteCertificate', {
      domainName: siteDomain,
      hostedZone: zone,
      region: 'us-east-1', // Cloudfront only checks this region for certificates.
    }).certificateArn;
    new cdk.CfnOutput(this, 'Certificate', { value: certificateArn });

    // CloudFront distribution that provides HTTPS
    const distribution = new cloudfront.CloudFrontWebDistribution(this, 'WebsiteDistribution', {
      aliasConfiguration: {
        acmCertRef: certificateArn,
        names: [siteDomain],
        sslMethod: cloudfront.SSLMethod.SNI,
        securityPolicy: cloudfront.SecurityPolicyProtocol.TLS_V1_1_2016,
      },
      originConfigs: [
        {
          customOriginSource: {
            domainName: siteBucket.bucketWebsiteDomainName,
            originProtocolPolicy: cloudfront.OriginProtocolPolicy.HTTP_ONLY,
          },
          behaviors: [{ isDefaultBehavior: true }],
        },
      ],
    });
    new cdk.CfnOutput(this, 'DistributionId', {
      value: distribution.distributionId,
    });

    // Route53 alias record for the CloudFront distribution
    new route53.ARecord(this, 'WebsiteAliasRecord', {
      recordName: siteDomain,
      target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
      zone,
    });

    // Deploy site contents to S3 bucket
    new s3deploy.BucketDeployment(this, 'DeployWithInvalidation', {
      sources: [s3deploy.Source.asset('./web')],
      destinationBucket: siteBucket,
      distribution,
      distributionPaths: ['/*'],
    });
  }
}
