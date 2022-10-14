<script lang="ts" setup>
import { useAuthStore } from '~~/stores/useAuthStore';
import { ManagedApiClientFragment } from '~~/utils/graphql.generated';

type FormData = Pick<ManagedApiClientFragment, 'appName' | 'description' | 'rateLimitRpm'>;

const props = defineProps<{
  defaults: FormData;
  submitLabel: string;
  disabled?: boolean;
}>();

const emits = defineEmits<{
  (event: 'submit', data: FormData): void;
}>();

function reset(resetTo: FormData) {
  validation.value.$reset();
  state.appName = resetTo.appName;
  state.description = resetTo.description;
  state.rateLimitRpm = resetTo.rateLimitRpm;
}

const { state, validation } = useEditApiClientForm();
watch(() => props.defaults, reset);

function submit() {
  if (validation.value.$error) {
    validation.value.$touch();
    return;
  }
  emits('submit', state);
  reset(props.defaults);
}

const auth = useAuthStore();
</script>

<template>
  <form class="flex flex-col gap-2" @submit.prevent="submit()">
    <!-- App Name -->
    <base-input-group>
      <template #labelTl>App Name</template>
      <template #default>
        <input class="input w-full" v-model="validation.appName.$model" :disabled="disabled" />
      </template>
    </base-input-group>

    <!-- Description -->
    <base-input-group>
      <template #labelTl>Description</template>
      <template #default>
        <input class="input w-full" v-model="validation.description.$model" :disabled="disabled" />
      </template>
    </base-input-group>

    <!-- Rate Limit -->
    <base-input-group>
      <template #labelTl>Rate Limit (RPM)</template>
      <template #default>
        <input
          class="input w-full"
          type="number"
          v-model="validation.rateLimitRpm.$model"
          :disabled="disabled || !auth.canChangeApiClientRateLimit"
        />
      </template>
    </base-input-group>

    <button v-if="!disabled" class="btn btn-primary">
      {{ submitLabel ?? 'Save' }}
    </button>
  </form>
</template>
