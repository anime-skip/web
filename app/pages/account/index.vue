<script setup lang="ts">
import useRequireSession from "app/composables/useRequireSession";
import ContentLayout from "app/layouts/ContentLayout.vue";

// Require the session or redirect to login page
useRequireSession();
</script>

<template>
  <ContentLayout>
    <div class="flex flex-col md:flex-row">
      <div class="md:w-64 md:self-start md:sticky md:top-main-navigation">
        <ul class="menu m-8 mb-0 md:m-8 md:mr-0 rounded-lg bg-neutral">
          <li>
            <RouterLink class="menu-item" to="/account">
              <i class="i-heroicons-user"></i>
              <span>Profile</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink class="menu-item" to="/account/security">
              <i class="i-heroicons-key"></i>
              <span>Security</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink class="menu-item" to="/account/api-clients">
              <i class="i-heroicons-cube"></i>
              <span>API Clients</span>
            </RouterLink>
          </li>
        </ul>
      </div>
      <div class="flex-1 m-8 flex flex-col gap-4">
        <RouterView />
      </div>
    </div>
  </ContentLayout>
</template>
