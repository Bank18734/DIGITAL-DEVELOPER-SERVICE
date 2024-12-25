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
                                        class="font-sarabun text-[#001F54] font-semibold text-[15px] hover:bg-[#0047AB] hover:text-white">คำร้องขอฝากขายสินค้า</a>
                                </li>
                                <li><a
                                        class="font-sarabun text-[#001F54] font-semibold text-[15px] hover:bg-[#0047AB] hover:text-white">สินค้าของคุณ</a>
                                </li>
                                <li><a
                                        class="font-sarabun text-[#001F54] font-semibold text-[15px] hover:bg-[#0047AB] hover:text-white">ออเดอร์ของคุณ</a>
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
                                        class="font-sarabun text-[#001F54] font-semibold text-[15px] hover:bg-[#0047AB] hover:text-white">ฝากขายสินค้า</a>
                                </li>
                                <li><a
                                        class="font-sarabun text-[#001F54] font-semibold text-[15px] hover:bg-[#0047AB] hover:text-white">สินค้า</a>
                                </li>
                                <li><a
                                        class="font-sarabun text-[#001F54] font-semibold text-[15px] hover:bg-[#0047AB] hover:text-white">รายการออเดอร์</a>
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
                                        class="font-sarabun text-[#001F54] font-semibold text-[15px] hover:bg-[#0047AB] hover:text-white">คำร้องขอเปิดร้านค้า</a>
                                </li>
                                <li><a
                                        class="font-sarabun text-[#001F54] font-semibold text-[15px] hover:bg-[#0047AB] hover:text-white">ร้านค้าของคุณ</a>
                                </li>
                            </ul>
                        </details>
                    </li>
                    <li><a
                            class="font-sarabun text-[#001F54] font-semibold text-[15px] hover:bg-[#ffd700] hover:text-[#001F54] ">รายงานการลงทุน</a>
                    </li>
                    <li><a
                            class="font-sarabun text-[#001F54] font-semibold text-[15px] hover:bg-[#ffd700] hover:text-[#001F54] ">ติดตามงาน</a>
                    </li>
                    <li><a href="#" class="flex rounded-[10px] bg-error">
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
                <img src="../../assets/home_logo.png" class="hidden lg:block lg:h-[85px] lg:mx-10 p-[1px]">
            </a>
        </div>
        <img src="../../assets/home_logo.png" class="lg:hidden w-[70px]">
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
                                    class="font-sarabun text-[#001F54] font-semibold text-[15px] hover:bg-[#0047AB] hover:text-white">คำร้องขอฝากขายสินค้า</a>
                            </li>
                            <li><a
                                    class="font-sarabun text-[#001F54] font-semibold text-[15px] hover:bg-[#0047AB] hover:text-white">สินค้าของคุณ</a>
                            </li>
                            <li><a
                                    class="font-sarabun text-[#001F54] font-semibold text-[15px] hover:bg-[#0047AB] hover:text-white">ออเดอร์ของคุณ</a>
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
                                    class="font-sarabun text-[#001F54] font-semibold text-[15px] hover:bg-[#0047AB] hover:text-white">ฝากขายสินค้า</a>
                            </li>
                            <li><a
                                    class="font-sarabun text-[#001F54] font-semibold text-[15px] hover:bg-[#0047AB] hover:text-white">สินค้า</a>
                            </li>
                            <li><a
                                    class="font-sarabun text-[#001F54] font-semibold text-[15px] hover:bg-[#0047AB] hover:text-white">รายการออเดอร์</a>
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
                                    class="font-sarabun text-[#001F54] font-semibold text-[15px] hover:bg-[#0047AB] hover:text-white">คำร้องขอเปิดร้านค้า</a>
                            </li>
                            <li><a
                                    class="font-sarabun text-[#001F54] font-semibold text-[15px] hover:bg-[#0047AB] hover:text-white">ร้านค้าของคุณ</a>
                            </li>
                        </ul>
                    </details>
                </li>
                <li><a
                        class="font-sarabun text-white font-semibold text-[15px] hover:bg-[#ffd700] hover:text-[#001F54] ">รายงานการลงทุน</a>
                </li>
                <li><a
                        class="font-sarabun text-white font-semibold text-[15px] hover:bg-[#ffd700] hover:text-[#001F54] ">ติดตามงาน</a>
                </li>
            </ul>
        </div>
        <div class="navbar-end">
            <a href="#"
                class="flex p-2 rounded-[10px] lg:mr-10 lg:bg-red-700 transition transform active:scale-90 hover:scale-95">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-log-out hidden lg:block">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" x2="9" y1="12" y2="12" />
                    </svg>
                </div>
                <div class="font-sarabun text-white font-semibold text-[16px] ml-1 hidden lg:block lg:text-[16px]"
                @click="$router.push({ name: 'index' })">
                    ออกจากระบบ</div>
            </a>

        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped></style>