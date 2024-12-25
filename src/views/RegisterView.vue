<script setup>
import { ref, onMounted } from "vue";
import axios from 'axios';

const accepted = ref(false); // Tracks whether the checkbox is checked

const handleconfirm = () => {
  if (accepted.value) {
    alert("Thank you for applying!");
  } else {
    alert("Please agree to the Terms and Conditions before applying.");
  }
  console.log("Form accepted and ready to proceed.");
};

const selectedPrefix = ref(""); // ค่าที่ผู้ใช้เลือก
const prefixes = ["นาย", "นาง", "นางสาว", "ดร.", "ศ."]; // รายการตัวเลือก

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
</script>

<template>
  <div
    class="container mx-auto items-center justify-between max-w-4xl mt-10 mb-10 px-20 py-20 rounded-2xl bg-white border-2 border-gray-900">
    <div class="text-center mb-6 text-3xl font-bold text-gray-900 dark:text-black">
      <div class="font-sarabun underline underline-offset-2 font-semibold">สมัครสมาชิก / Register </div>
    </div>
    <form>
      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label for="prefix"
            class="block mb-2 text-sm font-semibold text-gray-900 dark:text-black font-sarabun ">คำนำหน้า</label>
          <div class="relative">
            <select v-model="selectedPrefix" id="prefix"
              class="font-sarabun bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option disabled value="" class="font-sarabun">กรุณาเลือกคำนำหน้า</option>
              <option v-for="(prefix, index) in prefixes" :key="index" :value="prefix">
                {{ prefix }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <label for="name"
            class="block mb-2 text-sm font-semibold text-gray-900 dark:text-black font-sarabun">ชื่อ-สกุล</label>
          <input type="text" id="name"
            class="font-sarabun bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="กรุณากรอกชื่อ-สกุล" required />
        </div>
        <div>
          <label for="username"
            class="block mb-2 text-sm font-semibold text-gray-900 dark:text-black font-sarabun">Username</label>
          <input type="text" id="username"
            class="font-sarabun bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="กรุณากรอกชื่อผู้ใช้งาน" required />
        </div>
        <div>
          <label for="password"
            class="block mb-2 text-sm font-semibold text-gray-900 dark:text-black font-sarabun">Password</label>
          <input type="password" id="password"
            class="font-sarabun bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="กรุณากรอกรหัสผ่าน" required />
        </div>
        <div class="col-span-full text-lg">
          <div class="text-2xl text-gray-900 dark:text-black font-sarabun">
            ที่อยู่ตามบัตรประชาชน
          </div>
        </div>
        <div>
          <label for="address"
            class="block mb-2 text-sm font-semibold text-gray-900 dark:text-black font-sarabun">ที่อยู่</label>
          <input type="text" id="address"
            class="font-sarabun bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="กรุณากรอกที่อยู่" required />
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
            <option v-for="subdistrict in subdistricts" :key="subdistrict.id" :value="subdistrict.subdistrictCode">
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
            placeholder="รหัสไปรษณีย์"/>
        </div>
        <div>
          <label for="phone"
            class="block mb-2 text-sm font-semibold text-gray-900 dark:text-black font-sarabun">เบอร์โทรศัพท์</label>
          <input type="tel" id="phone"
            class="font-sarabun bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="กรุณากรอกเบอร์โทรศัพท์" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
        </div>
        <div>
          <label for="visitors"
            class="block mb-2 text-sm font-semibold text-gray-900 dark:text-black font-sarabun">เลขประจำบัตรประชาชน 13
            หลัก</label>
          <input type="number" id="visitors"
            class="font-sarabun bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="กรุณากรอกบัตรประชาชน" required />
        </div>
        <div class="mb-6">
          <label for="email" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-black font-sarabun">Email
            address</label>
          <input type="email" id="email"
            class="font-sarabun bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Example@gmail.com" required />
        </div>
      </div>

      <!-- Terms and conditions checkbox -->
      <div class="flex items-center mb-6">
        <input type="checkbox" v-model="accepted" id="terms"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" required />
        <label for="terms"
          class="ml-2 text-sm font-semibold text-gray-900 dark:text-black font-sarabun">ยอมรับข้อกำหนดและเงื่อนไข</label>
      </div>

      <div class="w-full">
        <RouterLink :to="{ name: 'login' }">
          <button type="button" @click="handleconfirm" :disabled="!accepted"
            class="disabled:opacity-50 font-sarabun w-full bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg md:w-[30%]">
            ยืนยัน
          </button>
        </RouterLink>
        <RouterLink :to="{ name: 'index' }">
          <button type="button"
            class="ml-4 disabled:opacity-50 font-sarabun w-full bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-lg md:w-[30%]">
            ยกเลิก
          </button>
        </RouterLink>
      </div>
    </form>
  </div>
</template>