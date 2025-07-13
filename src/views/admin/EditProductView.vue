<template>
  <div class="p-6 max-w-lg">
    <h1 class="text-xl mb-4">Edit Produk</h1>
    <form @submit.prevent="submit">
      <input v-model="name" placeholder="Nama" class="mb-2 p-2 w-full border" />
      <input v-model="price" placeholder="Harga" type="number" class="mb-2 p-2 w-full border" />
      <input v-model="image" placeholder="URL Gambar" class="mb-2 p-2 w-full border" />
      <textarea v-model="description" placeholder="Deskripsi" class="mb-2 p-2 w-full border"></textarea>
      <button class="bg-blue-600 text-white px-4 py-2">Simpan Perubahan</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const id = route.params.id

const BASE_URL = 'http://localhost:3000'

const name = ref('')
const price = ref('')
const image = ref('')
const description = ref('')

onMounted(async () => {
  try {
    const res = await axios.get(`${BASE_URL}/products/${id}`)
    const product = res.data
    name.value = product.name
    price.value = product.price
    image.value = product.image
    description.value = product.description
  } catch (err) {
    console.error('Gagal mengambil data produk:', err)
  }
})

async function submit() {
  try {
    await axios.put(`${BASE_URL}/products/${id}`, {
      name: name.value,
      price: parseInt(price.value),
      image: image.value,
      description: description.value
    })
    router.push('/admin/products')
  } catch (err) {
    console.error('Gagal mengupdate produk:', err)
    alert('Gagal menyimpan perubahan.')
  }
}
</script>

