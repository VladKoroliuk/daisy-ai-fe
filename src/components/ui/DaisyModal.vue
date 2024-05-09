<script setup lang="ts">
import { ref, defineProps } from 'vue'

const modal = ref<null | { showModal: () => null; close: () => null }>(null)
const props = defineProps<{ isOpen: boolean }>()

const openModal = () => {
  if (modal.value) modal.value.showModal()
}

const closeModal = () => {
  if (modal.value) modal.value.close()
}
</script>
<template>
  <div>
    <slot name="activator" :open="openModal"></slot>
    <dialog id="modal" ref="modal" class="modal">
      <div class="modal-box">
        <slot>
          <h3 class="font-bold text-lg">Hello!</h3>
          <p class="py-4">Press ESC key or click the button below to close</p>
          <div class="modal-action">
            <form method="dialog">
              <!-- if there is a button in form, it will close the modal -->
              <button class="btn">Close</button>
            </form>
          </div>
        </slot>
      </div>
    </dialog>
  </div>
</template>
