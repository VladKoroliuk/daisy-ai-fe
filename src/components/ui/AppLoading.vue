<template>
  <div class="loading-container">
    <div>
      <span class="loading loading-spinner loading-lg text-info"></span>
    </div>
  </div>
</template>
<style scoped>
.loading-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.02);
  border-radius: 10px;
  display: grid;
  place-items: center;
}
.loading-container > div {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
