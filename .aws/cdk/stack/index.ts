#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { StaticSite } from './StaticSite';

type Env = 'staged' | 'prod';
interface Config {
  suffix: string;
  domain: string;
  subdomain?: string;
  deleteOnDestroy: boolean;
}
const ALLOWED_ENV: Env[] = ['staged', 'prod'];
const CONFIGS: Record<Env, Config> = {
  staged: {
    suffix: 'Staged',
    domain: 'aws.anime-skip.com',
    subdomain: 'staged',
    deleteOnDestroy: true,
  },
  prod: {
    suffix: 'Prod',
    domain: 'aws.anime-skip.com',
    deleteOnDestroy: false,
  },
};

const app = new cdk.App();

const env = (app.node.tryGetContext('env') || 'staged') as Env;
if (!ALLOWED_ENV.includes(env)) {
  throw new Error("env must be 'staged' or 'prod'");
}
const config = CONFIGS[env];

class WebsiteStack extends cdk.Stack {
  constructor(parent: cdk.App, name: string, props: cdk.StackProps) {
    super(parent, name, props);
    new StaticSite(this, 'Website' + config.suffix, config);
  }
}

new WebsiteStack(app, 'WebsiteStack' + config.suffix, {
  env: { account: '954873049681', region: 'us-east-2' },
});
