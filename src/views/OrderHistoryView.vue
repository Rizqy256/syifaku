<template>
  <div class="riwayat-wrapper">
    <h1 class="riwayat-title">🧾 Riwayat Pesanan</h1>

    <div v-if="orders.length === 0" class="empty-message">
      Tidak ada riwayat pesanan.
    </div>

    <div
      v-for="order in orders"
      :key="order.id"
      class="order-card"
    >
      <div class="order-header">
        <p class="order-date">📅 <strong>Tanggal:</strong> {{ new Date(order.date).toLocaleString() }}</p>
        <span class="order-id">#{{ order.id }}</span>
      </div>

      <ul class="order-items">
        <li v-for="item in order.items" :key="item.id">
          🍽️ {{ item.name }} x{{ item.quantity }} = 
          <strong>Rp{{ (item.price * item.quantity).toLocaleString() }}</strong>
        </li>
      </ul>

      <div class="order-total">
        💰 <strong>Total:</strong> Rp{{ getOrderTotal(order).toLocaleString() }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useUserStore } from '@/store/userStore'

const orders = ref([])
const user = useUserStore()

onMounted(async () => {
  const res = await axios.get(`http://localhost:3000/orders?userId=${user.id}`)
  orders.value = res.data
})

function getOrderTotal(order) {
  return order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}
</script>

<style scoped>
.riwayat-wrapper {
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(to bottom, #f0fff4, #dcfce7);
  font-family: 'Segoe UI', sans-serif;
}

.riwayat-title {
  text-align: center;
  font-size: 2.2rem;
  font-weight: bold;
  color: #166534;
  margin-bottom: 2rem;
  border-bottom: 3px solid #86efac;
  padding-bottom: 0.5rem;
}

.empty-message {
  text-align: center;
  font-size: 1rem;
  color: #888;
  margin-top: 2rem;
}

.order-card {
  background: #fff;
  border: 1px solid #bbf7d0;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.1);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  transition: transform 0.2s, box-shadow 0.3s;
}

.order-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(34, 197, 94, 0.15);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #065f46;
  font-weight: bold;
  margin-bottom: 1rem;
}

.order-date {
  font-size: 1rem;
}

.order-id {
  background-color: #d1fae5;
  color: #15803d;
  padding: 4px 10px;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 600;
}

.order-items {
  padding-left: 1.2rem;
  color: #374151;
  font-size: 1rem;
  list-style: disc;
  margin-bottom: 0.5rem;
}

.order-items li {
  margin-bottom: 0.3rem;
}

.order-total {
  text-align: right;
  font-weight: bold;
  color: #166534;
  font-size: 1rem;
  margin-top: 0.5rem;
}
</style>
