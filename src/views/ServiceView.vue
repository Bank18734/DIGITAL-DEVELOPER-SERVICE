<template>
  <Navbar_Home />
  <Partner_ />
</template>

<script>
import Partner_ from '@/components/ServicePage/Partner_.vue';
import Navbar_Home from '@/components/HomePage/Navbar_Home.vue'

export default {
  name: 'ServiceView',
  components: {
    Navbar_Home, Partner_,
  }
}
</script>

<style></style>