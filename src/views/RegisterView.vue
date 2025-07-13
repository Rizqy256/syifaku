<template>
  <div class="register-wrapper">
    <div class="register-box">
      <h1 class="register-title">Register</h1>
      <form @submit.prevent="register" class="register-form">
        <input v-model="name" placeholder="Nama" class="register-input" :class="{ error: error && !name }" />
        <input v-model="email" placeholder="Email" class="register-input" :class="{ error: error && !email }" />
        <input v-model="password" type="password" placeholder="Password" class="register-input" :class="{ error: error && !password }" />
        <button class="register-button">Register</button>
      </form>
      <p class="login-link">
        Sudah punya akun?
        <router-link to="/login">Login di sini</router-link>
      </p>
    </div>

    <div v-if="toast" class="toast">
      Akun berhasil dibuat!
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const name = ref('')
const email = ref('')
const password = ref('')
const error = ref(false)
const toast = ref(false)

const router = useRouter()

async function register() {
  error.value = false

  if (!name.value || !email.value || !password.value) {
    error.value = true
    return
  }

  await axios.post('http://localhost:3000/users', {
    name: name.value,
    email: email.value,
    password: password.value,
    role: 'user'
  })

  toast.value = true
  setTimeout(() => {
    toast.value = false
    router.push('/login')
  }, 2000)
}
</script>

<style scoped>
.register-wrapper {
  height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #f0fff4 0%, #dcfce7 50%, #bbf7d0 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  padding: 1rem;
  box-sizing: border-box;
}

.register-box {
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(134, 239, 172, 0.3);
  box-shadow: 0 10px 30px rgba(34, 197, 94, 0.15), 
              0 1px 3px rgba(0, 0, 0, 0.05);
  border-radius: 16px;
  padding: 2.5rem 3rem;
  width: 100%;
  max-width: 450px;
  text-align: center;
}

.register-title {
  font-size: 2.25rem;
  font-weight: 700;
  color: #15803d;
  margin-bottom: 2rem;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.register-input {
  display: block;
  width: 100%;
  padding: 0.875rem 1.25rem;
  border: 1px solid #d1fae5;
  border-radius: 10px;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
  background-color: #f8fafc;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
  max-width: 380px;
  margin: 0 auto;
}

.register-input.error {
  border-color: #f87171;
  background-color: #fef2f2;
}

.register-button {
  background: linear-gradient(to right, #22c55e, #16a34a);
  color: white;
  border: none;
  width: 100%;
  padding: 1rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1.05rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(22, 163, 74, 0.2);
  margin: 1rem auto 0;
  max-width: 380px;
}

.login-link {
  margin-top: 1.2rem;
  font-size: 0.95rem;
  color: #555;
}

.login-link a {
  color: #15803d;
  text-decoration: none;
  font-weight: 600;
  margin-left: 4px;
}

.login-link a:hover {
  text-decoration: underline;
}

.toast {
  position: fixed;
  top: 80px;
  right: 30px;
  background-color: #bbf7d0;
  color: #065f46;
  padding: 12px 20px;
  border-radius: 10px;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.2);
  animation: slide-in 0.3s ease, fade-out 0.5s ease 1.5s forwards;
  z-index: 1000;
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
</style>
