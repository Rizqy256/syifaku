<template>
  <div class="login-wrapper">
    <div class="login-box">
      <h1 class="login-title">Login</h1>
      <form @submit.prevent="handleLogin" class="login-form">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="login-input"
          required
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="login-input"
          required
        />
        <button type="submit" class="login-button">Login</button>
      </form>
      <p class="register-link">
        Belum punya akun?
        <router-link to="/register">Daftar di sini</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/userStore'

const email = ref('')
const password = ref('')
const router = useRouter()
const user = useUserStore()

async function handleLogin() {
  // Validasi form kosong
  if (!email.value || !password.value) {
    alert('Email dan password wajib diisi.')
    return
  }

  try {
    const res = await axios.get(`http://localhost:3000/users?email=${email.value}&password=${password.value}`)
    if (res.data.length > 0) {
      user.login(res.data[0])
      router.push('/')
    } else {
      alert('Email atau password salah.')
    }
  } catch (err) {
    alert('Terjadi kesalahan saat login.')
    console.error(err)
  }
}
</script>

<style scoped>
.login-wrapper {
  height: 100vh;
  width: 100vw;
  background: linear-gradient(to bottom right, #f0fff4, #dcfce7);
  display: grid;
  place-items: center;
  font-family: 'Segoe UI', sans-serif;
  margin: 0;
  padding: 1rem;
  box-sizing: border-box;
}

.login-box {
  background: #ffffff;
  border: 1px solid #86efac;
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.1);
  border-radius: 12px;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  margin: auto;
}

.login-title {
  font-size: 2rem;
  font-weight: bold;
  color: #15803d;
  text-align: center;
  margin-bottom: 1.5rem;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.login-input {
  display: block;
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #a7f3d0;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border 0.3s;
  box-sizing: border-box;
}

.login-input:focus {
  border-color: #22c55e;
}

.login-button {
  background-color: #22c55e;
  color: white;
  border: none;
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #15803d;
}

.register-link {
  text-align: center;
  margin-top: 1rem;
  font-size: 0.95rem;
  color: #555;
}

.register-link a {
  color: #15803d;
  text-decoration: none;
  font-weight: 600;
  margin-left: 4px;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>
