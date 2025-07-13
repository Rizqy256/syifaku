<template>
  <section class="admin-products">
    <h1 class="title">Kelola Produk</h1>

    <!-- ❌ Jika bukan admin -->
    <div v-if="user.currentUser?.role !== 'admin'" class="not-admin">
      <p>❌ Akses ditolak. Halaman ini hanya untuk admin.</p>
    </div>

    <!-- ✅ Jika admin -->
    <div v-else>
      <RouterLink to="/admin/products/add" class="add-btn">
        ➕ Tambah Produk
      </RouterLink>

      <div v-if="loading">Memuat produk...</div>

      <div v-else class="product-list">
        <template v-for="product in products" :key="product.id">
          <div
            v-if="product && product.name && typeof product.price === 'number'"
            class="product-card"
          >
            <img :src="product.image" alt="gambar produk" />
            <h2>{{ product.name }}</h2>
            <p>{{ product.description }}</p>
            <p class="price">
              Rp{{ product.price.toLocaleString('id-ID') }}
            </p>

            <div class="actions">
              <RouterLink
                :to="`/admin/products/edit/${product.id}`"
                class="edit-btn"
              >
                ✏️ Edit
              </RouterLink>
              <button @click="hapusProduk(product.id)" class="delete-btn">
                🗑️ Hapus
              </button>
            </div>
          </div>
        </template>

        <!-- Pesan jika tidak ada produk -->
        <div v-if="products.length === 0">
          <p>Tidak ada produk untuk ditampilkan.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import axios from 'axios'
import { useUserStore } from '@/store/userStore'

const user = useUserStore()
const products = ref([])
const loading = ref(true)

async function fetchProduk() {
  loading.value = true
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`)
    products.value = Array.isArray(res.data)
      ? res.data
      : res.data.products || []
  } catch (err) {
    console.error('Gagal memuat produk:', err)
    products.value = []
  } finally {
    loading.value = false
  }
}

watchEffect(() => {
  if (user.role === 'admin') {
    fetchProduk()
  }
})

async function hapusProduk(id) {
  if (confirm('Yakin ingin menghapus produk ini?')) {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/products/${id}`)
      fetchProduk()
    } catch (err) {
      console.error('Gagal menghapus produk:', err)
    }
  }
}
</script>

<style scoped>
.admin-products {
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;
  background-color: #f0fdf4;
  min-height: 100vh;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  color: #15803d;
  margin-bottom: 1.5rem;
}

.not-admin {
  text-align: center;
  font-size: 1.2rem;
  color: red;
  padding: 2rem;
  background: #fee2e2;
  border-radius: 10px;
}

.add-btn {
  display: inline-block;
  margin-bottom: 1.5rem;
  background-color: #d1fae5;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: bold;
  color: #065f46;
  text-decoration: none;
  transition: background-color 0.2s ease;
}

.add-btn:hover {
  background-color: #a7f3d0;
}

.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}

.product-card {
  background: white;
  border: 1px solid #a7f3d0;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 10px rgba(34, 197, 94, 0.1);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.product-card img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 8px;
}

.price {
  font-weight: bold;
  color: #16a34a;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
}

.edit-btn,
.delete-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.9rem;
  transition: background 0.2s ease;
}

.edit-btn {
  background-color: #fef9c3;
  color: #92400e;
}

.edit-btn:hover {
  background-color: #fde68a;
}

.delete-btn {
  background-color: #fee2e2;
  color: #b91c1c;
}

.delete-btn:hover {
  background-color: #fecaca;
}
</style>
