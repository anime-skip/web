<template>
    <section id="api" class="py-32">
        <div class="px-8 max-w-200 mx-auto flex flex-col gap-8 text-center">
            <div class="flex gap-8 items-center justify-center select-none">
                <img src="app/assets/logo.svg" class="w-28" />
                <span class="i-heroicons-plus size-12 opacity-50" />
                <img src="app/assets/graphql-logo.svg" class="w-28" />
            </div>
            <h3 class="text-3xl font-overpass tracking-tighter font-black">
                Anime Skip API
            </h3>
            <p>
                Making an application and you need timestamps? Try out Anime
                Skip's API - it's free!
            </p>
            <p class="text-sm">
                <RouterLink to="/docs/api" class="link"
                    >API Documentation</RouterLink
                >
                <span class="opacity-50 select-none">&ensp;&bull;&ensp;</span>
                <a href="/playground" class="link">GraphQL Playground</a>
            </p>
        </div>
    </section>
</template>
