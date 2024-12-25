<template>
    <div class="flex flex-col items-center mx-5 mt-8">
        <!-- Table Wrapper -->
        <div class="w-full">
            <div
                class="h-auto text-gray-700 uppercase bg-gradient-to-r rounded-xl from-[#cdecff] via-[#b3e3ff] to-[#cdecff] flex flex-col items-center justify-center p-5 shadow-sm">
                <h1 class="font-sarabun text-2xl font-bold mb-6 ">ติดตามงาน</h1>
                <div class="flex items-center justify-center lg:justify-end w-full mb-3 ">
                    <label class="input input-bordered flex items-center gap-1 rounded-box">
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
                                <th class="px-6 py-3 font-sarabun font-semibold lg:text-base">ชื่องาน</th>
                                <th class="px-6 py-3 font-sarabun font-semibold lg:text-base">ประเภทงาน</th>
                                <th class="px-6 py-3 font-sarabun font-semibold lg:text-base">วันที่เริ่มต้น</th>
                                <th class="px-6 py-3 font-sarabun font-semibold lg:text-base">วันที่สิ้นสุด</th>
                                <th class="px-6 py-3 font-sarabun font-semibold lg:text-base">สถานะ</th>
                                <th class="px-6 py-3 font-sarabun font-semibold lg:text-base">เปอร์เซ็นต์งาน</th>
                                <th class="px-6 py-3 font-sarabun font-semibold lg:text-base">ดูรายละเอียด</th>
                            </tr>
                        </thead>
                        <tbody v-if="currentItems.length > 0">
                            <tr v-for="(item, index) in currentItems" :key="index"
                                class="bg-white border-b hover:bg-gray-50">
                                <td class="px-6 py-4 font-medium text-gray-700 font-sarabun">{{ item.namework }}</td>
                                <td class="px-6 py-4 font-sarabun">{{ item.typework }}</td>
                                <td class="px-6 py-4 font-sarabun">{{ item.startwork }}</td>
                                <td class="px-6 py-4 font-sarabun">{{ item.endwork }}</td>
                                <td class="px-6 py-4 font-sarabun">
                                    <span class="bg-orange-100 text-orange-800 text-xs font-semibold p-1.5 rounded">
                                        {{ item.statuswork }}</span>
                                </td>
                                <td class="px-6 py-4 font-sarabun">{{ item.percentwork }}%</td>
                                <td class="px-6 py-4 font-sarabun text-[#424242] font-semibold">
                                    <button class="flex items-center gap-1 p-2 bg-[#b3e3ff] rounded-xl hover:bg-[#ffe082]
                            transition-transform duration-500 hover:scale-110 "
                                        @click="$router.push({ name: 'fdetail' })">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                            viewBox="0 0 24 24" fill="none" stroke="#424242" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round"
                                            class="lucide lucide-mouse-pointer-click">
                                            <path d="M14 4.1 12 6" />
                                            <path d="m5.1 8-2.9-.8" />
                                            <path d="m6 12-1.9 2" />
                                            <path d="M7.2 2.2 8 5.1" />
                                            <path
                                                d="M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z" />
                                        </svg>
                                        ดูรายละเอียด
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr>
                                <td colspan="6"
                                    class="px-6 py-4 text-center text-base font-sarabun text-gray-500 bg-white border-b hover:bg-gray-50">
                                    ไม่มีข้อมูลงาน
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Pagination -->
        <div class="flex justify-center items-center w-full mt-4 gap-3">
            <button
                class="px-4 py-2 bg-gray-300 text-gray-700 rounded-box hover:bg-gray-400 font-sarabun text-md cursor-pointer"
                :disabled="currentPage === 1" @click="prevPage" aria-label="หน้าก่อนหน้า">
                ◀◀
            </button>
            <span class="font-sarabun text-gray-700">
                หน้า {{ currentPage }} จาก {{ totalPages }}
            </span>
            <button
                class="px-4 py-2 bg-gray-300 text-gray-700 rounded-box hover:bg-gray-400 font-sarabun text-md cursor-pointer"
                :disabled="currentPage === totalPages" @click="nextPage" aria-label="หน้าถัดไป">
                ▶▶
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Data and state
const items = ref([
    {
        namework: "เขียนโปรแกรม ระบบบริหารจัดการร้านค้า",
        typework: "เขียนโปรแกรม",
        startwork: "xx/xx/xxxx",
        endwork: "xx/xx/xxxx",
        statuswork: "กำลังดำเนินงาน",
        percentwork: "0",
    }
]); // รายการข้อมูลทั้งหมด
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