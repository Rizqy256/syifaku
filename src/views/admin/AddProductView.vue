<template>
  <section class="add-product">
    <h1 class="title">➕ Tambah Produk Baru</h1>

    <form @submit.prevent="submitForm" class="product-form">
      <div class="form-group">
        <label>Nama Produk:</label>
        <input v-model="name" required />
      </div>

      <div class="form-group">
        <label>Deskripsi:</label>
        <textarea v-model="description" required></textarea>
      </div>

      <div class="form-group">
        <label>Harga:</label>
        <input type="number" v-model.number="price" required />
      </div>

      <div class="form-group">
        <label>URL Gambar:</label>
        <input v-model="image" required />
      </div>

      <button type="submit" class="submit-btn">💾 Simpan Produk</button>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

// data form
const name = ref('')
const description = ref('')
const price = ref(0)
const image = ref('')

// submit form
async function submitForm() {
  try {
    const newProduct = {
      name: name.value,
      description: description.value,
      price: price.value,
      image: image.value,
    }

    await axios.post(`${import.meta.env.VITE_API_URL}/products`, newProduct)
    alert('✅ Produk berhasil ditambahkan!')
    router.push('/admin/products')
  } catch (error) {
    console.error('❌ Gagal menambahkan produk:', error)
    alert('Terjadi kesalahan saat menambahkan produk.')
  }
}
</script>

<style scoped>
.add-product {
  background-color: #f0fdf4;
  min-height: 100vh;
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  color: #15803d;
  margin-bottom: 2rem;
}

.product-form {
  background-color: white;
  border: 1px solid #a7f3d0;
  border-radius: 12px;
  padding: 1.5rem;
  max-width: 500px;
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

input,
textarea {
  padding: 10px;
  border: 1px solid #d1fae5;
  border-radius: 8px;
  font-size: 1rem;
}

textarea {
  resize: vertical;
  min-height: 80px;
}

.submit-btn {
  padding: 10px 16px;
  background-color: #15803d;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.submit-btn:hover {
  background-color: #16a34a;
}
</style>
