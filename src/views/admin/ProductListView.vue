<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const products = ref([])
const BASE_URL = 'http://localhost:3000' // ✅ langsung pakai localhost

onMounted(async () => {
  try {
    const res = await axios.get(`${BASE_URL}/products`)
    products.value = res.data
  } catch (err) {
    console.error('Gagal mengambil produk:', err)
    products.value = []
  }
})
</script>
