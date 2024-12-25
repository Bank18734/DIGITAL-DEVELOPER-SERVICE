import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import IndexView from '@/views/IndexView.vue'
import ServiceView from '@/views/ServiceView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import ListView from '@/views/ListView.vue'
import FollowView from '@/views/FollowView.vue'
import FDetailView from '@/views/FDetailView.vue'
import ShopView from '@/views/ShopView.vue'
import RequestshopView from '@/views/RequestshopView.vue'
import TestView from '@/views/TestView.vue'
import ProductView from '@/views/ProductView.vue'
import ProductOrderView from '@/views/ProductOrderView.vue'
import AddProductView from '@/views/AddProductView.vue'
import OrderPartnerView from '@/views/OrderPartnerView.vue'
import Product1View from '../views/Product1View.vue'
import ReportPartnerView from '../views/ReportPartnerView.vue'
import RequestProductView from '../views/RequestProductView.vue'
import ShopTossagunView from '../views/ShopTossagunView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexView
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: "/login",
      name: 'login',
      component: LoginView,
    },
    {
      path: '/home/service',
      name: 'service',
      component: ServiceView,
    },
    {
      path: '/login/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/home/list',
      name: 'list',
      component: ListView,
    },
    {
      path: '/home/followup',
      name: 'followup',
      component: FollowView,
    },
    {
      path: '/home/followup/fdetail',
      name: 'fdetail',
      component: FDetailView,
    },
    {
      path: '/home/shopview',
      name: 'shopview',
      component: ShopView,
    },
    {
      path: '/home/requestshop',
      name: 'requestshop',
      component: RequestshopView,
    },
    {
      path: '/test',
      name: 'test',
      component: TestView,
    },
    {
      path: '/product',
      name: 'product',
      component: ProductView,
    },
    {
      path: '/addproduct',
      name: 'addproduct',
      component: AddProductView,
    },
    {
      path: '/home/order',
      name: 'order',
      component: ProductOrderView,
    },
    {
      path: '/orderpartnerview',
      name: 'orderpartnerview',
      component: OrderPartnerView,
    },
    {
      path: '/productview',
      name: 'productview',
      component: Product1View
    },
    {
      path: '/reportpartner',
      name: 'reportpartner',
      component: ReportPartnerView,
    },
    {
      path: '/requestproduct',
      name: 'requestproduct',
      component: RequestProductView,
    },
    {
      path: '/home/shop-tg',
      name: 'shop-tg',
      component: ShopTossagunView,
    }
  ],
})

export default router
