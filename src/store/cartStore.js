import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),

  actions: {
    addToCart(product) {
      const existing = this.items.find(item => item.id === product.id)
      if (existing) {
        existing.quantity++
      } else {
        this.items.push({ ...product, quantity: 1 })
      }
    },
    remove(product) {
      this.items = this.items.filter(item => item.id !== product.id)
    },
    increase(product) {
      const item = this.items.find(i => i.id === product.id)
      if (item) item.quantity++
    },
    decrease(product) {
      const item = this.items.find(i => i.id === product.id)
      if (item && item.quantity > 1) item.quantity--
    },
    clearCart() {
      this.items = []
    }
  },

  getters: {
    totalPrice(state) {
      return state.items.reduce((total, item) => total + item.price * item.quantity, 0)
    }
  }
})
