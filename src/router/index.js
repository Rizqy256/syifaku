import { createRouter, createWebHistory } from 'vue-router'

// ✅ Public Views
import HomeView from '@/views/HomeView.vue'
import MenuView from '@/views/MenuView.vue'
import CartView from '@/views/CartView.vue'
import OrderHistoryView from '@/views/OrderHistoryView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import RiwayatView from '@/views/RiwayatView.vue'

// ✅ Admin Views
import ProductListView from '@/views/admin/AdminProducts.vue'
import AddProductView from '@/views/admin/AddProductView.vue' // ✅ hanya satu baris!
import EditProductView from '@/views/admin/AdminEditProduct.vue'

const routes = [
  // ✅ Public Routes
  { path: '/', name: 'Home', component: HomeView },
  { path: '/menu', name: 'Menu', component: MenuView },
  { path: '/cart', name: 'Cart', component: CartView },
  { path: '/orders', name: 'Orders', component: OrderHistoryView },
  { path: '/riwayat', name: 'Riwayat', component: RiwayatView },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/register', name: 'Register', component: RegisterView },

  // ✅ Admin Routes
  { path: '/admin/products', name: 'AdminProducts', component: ProductListView },
  { path: '/admin/products/add', name: 'AddProduct', component: AddProductView },
  { path: '/admin/products/edit/:id', name: 'EditProduct', component: EditProductView, props: true },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
