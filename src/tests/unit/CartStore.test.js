import { setActivePinia, createPinia } from 'pinia'
import { useCartStore } from '@/store/cartStore'

describe('Cart Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('add item to cart', () => {
    const cart = useCartStore()
    cart.addToCart({ id: 1, name: 'Burger', price: 20000 })
    expect(cart.items.length).toBe(1)
    expect(cart.items[0].quantity).toBe(1)
  })
})
