<script setup>
import { ref, computed, onMounted } from "vue";
import { RouterLink } from "vue-router";
import axios from 'axios';
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

const showModal = ref(false)

const closeModal = () => {
  showModal.value = false;
};
// สร้างตัวแปร selectedOption และตั้งค่าเริ่มต้นเป็น 'none'
const selectedOption = ref('none');

const provinces = ref([]);
const districts = ref([]);
const subdistricts = ref([]);
const selectedProvince = ref("");
const selectedDistrict = ref("");
const selectedSubdistrict = ref("");
const postalCode = ref("");

// Fetch provinces on mounted
onMounted(() => {
  fetchProvinces();
});

// Fetch provinces data
const fetchProvinces = () => {
  axios
    .get("/provinces.json")
    .then((response) => {
      provinces.value = response.data;
    })
    .catch((error) => {
      console.error("Error fetching provinces:", error);
    });
};

// Handle province selection
const onProvinceChange = () => {
  if (selectedProvince.value) {
    fetchDistricts(selectedProvince.value);
  } else {
    districts.value = [];
    subdistricts.value = [];
    postalCode.value = "";
  }
};

// Fetch districts based on provinceCode
const fetchDistricts = (provinceCode) => {
  axios
    .get("/districts.json")
    .then((response) => {
      districts.value = response.data.filter(
        (district) => district.provinceCode === provinceCode
      );
    })
    .catch((error) => {
      console.error("Error fetching districts:", error);
    });
};

// Handle district selection
const onDistrictChange = () => {
  if (selectedDistrict.value) {
    fetchSubdistricts(selectedProvince.value, selectedDistrict.value);
  } else {
    subdistricts.value = [];
    postalCode.value = "";
  }
};

// Fetch subdistricts based on provinceCode and districtCode
const fetchSubdistricts = (provinceCode, districtCode) => {
  axios
    .get("/subdistricts.json")
    .then((response) => {
      subdistricts.value = response.data.filter(
        (subdistrict) =>
          subdistrict.provinceCode === provinceCode &&
          subdistrict.districtCode === districtCode
      );
    })
    .catch((error) => {
      console.error("Error fetching subdistricts:", error);
    });
};

// Handle subdistrict selection
const onSubdistrictChange = () => {
  const selectedSub = subdistricts.value.find(
    (subdistrict) => subdistrict.subdistrictCode === selectedSubdistrict.value
  );
  postalCode.value = selectedSub ? selectedSub.postalCode : "";
};

const selectedType = ref(""); // ค่าที่ผู้ใช้เลือก
const storetype = [
  "ร้านค้าปลีก (Retail Stores)",
  "ร้านค้าส่ง (Wholesale Stores)",
  "ร้านค้าเฉพาะทาง (Specialty Stores)",
  "ร้านค้าออนไลน์ (Online Stores)",
  "ร้านอาหารและเครื่องดื่ม (Food & Beverage)",
  "ร้านค้าทางการเกษตร (Agricultural Stores)",
];
</script>

<template>
  <div class="flex flex-col items-center mx-5 mt-8">
    <!-- Table Wrapper -->
    <div class="w-full">
      <div
        class="h-auto text-gray-700 uppercase bg-gradient-to-r rounded-xl from-[#cdecff] via-[#b3e3ff] to-[#cdecff] flex flex-col items-center justify-center p-5 py-14 shadow-sm">
        <div class="flex items-center justify-center w-full gap-4 mb-6">
          <RouterLink :to="{ name: 'requestshop' }">
            <button
              class="flex justify-center items-center p-2 bg-gradient-to-tr from-purple-500 via-[#e8bcf0] to-purple-500 shadow-md rounded-box transition-transform duration-500 hover:scale-110 ">
              <p
                class="pl-1 text-[14px] lg:text-base font-sarabun text-[#001f54] font-semibold hover:underline hover:underline-offset-2 ">
                ยื่นคำร้องเปิดร้านค้า</p>
            </button>
          </RouterLink>
          <RouterLink :to="{ name: 'shopview' }">
            <button
              class="flex justify-center items-center p-2 bg-gradient-to-tr from-[#ffd94d] via-[#fff099] to-[#ffd94d] shadow-md rounded-box transition-transform duration-500 hover:scale-110 ">
              <p
                class="pl-1 text-[14px] lg:text-base font-sarabun text-[#001f54] font-semibold hover:underline hover:underline-offset-2">
                ร้านค้าของฉัน</p>
            </button>
          </RouterLink>
        </div>
        <h1 class="font-sarabun text-2xl font-bold mb-3">คำร้องขอเปิดร้านค้า</h1>

        <div class="flex lg:justify-end justify-center items-center w-full gap-4 mb-6">
          <button @click="showModal = true"
            class="flex justify-center items-center p-2 bg-gradient-to-tr from-[#ffd94d] via-[#fff099] to-[#ffd94d] shadow-md rounded-xl transition-transform duration-500 hover:scale-110">
            <p
              class="pl-1 text-[14px] lg:text-base font-sarabun text-[#001f54] font-semibold hover:underline hover:underline-offset-2">
              ขอเปิดร้านค้า</p>
          </button>
        </div>

        <!-- First Modal -->
        <div v-if="showModal" @click.self="closeModal"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ease-in duration-1000 ">
          <div class="bg-white rounded-xl shadow-xl w-11/12 md:w-1/2">
            <div class="flex justify-between items-center p-4 border-b">
              <h2 class="text-xl font-sarabun font-bold text-yellow-600">เพิ่มข้อมูลเปิดร้านค้า</h2>
              <button @click="closeModal" type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
              </button>
            </div>
            <div class="p-4 space-y-1 overflow-y-auto max-h-[calc(80vh-2rem)]">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 font-sarabun">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">ชื่อร้านค้า (ภาษาไทย)</label>
                  <input type="text" placeholder="กรอกชื่อร้านค้า"
                    class="text-sm w-full px-2 py-2 mt-1 border rounded-md shadow-sm focus:ring-1 focus:border-blue-300 focus:ring-blue-300 focus:outline-none"
                    fdprocessedid="2pybb">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">ชื่อร้านค้า (ภาษาอังกฤษ) (ถ้ามี)</label>
                  <input type="text" placeholder="กรอกชื่อร้านค้า"
                    class="text-sm w-full px-2 py-2 mt-1 border rounded-md shadow-sm focus:ring-1 focus:border-blue-300 focus:ring-blue-300 focus:outline-none"
                    fdprocessedid="rc7wyn">
                </div>
                <div class="col-span-full">
                  <label class="block text-sm font-medium text-gray-700 mb-2">ประเภทร้านค้า</label>
                  <div class="relative">
                    <select v-model="selectedType" id="storetype"
                      class="font-sarabun bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                      <option disabled value="" class="font-sarabun">กรุณาเลือกประเภทร้านค้า</option>
                      <option v-for="(storetype, index) in storetype" :key="index" :value="storetype">
                        {{ storetype }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col-span-full">
                  <label class="block text-sm font-medium text-gray-700 mb-2">ที่ตั้งร้านค้า / เลขที่ / หมู่ที่ /
                    หมู่บ้าน / ถนน</label>
                  <input type="text" placeholder="กรอกที่อยู่"
                    class="text-sm w-full px-2 py-2 mt-1 border rounded-md shadow-sm focus:ring-1 focus:border-blue-300 focus:ring-blue-300 focus:outline-none"
                    fdprocessedid="3drywv">
                </div>
                <!-- จังหวัด -->
                <div>
                  <label for="province"
                    class="block mb-2 text-sm font-semibold text-gray-900 dark:text-black font-sarabun">จังหวัด</label>
                  <select id="province" v-model="selectedProvince" @change="onProvinceChange"
                    class="font-sarabun bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option disabled value="" class="font-sarabun text-gray-400">เลือกจังหวัด</option>
                    <option v-for="province in provinces" :key="province.id" :value="province.provinceCode">
                      {{ province.provinceNameTh }}
                    </option>
                  </select>
                </div>
                <!-- อำเภอ -->
                <div>
                  <label for="district"
                    class="block mb-2 text-sm font-semibold text-gray-900 dark:text-black font-sarabun">อำเภอ</label>
                  <select id="district" v-model="selectedDistrict" @change="onDistrictChange"
                    class="font-sarabun bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option disabled value="" class="font-sarabun">เลือกอำเภอ</option>
                    <option v-for="district in districts" :key="district.id" :value="district.districtCode">
                      {{ district.districtNameTh }}
                    </option>
                  </select>
                </div>
                <!-- ตำบล -->
                <div>
                  <label for="subdistrict"
                    class="block mb-2 text-sm font-semibold text-gray-900 dark:text-black font-sarabun">ตำบล</label>
                  <select id="subdistrict" v-model="selectedSubdistrict" @change="onSubdistrictChange"
                    class="font-sarabun bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option disabled value="" class="font-sarabun">เลือกตำบล</option>
                    <option v-for="subdistrict in subdistricts" :key="subdistrict.id"
                      :value="subdistrict.subdistrictCode">
                      {{ subdistrict.subdistrictNameTh }}
                    </option>
                  </select>
                </div>
                <!-- รหัสไปรษณีย์ -->
                <div>
                  <label for="postalCode"
                    class="block mb-2 text-sm font-semibold text-gray-900 dark:text-black font-sarabun">รหัสไปรษณีย์</label>
                  <input type="text" id="postalCode" v-model="postalCode" readonly
                    class="w-full font-sarabun text-sm p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                    placeholder="รหัสไปรษณีย์" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">เบอร์โทรติดต่อร้านค้า</label>
                  <input type="text"
                    class="text-sm w-full px-2 py-2 mt-1 border rounded-md shadow-sm focus:ring-1 focus:border-blue-300 focus:ring-blue-300 focus:outline-none"
                    placeholder="กรอกเบอร์โทรติดต่อร้านค้า" fdprocessedid="51l6c">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">ไอดีไลน์ร้านค้า</label>
                  <input type="text"
                    class="text-sm w-full px-2 py-2 mt-1 border rounded-md shadow-sm focus:ring-1 focus:border-blue-300 focus:ring-blue-300 focus:outline-none"
                    placeholder="กรอกไอดีไลน์ร้านค้า" fdprocessedid="yia37">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">ละติจูด</label>
                  <input type="text"
                    class="text-sm w-full px-2 py-2 mt-1 border rounded-md shadow-sm focus:ring-1 focus:border-blue-300 focus:ring-blue-300 focus:outline-none"
                    placeholder="กรอกละติจูด" fdprocessedid="dlp6d">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">ลองจิจูด</label>
                  <input type="text"
                    class="text-sm w-full px-2 py-2 mt-1 border rounded-md shadow-sm focus:ring-1 focus:border-blue-300 focus:ring-blue-300 focus:outline-none"
                    placeholder="กรอกลองจิจูด" fdprocessedid="vh8dfp">
                </div>
                <div class="col-span-full">
                  <!-- Dropdown -->
                  <label class="block text-sm font-medium text-gray-700 mb-2">ข้อมูลเกี่ยวกับภาษีมูลค่าเพิ่ม</label>
                  <select id="tax-status" v-model="selectedOption"
                    class="text-sm w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none">
                    <option value="none">ไม่ได้จดทะเบียนภาษี</option>
                    <option value="registered">จดทะเบียนภาษี</option>
                  </select>
                </div>
                <!-- Conditional Message -->
                <div v-if="selectedOption === 'registered'" class="mt-2">
                  <label class="block text-sm font-medium text-gray-700 mb-2">ชื่อจดทะเบียนภาษี</label>
                  <input type="text" placeholder="กรอกข้อมูลจดทะเบียนภาษี"
                    class="text-sm w-full px-2 py-2 mt-1 border rounded-md shadow-sm focus:ring-1 focus:border-blue-300 focus:ring-blue-300 focus:outline-none">
                </div>
                <div v-if="selectedOption === 'registered'" class="mt-2">
                  <label data-v-bacd0ce2=""
                    class="block text-sm font-medium text-gray-700 mb-2">เลขประจำตัวจดทะเบียนภาษี</label>
                  <input type="text" placeholder="กรอกเลขประจำตัวจดทะเบียนภาษี"
                    class="text-sm w-full px-2 py-2 mt-1 border rounded-md shadow-sm focus:ring-1 focus:border-blue-300 focus:ring-blue-300 focus:outline-none">
                </div>
                <div v-if="selectedOption === 'registered'" class="mt-2 col-span-full">
                  <label data-v-bacd0ce2=""
                    class="block text-sm font-medium text-gray-700 mb-2">ที่อยู่ผู้จดทะเบียนภาษี</label>
                  <input type="text" placeholder="กรอกที่อยู่ผู้จดทะเบียนภาษี"
                    class="text-sm w-full px-2 py-2 mt-1 border rounded-md shadow-sm focus:ring-1 focus:border-blue-300 focus:ring-blue-300 focus:outline-none">
                </div>
              </div>
            </div>
            <!-- Contract Details -->
            <hr class="my-1">
            <div class="flex items-center justify-center mb-1">

              <button
                class="font-sarabun px-4 py-2 ml-2 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:outline-none disabled:bg-gray-300 disabled:cursor-not-allowed">
                บันทึก
              </button>

              <button @click="closeModal"
                class="font-sarabun ml-2 px-4 py-2 text-white focus:outline-none bg-error rounded-lg border border-gray-200 hover:bg-red-700 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-100">
                ยกเลิก
              </button>
            </div>
          </div>
        </div>


        <!-- Search Bar -->
        <div class="flex items-center lg:justify-end justify-center w-full mb-2">
          <label class="input input-bordered flex items-center gap-1 rounded-lg h-[40px] lg:h-12 ">
            <input type="text" class="grow" placeholder="Search.." />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-4 w-4 opacity-70">
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
                <th class="px-6 py-3 font-sarabun font-semibold lg:text-base">คำร้องขอเปิดร้าน</th>
                <th class="px-6 py-3 font-sarabun font-semibold lg:text-base">ชื่อร้านค้า</th>
                <th class="px-6 py-3 font-sarabun font-semibold lg:text-base">ประเภทร้านค้า</th>
                <th class="px-6 py-3 font-sarabun font-semibold lg:text-base">เมนู / เครื่องมือ</th>
              </tr>
            </thead>
            <tbody v-if="currentItems.length > 0">
              <tr v-for="(item, index) in currentItems" :key="item.id || index"
                class="bg-white border-b hover:bg-gray-50">
                <td class="px-6 py-4 font-medium text-gray-700 font-sarabun">{{ item.request }}</td>
                <td class="px-6 py-4 font-sarabun">{{ item.storename }}</td>
                <td class="px-6 py-4 font-sarabun">{{ item.storetype }}</td>
                <td class="px-6 py-4 font-sarabun">{{ item.menutools }}</td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="6"
                  class="px-6 py-4 text-[16px] text-center font-sarabun text-gray-500 bg-white border-b hover:bg-gray-50">
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
</template>
