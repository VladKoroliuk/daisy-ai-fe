<script setup lang="ts">
import ChatNavigation from '@/components/navigation/ChatNavigation.vue'
</script>

<template>
  <main class="app-container">
    <ChatNavigation />
    <div class="content-container">
      <div class="chat">
        <RouterView></RouterView>
      </div>
    </div>
  </main>
</template>
