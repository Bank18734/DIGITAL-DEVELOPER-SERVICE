<template>
    <section class="flex flex-wrap mt-[20px] gap-4 mx-[5%] lg:mt-[70px] flex-col lg:flex-row lg:flex-grow-0">
        <!-- Box Left -->
        <div class="flex flex-col w-full lg:w-[800px]">
            <!-- Box Top -->
            <div
                class="flex p-[7.5px] bg-gradient-to-r from-[#cdecff] via-[#b3e3ff] to-[#cdecff] h-[100px] lg:h-[170px] rounded-xl lg:p-8 relative w-full shadow-lg">
                <div class="flex-1">
                    <p class="text-xl lg:text-4xl font-bold text-[#001f54] font-sarabun ">สวัสดี , </p>
                    <p
                        class="text-lg lg:text-3xl font-semibold text-[#001f54] w-[130px] font-sarabun bg-[#80d0ff] bg-opacity-60 lg:w-[210px] p-[1px]">
                        ยินดีต้อนรับกลับ! </p>
                    <p class="text-sm text-gray-700 font-sarabun lg:text-lg mt-1">เปิดร้านรับทรัพย์ รับพลังบวก
                        และรับลูกค้าคุณภาพดี. ❤</p>
                </div>
                <div class="absolute top-[-30px] right-0 lg:top-[-90px] lg:right-5">
                    <img src="../../assets/h1.png" class="h-[110px] lg:block lg:h-[320px] transition-transform duration-500 hover:scale-110">
                </div>
            </div>
            <!-- Box Bottom -->
            <div class="flex flex-col gap-2 mt-2 p-2">
                <h1 class="text-base lg:text-2xl font-sarabun font-bold text-[#001f54]">รายการโปรด</h1>
                <div class="mt-1 grid grid-cols-2 lg:flex lg:flex-row lg:justify-evenly flex-wrap gap-4">
                    <button @click="$router.push({ name: 'productview' })"
                        class="flex justify-center items-center p-2 bg-gradient-to-tr from-[#ffd94d] via-[#fff099] to-[#ffd94d] shadow-md rounded-xl transition-transform duration-500 hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="#001f54" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-shopping-cart">
                            <circle cx="8" cy="21" r="1" />
                            <circle cx="19" cy="21" r="1" />
                            <path
                                d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                        </svg>
                        <p 
                            class="pl-1 text-[14px] lg:text-base font-sarabun text-[#001f54] font-semibold hover:underline hover:underline-offset-2">
                            E-MARKET</p>
                    </button>
                    <button @click="$router.push({ name: 'shopview' })"
                        class="flex justify-center items-center p-2 bg-gradient-to-tr from-[#ffd94d] via-[#fff099] to-[#ffd94d] shadow-md rounded-xl transition-transform duration-500 hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="#001f54" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-handshake">
                            <path d="m11 17 2 2a1 1 0 1 0 3-3" />
                            <path
                                d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
                            <path d="m21 3 1 11h-2" />
                            <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
                            <path d="M3 4h8" />
                        </svg>
                        <p
                            class="pl-1 text-[14px] lg:text-base font-sarabun text-[#001f54] font-semibold hover:underline hover:underline-offset-2">
                            PARTNER</p>
                    </button>
                    <button @click="$router.push({ name: 'requestshop' })"
                        class="flex justify-center items-center p-2 bg-gradient-to-tr from-[#ffd94d] via-[#fff099] to-[#ffd94d] shadow-md rounded-xl transition-transform duration-500 hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="#001f54" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-copyright">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M14.83 14.83a4 4 0 1 1 0-5.66" />
                        </svg>
                        <p
                            class="pl-1 text-[14px] lg:text-base font-sarabun text-[#001f54] font-semibold hover:underline hover:underline-offset-2">
                            POINT OF SALE</p>
                    </button>
                    <button
                        class="flex justify-center items-center p-2 bg-gradient-to-tr from-[#ffd94d] via-[#fff099] to-[#ffd94d] shadow-md rounded-xl transition-transform duration-500 hover:scale-110"
                        @click="$router.push({ name: 'service' })">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="#001f54" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-file-pen-line">
                            <path
                                d="m18 5-2.414-2.414A2 2 0 0 0 14.172 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2" />
                            <path
                                d="M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
                            <path d="M8 18h1" />
                        </svg>
                        <p
                            class="pl-1 text-[14px] lg:text-base font-sarabun text-[#001f54] font-semibold hover:underline hover:underline-offset-2">
                            REGISTER</p>
                    </button>
                    <button @click="$router.push({ name: 'shop-tg' })"
                        class="flex justify-center items-center p-2 bg-gradient-to-tr from-[#ffd94d] via-[#fff099] to-[#ffd94d] shadow-md rounded-xl transition-transform duration-500 hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="#001f54" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-store">
                            <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
                            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                            <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
                            <path d="M2 7h20" />
                            <path
                                d="M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7" />
                        </svg>
                        <p
                            class="pl-1 text-[14px] lg:text-base font-sarabun text-[#001f54] font-semibold hover:underline hover:underline-offset-2">
                            SHOP</p>
                    </button>
                </div>
            </div>
        </div>

        <!-- Box Right -->
        <div class="flex items-center justify-center w-full h-[150px] lg:w-[545px] lg:h-[270px] bg-[#2f2fa7] rounded-2xl shadow-lg p-[10px] lg:p-5 gap-4 flex-grow-0 z-0 mx-auto">
            <div class="bg-[#fffcf7] h-[55px] w-[55px] lg:h-[150px] lg:w-[150px] rounded-full flex items-center justify-center">
                <img src="../../assets/user_pro.png" class="lg:h-[145px] lg:w-[145px] rounded-full shadow-md">
            </div>
            <div class="flex flex-col items-start  border-l-[1.5px] p-2 gap-1 lg:border-l-[3px] border-[#fffcf7] lg:p-4 lg:gap-2">
                <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                        stroke="#ffec90" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-user-round w-[15px] h-[15px] lg:w-[24px] lg:h-[24px] transition-transform duration-500 hover:scale-125">
                        <circle cx="12" cy="8" r="5" />
                        <path d="M20 21a8 8 0 0 0-16 0" />
                    </svg>
                    <p class="pl-1 font-sarabun text-[#ffec90] font-bold text-[14px] lg:text-lg">Name: <span
                            class="text-[#fffcf7] font-normal">จิรทีปต์ เตชะวงศ์วรากุล </span></p>
                </div>
                <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                        stroke="#ffec90" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-id-card w-[15px] h-[15px] lg:w-[24px] lg:h-[24px] transition-transform duration-500 hover:scale-125">
                        <path d="M16 10h2" />
                        <path d="M16 14h2" />
                        <path d="M6.17 15a3 3 0 0 1 5.66 0" />
                        <circle cx="9" cy="11" r="2" />
                        <rect x="2" y="5" width="20" height="14" rx="2" />
                    </svg>
                    <p class="pl-1 font-sarabun text-[#ffec90] font-bold text-[14px] lg:text-lg">ID-Card: <span
                            class="text-[#fffcf7] font-normal">1501234567890</span></p>
                </div>
                <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                        stroke="#ffec90" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-mail w-[15px] h-[15px] lg:w-[24px] lg:h-[24px] transition-transform duration-500 hover:scale-125">
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <p class="pl-1 font-sarabun text-[#ffec90] font-bold text-[14px] lg:text-lg">E-mail: <span
                            class="text-[#fffcf7] font-normal">example@gmail.com </span></p>
                </div>
                <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                        stroke="#ffec90" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-phone-call w-[15px] h-[15px] lg:w-[24px] lg:h-[24px] transition-transform duration-500 hover:scale-125">
                        <path
                            d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        <path d="M14.05 2a9 9 0 0 1 8 7.94" />
                        <path d="M14.05 6A5 5 0 0 1 18 10" />
                    </svg>
                    <p class="pl-1 font-sarabun text-[#ffec90] font-bold text-[14px] lg:text-lg">TEL: <span
                            class="text-[#fffcf7] font-normal">061-2345678 </span></p>
                </div>
                <div class="flex items-center justify-center w-full lg:mt-2 ">
                    <button class="flex p-[1.5px] border-[1px] lg:p-2 bg-[#ffec90] lg:border-[3px] border-[#fffcf7] rounded-xl transition-transform duration-500 hover:scale-110">
                        <p class="font-sarabun text-[#2f2fa7] font-semibold mr-1 text-[12px] lg:text-base">แก้ไขโปรไฟล์</p>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                            stroke="#2f2fa7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-pencil hidden lg:block lg:w-[24px] lg:h-[24px]">
                            <path
                                d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                            <path d="m15 5 4 4" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'Body_home1',
}
</script>

<style scoped> 

</style>