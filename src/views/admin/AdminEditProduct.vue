<template>
  <section class="edit-product">
    <h1 class="title">Edit Produk</h1>

    <form @submit.prevent="handleUpdate" v-if="product" class="form">
      <label>Nama Produk:</label>
      <input v-model="product.name" type="text" required />

      <label>Deskripsi:</label>
      <textarea v-model="product.description" rows="3" required></textarea>

      <label>Harga:</label>
      <input v-model.number="product.price" type="number" min="0" required />

      <label>URL Gambar:</label>
      <input v-model="product.image" type="text" required />

      <img v-if="product.image" :src="product.image" alt="Preview" class="preview" />

      <div class="actions">
        <button type="submit">💾 Simpan</button>
        <button type="button" @click="router.push('/admin/products')" class="cancel">❌ Batal</button>
      </div>
    </form>

    <p v-else>Memuat data produk...</p>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const product = ref(null)

const fetchProduct = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/products/${route.params.id}`)
  product.value = res.data
}

const handleUpdate = async () => {
  await axios.put(`${import.meta.env.VITE_API_URL}/products/${route.params.id}`, product.value)
  alert('✅ Produk berhasil diperbarui')
  router.push('/admin/products')
}

onMounted(fetchProduct)
</script>

<style scoped>
.edit-product {
  padding: 2rem;
  max-width: 600px;
  margin: auto;
  font-family: 'Segoe UI', sans-serif;
  background-color: #f0fdf4;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(34, 197, 94, 0.1);
}

.title {
  font-size: 2rem;
  font-weight: bold;
  color: #15803d;
  text-align: center;
  margin-bottom: 1.5rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input,
textarea {
  padding: 0.7rem;
  border: 1px solid #a7f3d0;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
}

input:focus,
textarea:focus {
  border-color: #22c55e;
}

.preview {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin-top: 0.5rem;
}

.actions {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1rem;
}

button {
  flex: 1;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  transition: background 0.3s ease;
}

button[type="submit"] {
  background-color: #22c55e;
  color: white;
}

button[type="submit"]:hover {
  background-color: #15803d;
}

.cancel {
  background-color: #fee2e2;
  color: #b91c1c;
}

.cancel:hover {
  background-color: #fecaca;
}
</style>
