<template>
  <form class="space-y-4" @submit.prevent>
    <h2 class="font-stylized text-xl font-bold flex items-start gap-2 truncate">
      Delete Account
      <span class="badge badge-sm badge-primary">Coming Soon</span>
    </h2>
    <p>
      Deleting your account is perminant and cannot be undone. Any data you've created or updated
      will be changed to "Deleted User". You cannot restore your account once deleted.
    </p>
    <button class="btn btn-error" type="submit" disabled>Delete</button>
  </form>
</template>
