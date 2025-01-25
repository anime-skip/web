<script lang="ts" setup>
defineProps<{
    icon: string;
    feature: string;
    description: string;
}>();
</script>

<template>
    <li
        class="bg-secondary/10 ring ring-inset ring-secondary/50 p-8 rounded-xl"
    >
        <p
            class="text-secondary pb-4 text-lg font-overpass font-bold flex items-center gap-4"
        >
            <span :class="`${icon} size-7 text-secondary`" />
            <span class="pt-1">{{ feature }}</span>
        </p>
        <p>{{ description }}</p>
    </li>
</template>
