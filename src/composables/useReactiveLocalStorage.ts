import { ref, onMounted, onUnmounted, watchEffect } from 'vue'

export function useReactiveLocalStorage(key) {
  const localStorageData = ref(localStorage.getItem('status') || 'ready')

  // Update localStorage when the value changes
  function updateLocalStorage(value) {
    localStorage.setItem(key, value)
  }

  // Watch for storage events from other tabs/windows
  function handleStorageChange(event) {
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
        console.log('Action completed.')
      }, 2000)
    } else {
      console.log('Action is already in progress.')
    }
  }

  // Listen for storage changes on component mount
  onMounted(() => {
    window.addEventListener('storage', handleStorageChange)
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
// import { ref, onMounted, onUnmounted, watchEffect } from 'vue'

// export function useReactiveLocalStorage(key) {
//   const localStorageData = ref(localStorage.getItem(key))

//   // Update localStorage when the value changes
//   function updateLocalStorage(value) {
//     localStorage.setItem(key, value)
//   }

//   // Watch for storage events from other tabs/windows
//   function handleStorageChange(event) {
//     if (event.key === key) {
//       localStorageData.value = event.newValue
//     }
//   }

//   function removeLocalStorage() {
//     localStorage.removeItem(key)
//   }

//   const performAction = () => {
//     if (status.value === 'ready') {
//       status.value = 'processing';
//       updateLocalStorage('processing');

//       // Simulating async operation (replace with your actual logic)
//       setTimeout(() => {
//         status.value = 'ready';
//         updateLocalStorage('ready');
//         console.log('Action completed.');
//       }, 2000);
//     } else {
//       console.log('Action is already in progress.');
//     }
//   };

//   // Listen for storage changes on component mount
//   onMounted(() => {
//     window.addEventListener('storage', handleStorageChange)
//   })

//   // Remove event listener on component unmount
//   onUnmounted(() => {
//     window.removeEventListener('storage', handleStorageChange)
//   })

//   watchEffect(() => {
//     console.log('state change')
//   })

//   return { localStorageData, updateLocalStorage, removeLocalStorage }
// }
