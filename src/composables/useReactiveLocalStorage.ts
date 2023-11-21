import { ref, onMounted, onUnmounted, watchEffect } from 'vue'

export function useReactiveLocalStorage(key: string) {
  const localStorageData = ref(localStorage.getItem('status') || 'ready')

  // Update localStorage when the value changes
  function updateLocalStorage(value: string) {
    localStorage.setItem(key, value)
  }

  // Watch for storage events from other tabs/windows
  function handleStorageChange(event: any) {
    if (event.key === key) {
      localStorageData.value = event.newValue
    }
  }

  function removeLocalStorage() {
    localStorage.removeItem(key)
  }

  const performAction = () => {
    if (localStorageData.value === 'ready') {
      localStorageData.value = 'processing'
      updateLocalStorage('processing')

      // Simulating async operation (replace with your actual logic)
      setTimeout(() => {
        localStorageData.value = 'ready'
        updateLocalStorage('ready')
      }, 2000)
    } else {
      console.log('Action is already in progress.')
    }
  }

  // Listen for storage changes on component mount
  onMounted(() => {
    window.addEventListener('storage', handleStorageChange)
    if (localStorageData.value !== 'ready') {
      localStorageData.value = 'ready'
      updateLocalStorage('ready')
    }
  })

  // Remove event listener on component unmount
  onUnmounted(() => {
    window.removeEventListener('storage', handleStorageChange)
  })

  watchEffect(() => {
    const localStorageStatus = localStorage.getItem('status') || 'ready'
    if (localStorageStatus !== localStorageData.value) {
      localStorageData.value = localStorageStatus
      if (localStorageStatus === 'ready') {
        // Perform action when status changes to 'ready'
        performAction()
      }
    }
  })

  return { localStorageData, updateLocalStorage, removeLocalStorage, performAction }
}
