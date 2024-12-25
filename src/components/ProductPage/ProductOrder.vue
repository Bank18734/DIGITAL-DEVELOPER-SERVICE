<template>
    <div class="flex flex-col items-center mx-5 mt-8">
      <!-- Table Wrapper -->
      <div class="w-full">
        <div
          class="h-auto text-gray-700 uppercase bg-gradient-to-r rounded-xl from-[#cdecff] via-[#b3e3ff] to-[#cdecff] flex flex-col items-center justify-center p-5 py-14 shadow-sm">
          <h1 class="font-sarabun text-2xl font-bold mb-6 ">รายการออเดอร์สินค้า</h1>
          <div class="overflow-x-auto w-full">
            <table class="w-full text-sm text-left text-gray-500 rounded-b-xl table-auto min-w-[700px]">
              <thead class="text-gray-700 uppercase bg-[#e6f2f4]">
                <tr>
                  <th class="px-6 py-3 font-sarabun font-semibold lg:text-base">รหัสรายการ</th>
                  <th class="px-6 py-3 font-sarabun font-semibold lg:text-base">ร้านค้า</th>
                  <th class="px-6 py-3 font-sarabun font-semibold lg:text-base">รายการ</th>
                  <th class="px-6 py-3 font-sarabun font-semibold lg:text-base">สถานะ</th>
                  <th class="px-6 py-3 font-sarabun font-semibold lg:text-base">เพิ่มเติม</th>
                </tr>
              </thead>
              <tbody v-if="currentItems.length > 0">
                <tr v-for="(item, index) in currentItems" :key="item.id || index"
                  class="bg-white border-b hover:bg-gray-50">
                  <td class="px-6 py-4 font-medium text-gray-700 font-sarabun">{{ item.itemcode }}</td>
                  <td class="px-6 py-4 font-sarabun">{{ item.store }}</td>
                  <td class="px-6 py-4 font-sarabun">{{ item.list }}</td>
                  <td class="px-6 py-4 font-sarabun">{{ item.status }}</td>
                  <td class="px-6 py-4 font-sarabun">{{ item.more }}</td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td colspan="6" class="px-6 py-4 text-center text-base font-sarabun text-gray-500 bg-white border-b hover:bg-gray-50">
                    ไม่มีรายการออเดอร์สินค้า
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
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  
  // Data and state
  const items = ref([]); // รายการข้อมูลทั้งหมด
  const currentPage = ref(1); // หน้าปัจจุบัน
  const itemsPerPage = 10; // จำนวนรายการต่อหน้า
  
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
  </script>