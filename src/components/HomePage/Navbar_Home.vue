<template>
    <div class="navbar bg-gradient-to-r from-[#001F54] via-[#0047AB] to-[#001F54] relative z-50 shadow-md">
        <div class="navbar-start ">
            <div class="dropdown">
                <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-menu">
                        <line x1="4" x2="20" y1="12" y2="12" />
                        <line x1="4" x2="20" y1="6" y2="6" />
                        <line x1="4" x2="20" y1="18" y2="18" />
                    </svg>
                </div>
                <ul tabindex="0"
                    class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-48 p-2 shadow">
                    <li><a
                            class="font-sarabun text-[#001F54] font-semibold text-[15px] hover:bg-[#ffd700] hover:text-[#001F54]"
                            @click="$router.push({ name: 'home' })">หน้าแรก</a>
                    </li>
                    <li>
                        <details>
                            <summary
                                class="font-sarabun text-[#001F54] font-semibold text-[15px] hover:bg-[#ffd700] hover:text-[#001F54]">
                                ระบบฝากขายสินค้า / E-Marketplace</summary>
                            <ul class="p-2">
                                <li><a
                                        class="font-sarabun text-[#001F54] font-semibold text-[15px] hover:bg-[#0047AB] hover:text-white"
                                        @click="$router.push({ name: 'requestproduct' })">คำร้องขอฝากขายสินค้า</a>
                                </li>
                                <li><a
                                        class="font-sarabun text-[#001F54] font-semibold text-[15px] hover:bg-[#0047AB] hover:text-white"
                                        @click="$router.push({ name: 'productview' })">สินค้าของคุณ</a>
                                </li>
                                <li><a
                                        class="font-sarabun text-[#001F54] font-semibold text-[15px] hover:bg-[#0047AB] hover:text-white"
                                        @click="$router.push({ name: 'orderpartnerview' })">ออเดอร์ของคุณ</a>
                                </li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <details>
                            <summary
                                class="font-sarabun text-[#001F54] font-semibold text-[15px] hover:bg-[#ffd700] hover:text-[#001F54]">
                                ระบบฝากขายสินค้า / Tossagun Shop</summary>
                            <ul class="p-2">
                                <li><a
                                        class="font-sarabun text-[#001F54] font-semibold text-[15px] hover:bg-[#0047AB] hover:text-white"
                                        @click="$router.push({ name: 'addproduct' })">ฝากขายสินค้า</a>
                                </li>
                                <li><a
                                        class="font-sarabun text-[#001F54] font-semibold text-[15px] hover:bg-[#0047AB] hover:text-white"
                                        @click="$router.push({ name: 'product' })">สินค้า</a>
                                </li>
                                <li><a
                                        class="font-sarabun text-[#001F54] font-semibold text-[15px] hover:bg-[#0047AB] hover:text-white"
                                        @click="$router.push({ name: 'order' })">รายการออเดอร์</a>
                                </li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <details>
                            <summary
                                class="font-sarabun text-[#001F54] font-semibold text-[15px] hover:bg-[#ffd700] hover:text-[#001F54]">
                                ระบบพาร์ทเนอร์ / POS</summary>
                            <ul class="p-2">
                                <li><a
                                        class="font-sarabun text-[#001F54] font-semibold text-[15px] hover:bg-[#0047AB] hover:text-white"
                                        @click="$router.push({ name: 'requestshop' })">คำร้องขอเปิดร้านค้า</a>
                                </li>
                                <li><a
                                        class="font-sarabun text-[#001F54] font-semibold text-[15px] hover:bg-[#0047AB] hover:text-white"
                                        @click="$router.push({ name: 'shopview' })">ร้านค้าของคุณ</a>
                                </li>
                            </ul>
                        </details>
                    </li>
                    <li><a
                            class="font-sarabun text-[#001F54] font-semibold text-[15px] hover:bg-[#ffd700] hover:text-[#001F54] "
                            @click="$router.push({ name: 'list' })">รายงานการลงทุน</a>
                    </li>
                    <li><a
                            class="font-sarabun text-[#001F54] font-semibold text-[15px] hover:bg-[#ffd700] hover:text-[#001F54] "
                            @click="$router.push({ name: 'followup' })">ติดตามงาน</a>
                    </li>
                    <li><a @click="openLogoutModal" class="flex rounded-[10px] bg-error cursor-pointer">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                    fill="none" stroke="white" stroke-width="3" stroke-linecap="round"
                                    stroke-linejoin="round" class="lucide lucide-log-out">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                    <polyline points="16 17 21 12 16 7" />
                                    <line x1="21" x2="9" y1="12" y2="12" />
                                </svg>
                            </div>
                            <div class="font-sarabun text-white font-semibold text-[15px]">ออกจากระบบ</div>
                        </a></li>
                </ul>
            </div>
            <a>
                <img src="../../assets/home_logo.png"
                    class="hidden lg:block lg:h-[85px] lg:mx-10 p-[1px] cursor-pointer" @click="reloadPage">
            </a>
        </div>
        <img src="../../assets/home_logo.png" class="lg:hidden w-[70px] cursor-pointer" @click="reloadPage">
        <div class="navbar-center hidden lg:flex">
            <ul class="menu menu-horizontal px-1">
                <li><a
                        class="font-sarabun text-white font-semibold text-[15px] hover:bg-[#ffd700] hover:text-[#001F54] "
                        @click="$router.push({ name: 'home' })">หน้าแรก</a>
                </li>
                <li>
                    <details>
                        <summary
                            class="font-sarabun text-white font-semibold text-[15px] hover:bg-[#ffd700] hover:text-[#001F54]">
                            ระบบฝากขายสินค้า / E-Marketplace</summary>
                        <ul class="p-2">
                            <li><a
                                    class="font-sarabun text-[#001F54] font-semibold text-[15px] hover:bg-[#0047AB] hover:text-white"
                                    @click="$router.push({ name: 'requestproduct' })">คำร้องขอฝากขายสินค้า</a>
                            </li>
                            <li><a
                                    class="font-sarabun text-[#001F54] font-semibold text-[15px] hover:bg-[#0047AB] hover:text-white"
                                    @click="$router.push({ name: 'productview' })">สินค้าของคุณ</a>
                            </li>
                            <li><a
                                    class="font-sarabun text-[#001F54] font-semibold text-[15px] hover:bg-[#0047AB] hover:text-white"
                                    @click="$router.push({ name: 'orderpartnerview' })">ออเดอร์ของคุณ</a>
                            </li>
                        </ul>
                    </details>
                </li>
                <li>
                    <details>
                        <summary
                            class="font-sarabun text-white font-semibold text-[15px] hover:bg-[#ffd700] hover:text-[#001F54]">
                            ระบบฝากขายสินค้า / Tossagun Shop</summary>
                        <ul class="p-2">
                            <li><a
                                    class="font-sarabun text-[#001F54] font-semibold text-[15px] hover:bg-[#0047AB] hover:text-white"
                                    @click="$router.push({ name: 'addproduct' })">ฝากขายสินค้า</a>
                            </li>
                            <li><a
                                    class="font-sarabun text-[#001F54] font-semibold text-[15px] hover:bg-[#0047AB] hover:text-white"
                                    @click="$router.push({ name: 'product' })">สินค้า</a>
                            </li>
                            <li><a
                                    class="font-sarabun text-[#001F54] font-semibold text-[15px] hover:bg-[#0047AB] hover:text-white"
                                    @click="$router.push({ name: 'order' })">รายการออเดอร์</a>
                            </li>
                        </ul>
                    </details>
                </li>
                <li>
                    <details>
                        <summary
                            class="font-sarabun text-white font-semibold text-[15px] hover:bg-[#ffd700] hover:text-[#001F54]">
                            ระบบพาร์ทเนอร์ / POS</summary>
                        <ul class="p-2">
                            <li><a
                                    class="font-sarabun text-[#001F54] font-semibold text-[15px] hover:bg-[#0047AB] hover:text-white"
                                    @click="$router.push({ name: 'requestshop' })">คำร้องขอเปิดร้านค้า</a>
                            </li>
                            <li><a
                                    class="font-sarabun text-[#001F54] font-semibold text-[15px] hover:bg-[#0047AB] hover:text-white
                                    " @click="$router.push({ name: 'shopview' })">ร้านค้าของคุณ</a>
                            </li>
                        </ul>
                    </details>
                </li>
                <li><a
                        class="font-sarabun text-white font-semibold text-[15px] hover:bg-[#ffd700] hover:text-[#001F54] "
                        @click="$router.push({ name: 'list' })">รายงานการลงทุน</a>
                </li>
                <li><a
                        class="font-sarabun text-white font-semibold text-[15px] hover:bg-[#ffd700] hover:text-[#001F54]" 
                        @click="$router.push({ name: 'followup' })">ติดตามงาน</a>
                </li>
            </ul>
        </div>
        <div class="navbar-end">
            <a @click="openLogoutModal"
                class="flex p-2 rounded-[10px] lg:mr-10 lg:bg-red-700 transition transform active:scale-90 hover:scale-95 cursor-pointer">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-log-out hidden lg:block">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" x2="9" y1="12" y2="12" />
                    </svg>
                </div>
                <div class="font-sarabun text-white font-semibold text-[16px] ml-1 hidden lg:block lg:text-[16px]">
                    ออกจากระบบ
                </div>
            </a>
        </div>
    </div>
    <!-- Logout Modal -->
    <dialog id="logout-modal" class="rounded-lg p-6 shadow-lg  w-[90%] max-w-md">
        <div class="flex flex-col items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                stroke="#e69b00" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-octagon-alert w-[100px] h-[100px]">
                <path d="M12 16h.01" />
                <path d="M12 8v4" />
                <path
                    d="M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z" />
            </svg>
            <p class="my-3 font-sarabun text-xl text-[#001F54]">คุณต้องการออกจากระบบหรือไม่ !?</p>
        </div>
        <div class="flex justify-center space-x-4">
            <button @click="closeLogoutModal"
                class="px-4 py-2 bg-gray-100 text-[#001F54] rounded-lg hover:bg-gray-300 hover:text-blue-700 font-sarabun">ยกเลิก</button>
            <button @click="$router.push({ name: 'login' })"
                class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-sarabun">ใช่, ยืนยัน</button>
        </div>
    </dialog>
</template>

<script>
export default {
    name: 'Navbar_Home',
    methods: {
        openLogoutModal() {
            const modal = document.getElementById("logout-modal");
            modal.showModal();
        },
        // Close Modal
        closeLogoutModal() {
            const modal = document.getElementById("logout-modal");
            modal.close();
        },
        reloadPage() {
            window.location.reload();
        }
    }
}
</script>

<style></style>