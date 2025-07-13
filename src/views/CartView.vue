<template>
  <section class="cart">
    <h1 class="title">Keranjang Belanja</h1>

    <div v-if="showNotif" class="toast">
      ✅ {{ notifText }}
    </div>

    <div v-if="cart.items.length === 0" class="empty">
      Keranjang masih kosong 😢
    </div>

    <div v-else class="cart-content">
      <div v-for="item in cart.items" :key="item.id" class="cart-item">
        <img :src="item.image" alt="product" />
        <div class="info">
          <h2>{{ item.name }}</h2>
          <p class="price">Rp{{ item.price.toLocaleString() }} x {{ item.quantity }}</p>
        </div>
        <div class="actions">
          <button @click="cart.increase(item)">+</button>
          <button @click="cart.decrease(item)">-</button>
          <button @click="cart.remove(item)">🗑️</button>
        </div>
      </div>

      <div class="checkout">
        <h3>Total: Rp{{ cart.totalPrice.toLocaleString() }}</h3>
        <button class="checkout-btn" @click="checkout">Checkout</button>
      </div>
    </div>
  </section>
</template>



<script setup>
import { useCartStore } from '@/store/cartStore'
import { ref } from 'vue'
import axios from 'axios'
import { useUserStore } from '@/store/userStore'
import { useRouter } from 'vue-router'

const cart = useCartStore()
const user = useUserStore()
const router = useRouter()

const showNotif = ref(false)
const notifText = ref('')

const checkout = async () => {
  if (!user.isLoggedIn) {
    alert('Silakan login terlebih dahulu sebelum checkout.')
    router.push('/login')
    return
  }

  if (cart.items.length === 0) return

  const order = {
    date: new Date().toLocaleString(),
    items: cart.items,
    total: cart.totalPrice,
    userId: user.id // ✅ Tambahkan userId agar bisa ditampilkan di riwayat
  }

  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/orders`, order)
    cart.clearCart()
    notifText.value = 'Checkout berhasil! Riwayat telah disimpan ke server.'
    showNotif.value = true
    setTimeout(() => (showNotif.value = false), 2000)
  } catch (err) {
    alert('Gagal menyimpan riwayat ke server.')
    console.error(err)
  }
}
</script>




<style scoped>
.cart {
  background: linear-gradient(to bottom, #f0fff4, #dcfce7);
  min-height: 100vh;
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;
}

.title {
  text-align: center;
  font-size: 2.2rem;
  font-weight: bold;
  color: #16a34a; /* hijau utama */
  margin-bottom: 2rem;
}

.empty {
  text-align: center;
  font-size: 1.1rem;
  color: #777;
}

.toast {
  position: fixed;
  top: 80px;
  right: 30px;
  background-color: #bbf7d0;
  color: #065f46;
  padding: 12px 18px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(22, 163, 74, 0.3);
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

.cart-content {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.cart-item {
  background: #fff;
  border: 1px solid #86efac;
  border-radius: 15px;
  display: flex;
  padding: 1rem;
  align-items: center;
  box-shadow: 0 4px 10px rgba(34, 197, 94, 0.1);
}

.cart-item img {
  width: 100px;
  height: 80px;
  object-fit: cover;
  border-radius: 12px;
  margin-right: 1rem;
}

.cart-item .info {
  flex: 1;
}

.cart-item .info h2 {
  font-size: 1.1rem;
  color: #15803d;
  margin-bottom: 0.3rem;
}

.cart-item .price {
  font-weight: bold;
  color: #16a34a;
}

.actions {
  display: flex;
  gap: 0.4rem;
}

.actions button {
  background-color: #22c55e;
  color: white;
  border: none;
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-weight: bold;
}

.actions button:hover {
  background-color: #16a34a;
}

.checkout {
  margin-top: 2rem;
  text-align: right;
}

.checkout h3 {
  font-size: 1.3rem;
  color: #166534;
  margin-bottom: 1rem;
}

.checkout-btn {
  background-color: #22c55e;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.checkout-btn:hover {
  background-color: #16a34a;
}
</style>
