import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const userStore = defineStore('user', () => {
  const state = reactive({
    user: {
      id: '',
      username: ''
    },
    isAuthenticate: false
  })

  return { state }
})
