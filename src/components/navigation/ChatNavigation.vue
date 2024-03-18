<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CreateChatForm from '../CreateChatForm.vue'
import ChatList from './ChatList.vue'
import { useChatStore } from '@/stores/chat'
import SubNavigationLayout from '@/components/navigation/SubNavigationLayout.vue'

const modal = ref<null | { showModal: () => null; close: () => null }>(null)

const store = useChatStore()

const openModal = () => {
  if (modal.value) modal.value.showModal()
}

const closeModal = () => {
  if (modal.value) modal.value.close()
}

onMounted(() => {
  if (store.chatState.length == 0) {
    openModal()
  }
})
</script>
<template>
  <SubNavigationLayout>
    <dialog ref="modal" id="my_modal_1" class="modal">
      <CreateChatForm @close="closeModal" />
    </dialog>
    <ul>
      <li class="navigation-item">
        <button
          class="btn btn-wide btn-success rounded-lg text-secondary-content"
          @click="openModal"
        >
          Створити новий чат
        </button>
      </li>
      <ChatList />
    </ul>
  </SubNavigationLayout>
</template>
