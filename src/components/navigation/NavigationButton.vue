<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps<{ to: { name?: string; path?: string }; text: string }>()
</script>

<template>
  <RouterLink :to="props.to">
    <button class="nav-btn">
      <div class="nav-btn__icon">
        <slot name="icon"></slot>
      </div>

      <span class="nav-btn__text">{{ props.text }}</span>
    </button>
  </RouterLink>
</template>
<style scoped>
.nav-btn {
  display: flex;
  flex-direction: column;
  width: 70px;
  align-items: center;
  border-radius: 8px;
}
.nav-btn__text {
  color: #3c404d;
  font-weight: bold;
}
</style>
