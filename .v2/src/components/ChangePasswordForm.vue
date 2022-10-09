<script lang="ts" setup></script>

<template>
  <form class="space-y-4" @submit.prevent>
    <h2 class="font-stylized text-xl font-bold">Change Password</h2>
    <base-input-group>
      <template #left>
        <div class="i-mdi-key text-xl" />
      </template>
      <template #default>
        <input
          class="input input-bordered focus:input-primary w-full"
          placeholder="Current password"
        />
      </template>
    </base-input-group>
    <base-input-group>
      <template #left>
        <div class="i-mdi-key text-xl" />
      </template>
      <template #default>
        <input class="input input-bordered focus:input-primary w-full" placeholder="New password" />
      </template>
    </base-input-group>
    <base-input-group>
      <template #left>
        <div class="i-mdi-key text-xl" />
      </template>
      <template #default>
        <input
          class="input input-bordered focus:input-primary w-full"
          placeholder="Confirm new password"
        />
      </template>
    </base-input-group>
    <button class="btn btn-primary" type="submit">Save</button>
  </form>
</template>
