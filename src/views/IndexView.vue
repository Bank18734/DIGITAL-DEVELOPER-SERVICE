<template>
    <div>
      <Navbar_Index />
      <Footer_Index />
      <div class="fixed bottom-10 right-5 flex flex-col items-center space-y-3">
        <button id="goToTopBtn"
          class="w-12 h-12 bg-[#0047ab] text-[#ffd700] shadow-lg rounded-full flex items-center justify-center opacity-0 transition-opacity duration-300"
          @click="scrollToTop">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-arrow-up-to-line">
            <path d="M5 3h14" />
            <path d="m18 13-6-6-6 6" />
            <path d="M12 7v14" />
          </svg>
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import Navbar_Index from '../components/IndexPage/Navbar_Index.vue';
  import Footer_Index from '../components/IndexPage/Footer_Index.vue';
  
  export default {
    name: 'IndexView',
    components: {
      Navbar_Index,Footer_Index

    },
    data() {
      return {
        showGoToTop: false,
      };
    },
    methods: {
      scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
      handleScroll() {
        this.showGoToTop = window.scrollY > 300;
        const button = document.getElementById('goToTopBtn');
        if (button) {
          button.style.opacity = this.showGoToTop ? '1' : '0';
        }
      },
      scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    },
  };
  </script>
  
  <style scoped>
  #goToTopBtn {
    transition: opacity 0.3s ease-in-out;
  }
  </style>