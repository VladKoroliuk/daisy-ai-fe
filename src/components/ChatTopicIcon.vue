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
  <template v-if="props.topicID == '65985e14d31307566051457a'">
    <img class="icon" src="../assets/icons/information-technology.png" />
  </template>
  <template v-if="props.topicID == '65985e39d31307566051457b'">
    <img class="icon" src="../assets/icons/history.png" />
  </template>
  <template v-if="props.topicID == '65985e48d31307566051457c'">
    <img class="icon" src="../assets/icons/chemistry.png" />
  </template>
  <template v-if="props.topicID == '659863f5d31307566051457d'">
    <img class="icon" src="../assets/icons/square.png" />
  </template>
  <template v-if="props.topicID == '6598695bd31307566051457e'">
    <img class="icon" src="../assets/icons/dna.png" />
  </template>
  <template v-if="props.topicID == '659869b2d31307566051457f'">
    <img class="icon" src="../assets/icons/poetry.png" />
  </template>
  <template v-if="props.topicID == '659869c1d313075660514580'">
    <img class="icon" src="../assets/icons/united-kingdom.png" />
  </template>
</template>
<style scoped>
.icon {
  width: 30px;
}
</style>
