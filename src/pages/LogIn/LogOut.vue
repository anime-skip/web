<template>
  <p>Logging out...</p>
</template>

<script lang="ts">
import { ActionTypes } from '@/store/action-types';
import { defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    onMounted(async () => {
      await store.dispatch(ActionTypes.LOG_OUT);
      router.push('/log-in');
    });
  },
});
</script>
