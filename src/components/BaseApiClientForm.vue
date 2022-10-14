<script lang="ts" setup>
import { useAuthStore } from '~~/stores/useAuthStore';
import { ManagedApiClientFragment } from '~~/utils/graphql.generated';

type FormData = Pick<ManagedApiClientFragment, 'appName' | 'description' | 'rateLimitRpm'>;

const props = defineProps<{
  defaults: FormData;
}>();

const emits = defineEmits<{
  (event: 'submit', data: FormData): Promise<void>;
}>();

function reset(resetTo: FormData) {
  validation.value.$reset();
  state.appName = resetTo.appName;
  state.description = resetTo.description;
  state.rateLimitRpm = resetTo.rateLimitRpm;
}

const { state, validation } = useEditApiClientForm();
watch(() => props.defaults, reset, { immediate: true });

function submit() {
  if (validation.value.$invalid) {
    validation.value.$touch();
    return;
  }
  emits('submit', state);
}

const auth = useAuthStore();

const hasChange = computed(
  () =>
    state.appName !== props.defaults.appName ||
    state.description !== props.defaults.description ||
    state.rateLimitRpm !== props.defaults.rateLimitRpm,
);

defineExpose({ reset });
</script>

<template>
  <form class="grid grid-flow-row grid-cols-3 gap-4" @submit.prevent.stop="submit()">
    <!-- Title -->
    <div class="col-span-3">
      <slot name="title" />
    </div>

    <!-- App Name -->
    <labeled-value class="col-span-2" label="App Name">
      <input
        class="input input-bordered focus:input-primary w-full"
        :class="{ 'input-error': validation.appName.$error }"
        v-model="validation.appName.$model"
        placeholder="Enter an app name..."
      />
    </labeled-value>

    <!-- Rate Limit -->
    <labeled-value class="col-span-1" label="Rate Limit (Requests/Minute)">
      <input
        class="input input-bordered focus:input-primary w-full"
        :class="{ 'input-error': validation.rateLimitRpm.$error }"
        type="number"
        v-model="validation.rateLimitRpm.$model"
        placeholder="None"
        :disabled="!auth.canChangeApiClientRateLimit"
      />
    </labeled-value>

    <!-- Description -->
    <labeled-value class="col-span-3" label="Description">
      <textarea
        class="input input-bordered focus:input-primary w-full py-2 min-h-[8rem] resize-y"
        :class="{ 'input-error': validation.description.$error }"
        v-model="validation.description.$model"
        placeholder="Enter a description of the app..."
      />
    </labeled-value>

    <!-- Buttons -->
    <div v-if="$slots.buttons" class="col-span-3 flex gap-4">
      <slot name="buttons" v-bind:has-change="hasChange" />
    </div>
  </form>
</template>
