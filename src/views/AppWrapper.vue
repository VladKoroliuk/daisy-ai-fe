<script setup lang="ts">
import ApplicationWrapper from '@/components/ApplicationWrapper.vue'
</script>
<template>
  <Suspense>
    <ApplicationWrapper>
      <RouterView></RouterView>
    </ApplicationWrapper>
    <template #fallback>
      <div class="loading-screen">
        <span class="loading loading-spinner loading-lg"></span>
      </div>
    </template>
  </Suspense>
</template>
