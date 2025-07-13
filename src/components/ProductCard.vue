<template>
  <div class="card">
    <img :src="product.image" alt="product" />
    <h2>{{ product.name }}</h2>
    <p class="desc">{{ product.description }}</p>
    <p class="price">Rp{{ product.price.toLocaleString() }}</p>
    <button @click="handleAdd">Tambah ke Keranjang</button>

  </div>
</template>

<script setup>
import { useCartStore } from '@/store/cartStore'
import { useUserStore } from '@/store/userStore'
import { useRouter } from 'vue-router'

const props = defineProps(['product'])
const cart = useCartStore()
const user = useUserStore()
const router = useRouter()

function handleAdd() {
  if (!user.isLoggedIn) {
    alert('Silakan login terlebih dahulu untuk menambahkan ke keranjang.')
    router.push('/login')
    return
  }

  cart.addToCart(props.product)
}
</script>


<style scoped>
.card {
  background: #fff;
  border: 1px solid #91c68e;
  border-radius: 15px;
  padding: 1rem;
  box-shadow: 0 4px 10px rgba(236, 72, 153, 0.1);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(236, 72, 153, 0.2);
}

.card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1rem;
}

.card h2 {
  font-size: 1.2rem;
  color: #16a34a;
  margin-bottom: 0.3rem;
}

.card .desc {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 0.5rem;
  flex-grow: 1;
}

.card .price {
  font-weight: bold;
  font-size: 1rem;
  color: #1aff00;
  margin-bottom: 1rem;
}

.card button {
  background-color: #21a229;
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.card button:hover {
  background-color: #b9b7b7;
}
</style>
