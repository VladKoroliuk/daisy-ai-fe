<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: false
  },
  loading: {
    type: Boolean,
    required: false,
    default: false
  },
  classList: {
    type: Array,
    required: false,
    default: () => ['btn', 'btn-primary']
  }
})
</script>
<template>
  <button :class="props.classList" :disabled="props.disabled || props.loading">
    <template v-if="!props.loading">
      <slot name="icon-start"></slot>
      {{ props.label }}
      <slot name="icon-end"></slot>
    </template>
    <template v-else>
      <span class="loading loading-spinner"></span>
    </template>
  </button>
</template>
