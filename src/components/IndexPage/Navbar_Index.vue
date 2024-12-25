<template>
  <section class="mb-2">
    <div class="bg-gradient-to-r from-[#001f54] via-[#0047ab] to-[#001f54] w-full h-[35px]"></div>
    <div class="navbar bg-base-100 mx-auto w-full lg:w-[80%]">
      <div class="navbar-start">
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-list">
              <path d="M3 12h.01" />
              <path d="M3 18h.01" />
              <path d="M3 6h.01" />
              <path d="M8 12h13" />
              <path d="M8 18h13" />
              <path d="M8 6h13" />
            </svg>
          </div>
          <ul tabindex="0"
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-[#001f54]">
            <li><a class="text-base text-[#001f54] font-sarabun font-semibold" @click="reloadPage">หน้าแรก</a></li>
            <li><a class="text-base text-[#001f54] font-sarabun font-semibold" @click="scrollToBody2">เกี่ยวกับเรา</a>
            </li>
            <li><a class="text-base text-[#001f54] font-sarabun font-semibold" @click="scrollToBody5">ติดต่อเรา</a></li>
          </ul>
        </div>
        <div class="logo-container">
          <img src="../../assets/nb_index.png" alt="logo" class="logo cursor-pointer" @click="reloadPage" />
        </div>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li><a class="text-base text-[#001f54] font-sarabun font-semibold" @click="reloadPage">หน้าแรก</a></li>
          <li><a class="text-base text-[#001f54] font-sarabun font-semibold" @click="scrollToBody2">เกี่ยวกับเรา</a>
          </li>
          <li><a class="text-base text-[#001f54] font-sarabun font-semibold" @click="scrollToBody5">ติดต่อเรา</a></li>
        </ul>
      </div>
      <div class="navbar-end">
        <button class="custom-btn btn-2" @click="$router.push({ name: 'login' })">ลงทะเบียน</button>
      </div>
    </div>
    <hr class="border-t-2 border-solid border-[#001f54] w-[90%] md:w-[80%] mx-auto">
  </section>

  <Body_Index1></Body_Index1>
  <Body_Index2 ref="Body_Index2"></Body_Index2>
  <Body_Index3 ></Body_Index3>      
  <Body_Index4></Body_Index4>
  <Body_Index5 ref="Body_Index5"></Body_Index5>
  <Body_Index6></Body_Index6>
</template>


<script>
import Body_Index1 from '../IndexPage/Body_Index1.vue';
import Body_Index2 from '../IndexPage/Body_Index2.vue';
import Body_Index3 from '../IndexPage/Body_Index3.vue';
import Body_Index4 from '../IndexPage/Body_Index4.vue';
import Body_Index5 from '../IndexPage/Body_Index5.vue';
import Body_Index6 from '../IndexPage/Body_Index6.vue';

export default {
  name: 'Navbar_Index',
  components: {
    Body_Index1, Body_Index2, Body_Index3, Body_Index4, Body_Index5, Body_Index6,
  },
  methods: {
    reloadPage() {
      window.location.reload();
    },
    scrollToBody5() {
      const Body_Index5 = this.$refs.Body_Index5?.$el || this.$refs.Body_Index5; // ตรวจสอบว่า Body5 เป็น Vue Component หรือ DOM
      if (Body_Index5) {
        Body_Index5.scrollIntoView({ behavior: 'smooth', block: 'start' }); // เลื่อนหน้าจอไปยังจุดเริ่มต้นของ Body5
      }
    },
    scrollToBody2() {
      const Body_Index2 = this.$refs.Body_Index2?.$el || this.$refs.Body_Index2; // ตรวจสอบว่า Body5 เป็น Vue Component หรือ DOM
      if (Body_Index2) {
        Body_Index2.scrollIntoView({ behavior: 'smooth', block: 'start' }); // เลื่อนหน้าจอไปยังจุดเริ่มต้นของ Body5
      }
    },
  },
};
</script>

<style scoped>
/* Logo container for aspect ratio */
.logo-container {
  aspect-ratio: var(--wp--preset--aspect-ratio--1-1);
  /* สัดส่วน 1:1 */
  width: 140px;
  /* สามารถปรับขนาดตามต้องการ */
  max-width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  /* ป้องกันภาพเกินขอบ */
}

.logo {
  width: 100%;
  height: auto;
  /* ให้ปรับตามอัตราส่วน */
  object-fit: contain;
  /* ให้ภาพพอดี */
  transition: all 0.3s ease-in-out;
}

.custom-btn {
  width: 90px;
  height: 40px;
  color: #fff;
  border-radius: 5px;
  padding: 5px 10px;
  font-family: 'sarabun', sans-serif;
  font-weight: semibold;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, .5),
    7px 7px 20px 0px rgba(0, 0, 0, .1),
    4px 4px 5px 0px rgba(0, 0, 0, .1);
  outline: none;
  font-size: 15px;
}

.btn-2 {
  background: #0047ab;
  background: linear-gradient(0deg, #0047ab 0%, #0a2472 100%);
  border: none;
}

.btn-2:before {
  height: 0%;
  width: 2px;
}

.btn-2:hover {
  box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, .5),
    -4px -4px 6px 0 rgba(116, 125, 136, .5),
    inset -4px -4px 6px 0 rgba(255, 255, 255, .2),
    inset 4px 4px 6px 0 rgba(0, 0, 0, .4);
}
</style>