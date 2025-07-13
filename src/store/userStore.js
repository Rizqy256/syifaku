import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: JSON.parse(localStorage.getItem('user')) || null
  }),
  getters: {
    isLoggedIn: (state) => !!state.currentUser,
    role: (state) => state.currentUser?.role || '',
    name: (state) => state.currentUser?.name || '',
    id: (state) => state.currentUser?.id || '' // ✅ Getter user ID untuk digunakan di query
  },
  actions: {
    login(user) {
      this.currentUser = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    logout() {
      this.currentUser = null
      localStorage.removeItem('user')
    }
  }
})
