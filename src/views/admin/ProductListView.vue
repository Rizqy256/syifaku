<template>
  <div class="p-6">
    <h1 class="text-xl mb-4">Manajemen Produk</h1>
    <RouterLink to="/admin/products/add" class="bg-green-500 text-white px-3 py-1 mb-4 inline-block">Tambah Produk</RouterLink>
    <table class="w-full">
      <tr v-for="item in products" :key="item.id">
        <td>{{ item.name }}</td>
        <td>Rp{{ item.price }}</td>
        <td>
          <RouterLink :to="`/admin/products/edit/${item.id}`" class="text-blue-500">Edit</RouterLink>
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const products = ref([])

onMounted(async () => {
  const res = await axios.get('http://localhost:3000/products')
  products.value = res.data
})
</script>
