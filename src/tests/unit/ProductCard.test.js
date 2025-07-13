import { mount } from '@vue/test-utils'
import ProductCard from '@/components/ProductCard.vue'

test('renders product name', () => {
  const wrapper = mount(ProductCard, {
    props: {
      product: { id: 1, name: 'Burger', price: 20000, image: '', description: '' }
    }
  })
  expect(wrapper.text()).toContain('Burger')
})
