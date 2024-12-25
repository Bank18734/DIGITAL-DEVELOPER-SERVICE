<template>
  <div class="flex flex-col gap-4">
    <!-- Top -->
    <div class="flex mt-10 mx-[5%] gap-4 ">
      <!-- Box Left -->
      <div
        class="w-2/3 bg-gradient-to-r from-[#cdecff] via-[#b3e3ff] to-[#cdecff] h-[200px] rounded-box flex p-8 shadow-sm">
        <div class="absolute top-[-30px] lg:top-[110px] lg:left-[80px]">
          <img src="../../assets/fdetail.png"
            class="h-[110px] lg:block lg:h-[230px] transition-transform duration-500 hover:scale-110">
        </div>
        <div class="ml-[250px] flex">
          <!-- detail -->
          <span class="font-sarabun text-[#001f54] text-xl space-y-2 ">
            <h1 class="font-bold">ชื่องาน :
              <span class="font-semibold text-gray-700">เขียนโปรแกรม ระบบบริหารจัดการร้านค้า</span>
            </h1>
            <h1 class="font-bold">ประเภทงาน :
              <span class="font-semibold text-gray-700">เขียนโปรแกรม</span>
            </h1>
            <h1 class="font-bold">ประเภทงานย่อย :
              <span class="font-semibold text-gray-700">เขียนโปรแกรม</span>
            </h1>
            <h1 class="font-bold">วันที่เริ่มงาน :
              <span class="font-semibold text-gray-700">xx/xx/xxxx</span>
              ถึง
              <span class="font-semibold text-gray-700">xx/xx/xxxx</span>
            </h1>
          </span>

          <!-- button -->
          <div class="flex items-end gap-2">
            <a class="flex items-center bg-[#af5092] p-2 gap-1 cursor-pointer rounded-box shadow-sm hover:bg-[#3F292B] transition-transform duration-500 hover:scale-110"
              @click="$router.push({ name: 'followup' })">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="#fff7fb" hover:stroke="#2f2fa7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-reply">
                <polyline points="9 17 4 12 9 7" />
                <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
              </svg>
              <span class="text-[#fff7fb] font-sarabun font-semibold">กลับหน้าติดตามงาน</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Box Right -->
      <div class="w-1/3 bg-[#2f2fa7] rounded-box flex items-center justify-center gap-3">
        <div class="flex justify-center items-center gap-3">
          <div class="flex flex-col">
            <div class="font-sarabun text-[#fff7fb] font-semibold text-2xl">
              ความคืบหน้า
            </div>
            <div class="font-sarabun text-[#fff7fb] font-semibold text-xl">
              Work Progress
            </div>
          </div>
          <div class="font-sarabun text-[#fff7fb] font-semibold text-4xl"> : </div>
        </div>
        <div
          class="flex items-center justify-center bg-[#fff7fb] rounded-full p-1 transition-transform duration-500 hover:scale-110">
          <div class="radial-progress text-[#F15152]" style="--value: 0; --size:8rem; --thickness: 1rem;"
            role="progressbar">
            <span class="font-sarabun font-semibold text-2xl">0%</span>
          </div>
        </div>

      </div>
    </div>

    <!-- Bottom -->
    <div class="table-container w-full mx-auto overflow-x-auto">
      <table class="w-[90%] mx-auto text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class=" text-gray-700 uppercase bg-gradient-to-r from-[#cdecff] via-[#b3e3ff] to-[#cdecff]">
          <tr>
            <th scope="row" class="px-6 py-3 font-sarabun font-bold text-lg">
              รายละเอียดงาน
            </th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-xs text-gray-700 uppercase bg-[#e6f2f4]">
            <th scope="col" class="px-6 py-3 font-sarabun font-semibold lg:text-base">
              ชื่องาน
            </th>
            <th scope="col" class="px-6 py-3 font-sarabun font-semibold lg:text-base">
              รายละเอียดงาน
            </th>
            <th scope="col" class="px-6 py-3 font-sarabun font-semibold lg:text-base">
              วัน/เดือน/ปี
            </th>
            <th scope="col" class="px-6 py-3 font-sarabun font-semibold lg:text-base">
              สถานะ
            </th>
          </tr>
          <tr class="bg-white border-b  hover:bg-gray-50">
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
  </div>
</template>

<script>
export default {

}
</script>

<style></style>