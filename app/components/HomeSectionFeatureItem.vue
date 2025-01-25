<script lang="ts" setup>
defineProps<{
    icon: string;
    feature: string;
    body?: string;
}>();
</script>

<template>
    <li
        class="bg-secondary/10 ring ring-inset ring-secondary/50 p-8 rounded-xl space-y-2"
    >
        <p
            class="text-secondary text-lg font-overpass font-bold flex items-center gap-4"
        >
            <span :class="`${icon} size-7 text-secondary`" />
            <span class="pt-1">{{ feature }}</span>
        </p>
        <p v-if="body">{{ body }}</p>
        <slot v-else />
    </li>
</template>
