<template>
  <nav class="navbar">
    <div class="logo">
      <img src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png" alt="logo" />
      <span>FoodOrder</span>
    </div>

    <ul class="nav-links">
      <li><RouterLink to="/">Home</RouterLink></li>
      <li><RouterLink to="/menu">Menu</RouterLink></li>
      <li><RouterLink to="/cart">Keranjang</RouterLink></li>
      <li><RouterLink to="/orders">Riwayat</RouterLink></li>
    </ul>

    <div class="user-section">
      <template v-if="user.isLoggedIn">
        <span class="user-name">👋 {{ user.name }}</span>
        <RouterLink v-if="user.role === 'admin'" to="/admin/products" class="admin-link">Admin</RouterLink>
        <button @click="logout" class="logout-btn" title="Keluar">🔓 Logout</button>
      </template>
      <template v-else>
        <RouterLink to="/login" class="auth-link">Login</RouterLink>
        <RouterLink to="/register" class="auth-link">Register</RouterLink>
      </template>
    </div>
  </nav>
</template>

<script setup>
import { useUserStore } from '@/store/userStore'
import { useRouter } from 'vue-router'

const user = useUserStore()
const router = useRouter()

function logout() {
  user.logout()
  router.push('/login')
}
</script>

<style scoped>
.navbar {
  background: linear-gradient(to right, #bbf7d0, #22c55e);
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'Segoe UI', sans-serif;
  box-shadow: 0 4px 10px rgba(0, 128, 0, 0.1);
  flex-wrap: wrap;
}

.logo {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #065f46;
}

.logo img {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

.nav-links {
  display: flex;
  gap: 1.2rem;
  list-style: none;
  padding: 0;
  margin: 0;
  flex-wrap: wrap;
}

.nav-links li a {
  text-decoration: none;
  color: #065f46;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 6px;
  transition: background-color 0.3s;
}

.nav-links li a.router-link-active {
  background-color: #15803d;
  color: white;
}

.nav-links li a:hover {
  background-color: #4ade80;
  color: #065f46;
}

.user-section {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-top: 0.5rem;
  flex-wrap: wrap;
}

.user-name {
  background-color: white;
  color: #166534;
  padding: 6px 12px;
  border-radius: 9999px;
  font-size: 0.9rem;
  font-weight: 600;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.logout-btn {
  background-color: #fee2e2;
  color: #b91c1c;
  border: none;
  padding: 6px 14px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background-color: #fecaca;
}

.auth-link,
.admin-link {
  text-decoration: none;
  color: #065f46;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 6px;
  transition: background-color 0.3s ease;
}

.auth-link:hover,
.admin-link:hover {
  background-color: #d1fae5;
}
</style>
