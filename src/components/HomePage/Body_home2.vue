<template>
    <section class="flex-col lg:flex lg:flex-row justify-between mx-[5%] gap-4 mt-4">
        <!-- Box Left -->
        <div class="relative w-full lg:w-[800px] overflow-x-auto shadow-md rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead
                    class=" text-gray-700 uppercase bg-gradient-to-r from-[#cdecff] via-[#b3e3ff] to-[#cdecff]">
                    <tr>
                        <th scope="row" class="px-6 py-3 font-sarabun font-bold text-lg">
                            สัญญา
                        </th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="text-xs text-gray-700 uppercase bg-[#e6f2f4]">
                        <th scope="col" class="px-6 py-3 font-sarabun font-semibold lg:text-base">
                            หัวข้อสัญญา
                        </th>
                        <th scope="col" class="px-6 py-3 font-sarabun font-semibold lg:text-base">
                            สถานะ
                        </th>
                        <th scope="col" class="px-6 py-3 font-sarabun font-semibold lg:text-base">
                            วัน/เดือน/ปี
                        </th>
                        <th scope="col" class="px-6 py-3 font-sarabun font-semibold lg:text-base">
                            เลือกเซ็นต์สัญญา
                        </th>
                    </tr>
                    <tr
                        class="bg-white border-b  hover:bg-gray-50">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">

                        </th>
                        <td class="px-6 py-4">

                        </td>
                        <td class="px-6 py-4">

                        </td>
                        <td class="px-6 py-4">

                        </td>
                    </tr>
                    <tr class="bg-white border-b hover:bg-gray-50 ">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">

                        </th>
                        <td class="px-6 py-4">

                        </td>
                        <td class="px-6 py-4">

                        </td>
                        <td class="px-6 py-4">

                        </td>
                    </tr>
                    <tr class="bg-white border-b hover:bg-gray-50 ">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">

                        </th>
                        <td class="px-6 py-4">

                        </td>
                        <td class="px-6 py-4">

                        </td>
                        <td class="px-6 py-4">

                        </td>
                    </tr>
                    <tr class="bg-white border-b  hover:bg-gray-50">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">

                        </th>
                        <td class="px-6 py-4">

                        </td>
                        <td class="px-6 py-4">

                        </td>
                        <td class="px-6 py-4">

                        </td>
                    </tr>
                </tbody>
            </table>
        </div>


        <!-- Box Right  -->
        <div class="relative w-full lg:w-[565px] overflow-x-auto shadow-md rounded-lg mt-4 lg:mt-0">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead
                    class="text-xs text-gray-700 uppercase bg-gradient-to-r from-[#cdecff] via-[#b3e3ff] to-[#cdecff]">
                    <tr>
                        <th scope="col" class="px-6 py-3 font-sarabun font-bold text-lg">
                            ประวัติการทำสัญญา
                        </th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="text-xs text-gray-700 uppercase bg-[#e6f2f4]">
                        <th scope="col" class="px-6 py-3 font-sarabun font-semibold lg:text-base">
                            หัวข้อสัญญา
                        </th>
                        <th scope="col" class="px-6 py-3 font-sarabun font-semibold lg:text-base hidden lg:table-cell">
                            วัน/เดือน/ปี
                        </th>
                        <th scope="col" class="px-6 py-3 font-sarabun font-semibold lg:text-base">
                            เลือกเซ็นต์สัญญา
                        </th>
                    </tr>
                    <tr
                        class="bg-white border-b  hover:bg-gray-50 ">
                        <th scope="row"
                            class="px-6 py-4 font-medium font-sarabun text-gray-900 whitespace-nowrap">
                            ข้อกำหนดและการใช้งานเว็บไซต์
                        </th>
                        <td class="px-6 py-4 font-sarabun hidden lg:table-cell">
                            xx/xx/xxxx xx:xx:xx
                        </td>
                        <td class="px-6 py-4 flex justify-center">
                            <button @click="openModal(1)" class="transition-transform duration-500 hover:scale-110">
                                <span
                                    class="font-sarabun font-semibold text-[#fff099] text-[12px] p-[3px] lg:p-2 lg:text-[14px] bg-[#2f2fa7] rounded-lg">ดูสัญญา</span>
                            </button>
                        </td>
                    </tr>
                    <tr
                        class="bg-white border-b  hover:bg-gray-50 ">
                        <th scope="row"
                            class="px-6 py-4 font-medium font-sarabun text-gray-900 whitespace-nowrap ">
                            เปิด e-market
                        </th>
                        <td class="px-6 py-4 font-sarabun hidden lg:table-cell">
                            xx/xx/xxxx xx:xx:xx
                        </td>
                        <td class="px-6 py-4 flex justify-center">
                            <button @click="openModal(2)" class="transition-transform duration-500 hover:scale-110">
                                <span
                                    class="font-sarabun font-semibold text-[#fff099] text-[12px] p-[3px] lg:p-2 lg:text-[14px] bg-[#2f2fa7] rounded-lg">ดูสัญญา</span>
                            </button>
                        </td>
                    </tr>
                    <tr
                        class="bg-white border-b  hover:bg-gray-50 ">
                        <th scope="row"
                            class="px-6 py-4 font-medium font-sarabun text-gray-900 whitespace-nowrap ">
                            สัญญาเปิด Partner shop
                        </th>
                        <td class="px-6 py-4 font-sarabun hidden lg:table-cell">
                            xx/xx/xxxx xx:xx:xx
                        </td>
                        <td class="px-6 py-4 flex justify-center">
                            <button @click="openModal(3)" class="transition-transform duration-500 hover:scale-110">
                                <span
                                    class="font-sarabun font-semibold text-[#fff099] text-[12px] p-[3px] lg:p-2 lg:text-[14px] bg-[#2f2fa7] rounded-lg">ดูสัญญา</span>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
    <Term1 :isVisible="showModal1" :contractDetails="contractDetails1" @close="closeModal" />
    <Term2 :isVisible="showModal2" :contractDetails="contractDetails2" @close="closeModal" />
    <Term3 :isVisible="showModal3" :contractDetails="contractDetails3" @close="closeModal" />
</template>

<script>
import Term1 from './Term1.vue';
import Term2 from './Term2.vue';
import Term3 from './Term3.vue';
export default {
  components: {
    Term1,
    Term2,
    Term3
  },
  data() {
    return {
      showModal1: false,
      showModal2: false,
      showModal3: false,
      contractDetails1: '',
      contractDetails2: '',
      contractDetails3: ''
    };
  },
  methods: {
    openModal(contractId) {
      if (contractId === 1) {
        this.showModal1 = true;
        this.contractDetails1 = 'รายละเอียดของข้อกำหนดและการใช้งานเว็บไซต์';
      } else if (contractId === 2) {
        this.showModal2 = true;
        this.contractDetails2 = 'รายละเอียดของการเปิด e-market';
      } else if (contractId === 3) {
        this.showModal3 = true;
        this.contractDetails3 = 'รายละเอียดของสัญญาเปิด Partner shop';
      }
    },
    closeModal() {
      this.showModal1 = false;
      this.showModal2 = false;
      this.showModal3 = false;
      this.contractDetails1 = '';
      this.contractDetails2 = '';
      this.contractDetails3 = '';
    }
  }
}
</script>

<style></style>