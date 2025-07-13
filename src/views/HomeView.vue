<template>
  <section class="home">
    <div class="overlay"></div>
    <div class="content">
      <div class="header">
        <h1>Selamat Datang di <span class="brand">FoodOrder</span></h1>
        <p>Pesan makanan favoritmu secara online dengan mudah dan cepat.</p>
        <button class="main-pesan-button" @click="goToMenu">
          Pesan Sekarang
        </button>
      </div>

      <!-- ✅ Tampilkan hanya produk yang valid -->
      <div class="products">
        <div
          v-for="item in validProducts"
          :key="item.id"
          class="product-card"
        >
          <img :src="item.image" alt="makanan" />
          <h2>{{ item.name }}</h2>
          <p class="desc">{{ item.description }}</p>
          <p class="price">Rp{{ item.price.toLocaleString() }}</p>
          <button class="pesan-button" @click="goToMenu">
            Pesan Sekarang
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const products = ref([])
const router = useRouter()

const goToMenu = () => {
  router.push('/menu')
}

// ✅ computed untuk filter produk yang valid (ada name, price, image)
const validProducts = computed(() =>
  Array.isArray(products.value)
    ? products.value.filter(p => p.name && p.price && p.image)
    : []
)

onMounted(async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`)
    const data = res.data

    // ✅ Tangani 2 kemungkinan format data dari API
    if (Array.isArray(data)) {
      products.value = data
    } else if (Array.isArray(data.products)) {
      products.value = data.products
    } else {
      products.value = []
      console.warn('Data dari API bukan array dan tidak punya "products"')
    }

    console.log('Produk dari API:', products.value)
  } catch (error) {
    console.error('Gagal mengambil produk dari API:', error)

    // ✅ fallback data dummy
    products.value = [
      {
        id: 1,
        name: 'Burger Premium',
        description: 'Burger dengan daging sapi premium dan keju leleh',
        price: 45000,
        image:
          'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      },
      {
        id: 2,
        name: 'Pizza Spesial',
        description: 'Pizza dengan topping lengkap dan keju mozzarella',
        price: 75000,
        image:
          'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      },
      {
        id: 3,
        name: 'Ayam Krispi',
        description: 'Ayam goreng krispi dengan bumbu spesial',
        price: 35000,
        image:
          'https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      }
    ]
  }
})
</script>



<style scoped>
.home {
  background: url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80') no-repeat center center;
  background-size: cover;
  min-height: 100vh;
  position: relative;
  font-family: 'Segoe UI', sans-serif;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.85);
}

.content {
  position: relative;
  padding: 2rem;
  z-index: 1;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 1rem;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.header h1 {
  font-size: 2.5rem;
  color: #15803d;
  margin-bottom: 0.5rem;
}

.header .brand {
  color: #22c55e;
}

.header p {
  font-size: 1.1rem;
  color: #444;
  margin-bottom: 1.5rem;
}

.main-pesan-button {
  background: linear-gradient(to right, #22c55e, #16a34a);
  color: white;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);
  margin-top: 0.5rem;
}

.main-pesan-button:hover {
  background: linear-gradient(to right, #16a34a, #15803d);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(34, 197, 94, 0.4);
}

.products {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.product-card {
  background: #ffffff;
  border: 1px solid #a7f3d0;
  border-radius: 15px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(34, 197, 94, 0.3);
}

.product-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1rem;
}

.product-card h2 {
  font-size: 1.3rem;
  color: #15803d;
  margin-bottom: 0.5rem;
}

.product-card .desc {
  font-size: 0.95rem;
  color: #555;
  margin-bottom: 1rem;
  flex-grow: 1;
}

.product-card .price {
  font-weight: bold;
  font-size: 1.1rem;
  color: #16a34a;
  margin-bottom: 1rem;
}

.pesan-button {
  background: linear-gradient(to right, #22c55e, #16a34a);
  color: white;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 10px rgba(34, 197, 94, 0.2);
  width: 100%;
}

.pesan-button:hover {
  background: linear-gradient(to right, #16a34a, #15803d);
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(34, 197, 94, 0.3);
}
</style>
