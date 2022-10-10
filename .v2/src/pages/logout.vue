<script lang="ts" setup>
import { useAuthStore } from '~~/stores/useAuthStore';
import { SECOND } from '~~/utils/time';

useHead({
  title: 'Logout – Anime Skip',
});

const auth = useAuthStore();

onMounted(() =>
  setTimeout(() => {
    auth.clearLoggedInDetails();
    navigateTo('/login');
  }, SECOND),
);
</script>
