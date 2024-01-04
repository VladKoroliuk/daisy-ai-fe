<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  topicID: {
    required: true,
    type: String
  }
})
</script>
<template>
  <template v-if="props.topicID == '65904a30d00fe1806e9651a7'">
    <img class="icon" src="../assets/icons/square-root.png" />
  </template>
  <template v-if="props.topicID == '659097bfe243c57d64043652'">
    <img class="icon" src="../assets/icons/shapes.png" />
  </template>
  <template v-if="props.topicID == '659097cfe243c57d64043653'">
    <img class="icon" src="../assets/icons/atom.png" />
  </template>
</template>
<style scoped>
.icon {
  width: 25px;
}
</style>
