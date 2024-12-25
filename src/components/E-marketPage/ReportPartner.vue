<script setup>
import { ref } from 'vue';
import FlatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import { RouterLink } from "vue-router";

// กำหนดค่าตัวแปรและฟังก์ชัน
const startDate = ref(null); // วันที่เริ่มต้น
const endDate = ref(null); // วันที่สิ้นสุด

// การกำหนดค่าของ Flatpickr
const startConfig = {
  dateFormat: 'd-m-Y',
  onChange: (selectedDates) => {
    // อัปเดต minDate ของ endConfig
    endConfig.minDate = selectedDates[0];
  },
};

const endConfig = {
  dateFormat: 'd-m-Y',
  onChange: (selectedDates) => {
    // อัปเดต maxDate ของ startConfig
    startConfig.maxDate = selectedDates[0];
  },
};

</script>

<template>
    <div class="flex flex-col items-center mx-5 mt-8">
        <!-- Table Wrapper -->
        <div class="w-full">
            <div
                class="h-auto text-gray-700 uppercase bg-gradient-to-r rounded-xl from-[#cdecff] via-[#b3e3ff] to-[#cdecff] items-center justify-center p-5 py-14 shadow-sm">
                <div class="static xl:relative mb-5 flex justify-end sm:w-full top-[-10px] right-8">
                    <div class="xl:absolute w-64 border-2 border-[#0047AB] p-3 rounded-box">
                        <div class="flex justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wallet"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/></svg>
                            <p class="ml-2">E-wallet - Partner</p>
                        </div>
                        <p class="text-3xl text-center my-3" data-v-32af3c16="">฿0.00</p>
                        <button
                            class="flex justify-center items-center w-full p-2 bg-gradient-to-r from-blue-600 via-[#99c0ff] to-blue-600 shadow-md rounded-xl transition-transform duration-500 hover:scale-110">
                            <p
                                class="pl-1 text-[14px] lg:text-base font-sarabun text-[#001f54] font-semibold hover:underline hover:underline-offset-2">
                                เติมเงิน</p>
                        </button>
                    </div>
                </div>
                <div class="grid grid-cols-2 lg:flex items-center justify-center w-full gap-4 mb-6">

                    <RouterLink :to="{ name: 'requestproduct' }" class="flex justify-center items-center">
                        <button
                            class="flex justify-center items-center w-full p-2 bg-gradient-to-tr from-[#ffd94d] via-[#fff099] to-[#ffd94d] shadow-md rounded-box transition-transform duration-500 hover:scale-110">
                            <p
                                class="pl-1 text-[14px] lg:text-base font-sarabun text-[#001f54] font-semibold hover:underline hover:underline-offset-2">
                                ยื่นคำร้องเปิดร้านค้า</p>
                        </button>
                    </RouterLink>
                    <RouterLink :to="{ name: 'productview' }" class="flex justify-center items-center">
                        <button
                            class="flex justify-center items-center w-full p-2 bg-gradient-to-tr from-[#ffd94d] via-[#fff099] to-[#ffd94d] shadow-md rounded-box transition-transform duration-500 hover:scale-110">
                            <p
                                class="pl-1 text-[14px] lg:text-base font-sarabun text-[#001f54] font-semibold hover:underline hover:underline-offset-2">
                                ร้านค้าของฉัน</p>
                        </button>
                    </RouterLink>
                    <RouterLink :to="{ name: 'orderpartnerview' }" class="flex justify-center items-center">
                        <button
                            class="flex justify-center items-center w-full p-2 bg-gradient-to-tr from-[#ffd94d] via-[#fff099] to-[#ffd94d] shadow-md rounded-box transition-transform duration-500 hover:scale-110">
                            <p
                                class="pl-1 text-[14px] lg:text-base font-sarabun text-[#001f54] font-semibold hover:underline hover:underline-offset-2">
                                ออร์เดอร์ของฉัน</p>
                        </button>
                    </RouterLink>
                    <RouterLink :to="{ name: 'reportpartner' }" class="flex justify-center items-center">
                        <button
                            class="flex justify-center items-center w-full p-2 bg-gradient-to-tr from-purple-500 via-[#e8bcf0] to-purple-500 shadow-md rounded-box transition-transform duration-500 hover:scale-110">
                            <p
                                class="pl-1 text-[14px] lg:text-base font-sarabun text-[#001f54] font-semibold hover:underline hover:underline-offset-2">
                                รายงานยอดขาย</p>
                        </button>
                    </RouterLink>
                </div>
                <div class="grid my-5 py-5 w-full text-center">
                    <h1 class="font-sarabun text-2xl font-bold mb-3 text-[#001f54]">รายงานยอดขาย สมศักดิ์ มาแล้ว</h1>
                </div>

                <div class="min-h-screen pt-5 sm:px-10 px-2 overflow-x-auto" height="100vh;">
                    <div class="text-right">
                        <div class="flex justify-end items-end flex-wrap">
                            <div class="flex m-2">
                                <button
                                    class="text-base rounded-r-none hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold font-sarabun cursor-pointer hover:bg-[#ffd94d] bg-gray-100 text-[#001F54] border duration-200 ease-in-out border-[#0047AB] transition ">
                                    วัน </button>
                                <button
                                    class="text-base hover:scale-105 focus:outline-none flex justify-center px-4 py-2 font-bold font-sarabun cursor-pointer hover:bg-[#ffd94d] bg-gray-100 text-[#001F54] border-y border-r duration-200 ease-in-out border-[#0047AB] transition ">
                                    สัปดาห์ </button>
                                <button
                                    class="text-base hover:scale-105 focus:outline-none flex justify-center px-4 py-2 font-bold font-sarabun cursor-pointer hover:bg-[#ffd94d] bg-gray-100 text-[#001F54] border-y border-r duration-200 ease-in-out border-[#0047AB] transition ">
                                    เดือน </button>
                                <button
                                    class="text-base rounded-l-none border-l-0 hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold font-sarabun cursor-pointer hover:bg-[#ffd94d] bg-gray-100 text-[#001F54] border duration-200 ease-in-out border-[#0047AB] transition ">
                                    ปี </button>
                            </div>
                        </div>
                    </div>
                    <div class=" flex justify-end items-center gap-4 mt-6 mb-3">
                        <div id="date-range-picker" class="flex items-center space-x-4">
                            <!-- วันที่เริ่มต้น -->
                            <div class="relative">
                                <flat-pickr v-model="startDate" :config="startConfig" placeholder="Select date start"
                                    class="datepicker-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 m-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <span class="text-gray-500">to</span>
                            <!-- วันที่สิ้นสุด -->
                            <div class="relative">
                                <flat-pickr v-model="endDate" :config="endConfig" placeholder="Select date end"
                                    class="datepicker-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 m-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* หากต้องการปรับแต่งเพิ่มเติม */
.datepicker-input {
  @apply dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white;
}
</style>
