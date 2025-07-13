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

const name = ref('')
const price = ref('')
const image = ref('')
const description = ref('')

onMounted(async () => {
  const res = await axios.get(`http://localhost:3000/products/${id}`)
  const product = res.data
  name.value = product.name
  price.value = product.price
  image.value = product.image
  description.value = product.description
})

async function submit() {
  await axios.put(`http://localhost:3000/products/${id}`, {
    name: name.value,
    price: parseInt(price.value),
    image: image.value,
    description: description.value
  })
  router.push('/admin/products')
}
</script>
