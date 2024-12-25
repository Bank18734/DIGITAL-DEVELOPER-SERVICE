<template>
  <Navbar_Home />
  <Body_home1 />
  <Body_home2 />
</template>

<script>
import Navbar_Home from '@/components/HomePage/Navbar_Home.vue'
import Body_home1 from '@/components/HomePage/Body_home1.vue'
import Body_home2 from '@/components/HomePage/Body_home2.vue'
export default {
    name: 'HomeView',
    components: {
        Navbar_Home,Body_home1,Body_home2,
    }
}
</script>

<style>

</style>