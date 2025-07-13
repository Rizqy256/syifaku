<template>
  <section class="riwayat">
    <h1 class="title">Riwayat Belanja</h1>

    <div v-if="loading" class="loading">Memuat riwayat...</div>
    <div v-else-if="orders.length === 0" class="empty">Belum ada riwayat belanja.</div>

    <div v-else class="orders">
      <div v-for="order in orders" :key="order.id" class="order">
        <div class="order-header">
          <h2>Pesanan #{{ order.id }}</h2>
          <span>{{ order.date }}</span>
        </div>
        <ul>
          <li v-for="item in order.items" :key="item.id">
            {{ item.name }} x{{ item.quantity }} — Rp{{ (item.price * item.quantity).toLocaleString() }}
          </li>
        </ul>
        <div class="total">Total: Rp{{ order.total.toLocaleString() }}</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/store/userStore'

const orders = ref([])
const loading = ref(true)
const user = useUserStore()

const BASE_URL = 'http://localhost:3000'

onMounted(async () => {
  try {
    const res = await axios.get(`${BASE_URL}/orders?userId=${user.id}`)
    orders.value = res.data
  } catch (err) {
    console.error('Gagal memuat data riwayat:', err)
  } finally {
    loading.value = false
  }
})
</script>



<style scoped>
.riwayat {
  padding: 2rem;
  background: linear-gradient(to bottom, #f0fff4, #dcfce7);
  min-height: 100vh;
  font-family: 'Segoe UI', sans-serif;
}

.title {
  text-align: center;
  font-size: 2rem;
  color: #15803d; /* hijau tua */
  margin-bottom: 2rem;
}

.empty {
  text-align: center;
  color: #777;
  font-size: 1rem;
}

.orders {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.order {
  background: #fff;
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid #86efac;
  box-shadow: 0 4px 10px rgba(34, 197, 94, 0.1);
}

.order-header {
  display: flex;
  justify-content: space-between;
  color: #166534; /* hijau gelap */
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.order ul {
  padding-left: 1.2rem;
  margin-bottom: 0.5rem;
  color: #444;
}

.total {
  text-align: right;
  font-weight: bold;
  color: #16a34a;
}
</style>

