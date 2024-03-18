<script setup lang="ts">
import { defineEmits } from 'vue'

const emit = defineEmits(['select'])

function selectEducationLevel(level: number) {
  emit('select', level)
}
</script>
<template>
  <div>
    <h3 class="font-bold text-lg">Оберіть рівень освіти</h3>
    <div class="level-selector">
      <button class="btn btn-success btn-outline" @click="selectEducationLevel(0)">
        Початкова школа
      </button>
      <button class="btn btn-success btn-outline" @click="selectEducationLevel(1)">
        Середня школа
      </button>
      <button class="btn btn-success btn-outline" @click="selectEducationLevel(2)">
        Старша школа
      </button>
    </div>
  </div>
</template>
<style scoped>
.level-selector {
  margin-top: 40px;
}
.level-selector button {
  width: 100%;
  margin-top: 5px;
}
</style>
