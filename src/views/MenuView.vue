<template>
  <section class="menu">
    <h1 class="title">Daftar Makanan</h1>

    <!-- Notifikasi -->
    <div v-if="showNotif" class="toast">
      ✅ {{ notifText }}
    </div>

    <div class="product-grid">
      <ProductCard
        v-for="item in products"
        :key="item.id"
        :product="item"
        @add="addToCart(item)"
      />
    </div>
  </section>
</template>

<script setup>
import ProductCard from '@/components/ProductCard.vue'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useCartStore } from '@/store/cartStore'

const products = ref([])
const cart = useCartStore()

const showNotif = ref(false)
const notifText = ref('')

const addToCart = (item) => {
  cart.addToCart(item)
  notifText.value = `${item.name} berhasil ditambahkan ke keranjang!`
  showNotif.value = true
  setTimeout(() => {
    showNotif.value = false
  }, 2000)
}

onMounted(async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`)
  products.value = res.data
})
</script>

<style scoped>
.menu {
  background: linear-gradient(to bottom, #ffffff, #ffffff);
  min-height: 100vh;
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;
}

.title {
  text-align: center;
  font-size: 2.2rem;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 2rem;
}

.toast {
  position: fixed;
  top: 80px;
  right: 30px;
  background-color: #ffffff;
  color: #831843;
  padding: 12px 18px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(236, 72, 153, 0.3);
  font-weight: bold;
  animation: slide-in 0.3s ease, fade-out 0.5s ease 1.5s forwards;
  z-index: 999;
}

@keyframes slide-in {
  from {
    transform: translateX(150%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes fade-out {
  to {
    opacity: 0;
    transform: translateX(150%);
  }
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
