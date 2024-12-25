<script setup>
import { ref, computed } from "vue";
import ModalRQ_Product from "./ModalRQ_Product.vue";

// Data และ state
const items = ref([]);
const currentPage = ref(1);
const itemsPerPage = 10;
const showModal = ref(false);



// Computed properties
const totalPages = computed(() =>
  items.value.length > 0 ? Math.ceil(items.value.length / itemsPerPage) : 1
);

const currentItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return items.value.slice(start, end);
});

// Methods
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const productName = ref("");
const selectedCategory = ref("");
const typeProduct = ref("");
const selectedSizeBox = ref("");

const handleCloseModal = () => {
  console.log("Modal closed.");
  showModal.value = false;
};

// บันทึกข้อมูลที่ได้รับจาก Modal
const handleSave = (data) => {
  console.log("Data saved:", data);
  productName.value = data; // อัปเดต productName
  selectedCategory.value = data; // อัปเดต selectedCategory
  typeProduct.value = data; // อัปเดต typeProduct
  selectedSizeBox.value = data; // อัปเดต selectedSizeBox
  showModal.value = false;
};
</script>

<template>
    <div class="flex flex-col items-center mx-5 mt-8">
        <!-- Table Wrapper -->
        <div class="w-full">
            <div
                class="h-auto text-gray-700 uppercase bg-gradient-to-r rounded-xl from-[#cdecff] via-[#b3e3ff] to-[#cdecff] flex flex-col items-center justify-center p-5 py-14 shadow-sm">
                <div class="static xl:relative mb-5 flex justify-end sm:w-full top-[-10px] right-8">
                    <div class="xl:absolute w-64 border-2 border-[#0047AB] p-3 rounded-box">
                        <div class="flex justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-wallet">
                                <path
                                    d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
                                <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
                            </svg>
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
                    <RouterLink :to="{ name: 'requestproduct' }">
                        <button
                            class="flex justify-center items-center w-full p-2 bg-gradient-to-tr from-purple-500 via-[#e8bcf0] to-purple-500 shadow-md rounded-box transition-transform duration-500 hover:scale-110">
                            <p
                                class="pl-1 text-[14px] lg:text-base font-sarabun text-[#001f54] font-semibold hover:underline hover:underline-offset-2">
                                ยื่นคำร้องเปิดร้านค้า</p>
                        </button>
                    </RouterLink>
                    <RouterLink :to="{ name: 'productview' }">
                        <button
                            class="flex justify-center items-center w-full p-2 bg-gradient-to-tr from-[#ffd94d] via-[#fff099] to-[#ffd94d] shadow-md rounded-box transition-transform duration-500 hover:scale-110">
                            <p
                                class="pl-1 text-[14px] lg:text-base font-sarabun text-[#001f54] font-semibold hover:underline hover:underline-offset-2">
                                ร้านค้าของฉัน</p>
                        </button>
                    </RouterLink>
                    <RouterLink :to="{ name: 'orderpartnerview' }">
                        <button
                            class="flex justify-center items-center w-full p-2 bg-gradient-to-tr from-[#ffd94d] via-[#fff099] to-[#ffd94d] shadow-md rounded-box transition-transform duration-500 hover:scale-110">
                            <p
                                class="pl-1 text-[14px] lg:text-base font-sarabun text-[#001f54] font-semibold hover:underline hover:underline-offset-2">
                                ออร์เดอร์ของฉัน</p>
                        </button>
                    </RouterLink>
                    <RouterLink :to="{ name: 'reportpartner' }">
                        <button
                            class="flex justify-center items-center w-full p-2 bg-gradient-to-tr from-[#ffd94d] via-[#fff099] to-[#ffd94d] shadow-md rounded-box transition-transform duration-500 hover:scale-110">
                            <p
                                class="pl-1 text-[14px] lg:text-base font-sarabun text-[#001f54] font-semibold hover:underline hover:underline-offset-2">
                                รายงานยอดขาย</p>
                        </button>
                    </RouterLink>
                </div>
                <div class="grid my-5 py-5 w-full text-center">
                    <h1 class="font-sarabun text-2xl font-bold mb-3">คำร้องขอฝากขายสินค้า</h1>
                    <div class="my-4 flex w-full justify-center gap-3 text-sm">
                        <button
                            class="flex justify-center items-center p-2 bg-gradient-to-tr from-[#ffd94d] via-[#fff099] to-[#ffd94d] shadow-md rounded-box transition-transform duration-500 hover:scale-110">
                            <p
                                class="pl-1 text-[14px] lg:text-base font-sarabun text-[#001f54] font-semibold hover:underline hover:underline-offset-2">
                                สินค้าทั้งหมด</p>
                        </button>
                        <button
                            class="flex justify-center items-center p-2 bg-gradient-to-tr from-[#ffd94d] via-[#fff099] to-[#ffd94d] shadow-md rounded-box transition-transform duration-500 hover:scale-110">
                            <p
                                class="pl-1 text-[14px] lg:text-base font-sarabun text-[#001f54] font-semibold hover:underline hover:underline-offset-2">
                                สินค้าทั่วไป</p>
                        </button>
                        <button
                            class="flex justify-center items-center p-2 bg-gradient-to-tr from-[#ffd94d] via-[#fff099] to-[#ffd94d] shadow-md rounded-box transition-transform duration-500 hover:scale-110">
                            <p
                                class="pl-1 text-[14px] lg:text-base font-sarabun text-[#001f54] font-semibold hover:underline hover:underline-offset-2">
                                สินค้าสหกรณ์</p>
                        </button>
                    </div>
                </div>
                <div class="flex lg:justify-end justify-center items-center w-full gap-4 mb-6">
                    <button @click="showModal = true"
                        class="flex justify-center items-center p-3 bg-gradient-to-br from-purple-500 via-[#e8bcf0] to-purple-500 shadow-md rounded-box transition-transform duration-500 hover:scale-110">
                        <p
                            class="pl-1 text-[14px] lg:text-base font-sarabun text-[#001f54] font-semibold hover:underline hover:underline-offset-2">
                            เพิ่มข้อมูลฝากขายสินค้า</p>
                    </button>
                </div>


                <!-- Search Bar -->
                <div class="flex items-center lg:justify-end justify-center w-full mb-2">
                    <label class="input input-bordered flex items-center gap-1 rounded-lg h-[40px] lg:h-12 ">
                        <input type="text" class="grow" placeholder="Search.." />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                            class="h-4 w-4 opacity-70">
                            <path fill-rule="evenodd"
                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                clip-rule="evenodd" />
                        </svg>
                    </label>
                </div>
                <div class="overflow-x-auto w-full">
                    <table class="w-full text-sm text-left text-gray-500 rounded-b-xl table-auto min-w-[700px]">
                        <thead class="text-gray-700 uppercase bg-[#e6f2f4]">
                            <tr>
                                <th class="px-6 py-3 font-sarabun font-semibold lg:text-base">เปิด / ปิด</th>
                                <th class="px-6 py-3 font-sarabun font-semibold lg:text-base">ชื่อสินค้า</th>
                                <th class="px-6 py-3 font-sarabun font-semibold lg:text-base">ราคาสินค้า</th>
                                <th class="px-6 py-3 font-sarabun font-semibold lg:text-base">ประเภทสินค้า</th>
                                <th class="px-6 py-3 font-sarabun font-semibold lg:text-base">หมวดหมู่สินค้า</th>
                                <th class="px-6 py-3 font-sarabun font-semibold lg:text-base">รูปภาพ</th>
                                <th class="px-6 py-3 font-sarabun font-semibold lg:text-base">เมนู/เครื่องมือ</th>
                            </tr>
                        </thead>
                        <tbody v-if="currentItems.length > 0">
                            <tr v-for="(item, index) in currentItems" :key="item.id || index"
                                class="bg-white border-b hover:bg-gray-50">
                                <td class="px-6 py-4 font-medium text-gray-700 font-sarabun">{{ item.time }}</td>
                                <td class="px-6 py-4 font-sarabun">{{ item.productname }}</td>
                                <td class="px-6 py-4 font-sarabun">{{ item.productprice }}</td>
                                <td class="px-6 py-4 font-sarabun">{{ item.producttype }}</td>
                                <td class="px-6 py-4 font-sarabun">{{ item.productcategory }}</td>
                                <td class="px-6 py-4 font-sarabun">{{ item.picture }}</td>
                                <td class="px-6 py-4 font-sarabun">{{ item.menutools }}</td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr>
                                <td colspan="7"
                                    class="px-6 py-4 text-base text-center font-sarabun text-gray-500 bg-white border-b hover:bg-gray-50">
                                    ไม่มีข้อมูลเปิดร้านค้า
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Pagination -->
        <div class="flex justify-center items-center w-full mt-4 gap-3">
            <button class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 font-sarabun text-md"
                :disabled="currentPage === 1" @click="prevPage" aria-label="หน้าก่อนหน้า">
                ◀◀
            </button>
            <span class="font-sarabun text-gray-700">
                หน้า {{ currentPage }} จาก {{ totalPages }}
            </span>
            <button class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 font-sarabun text-md"
                :disabled="currentPage === totalPages" @click="nextPage" aria-label="หน้าถัดไป">
                ▶▶
            </button>
        </div>
    </div>

    <!-- Modal Component -->
    <ModalRQ_Product :showModal="showModal" :formData="formData" @save="handleSave" @close="handleCloseModal"/>
</template>
