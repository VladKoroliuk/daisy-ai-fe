import { ref } from 'vue'

export function useLoading(callback: Function, onError?: Function) {
  const loading = ref(false)

  const runAction = async (...args: any[]) => {
    try {
      loading.value = true
      await callback(...args)
    } catch (error) {
      if (error instanceof Error && onError) {
        onError(error)
      }
    } finally {
      loading.value = false
    }
  }

  return { runAction, loading }
}
