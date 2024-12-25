<template>
    <div class="flex flex-col md:flex-row items-center bg-gray-50 shadow-lg mx-[10%] mb-6">
        <!-- Text Section -->
        <div class="md:w-1/2 text-center md:text-left mb-6 md:mb-0 p-7">
            <p class="text-5xl uppercase tracking-wide text-gray-500 font-edu">DIGITAL</p>
            <p class="text-5xl uppercase tracking-wide text-gray-500 font-edu">WORLDS</p>
            <p class="text-5xl uppercase tracking-wide text-gray-500 font-edu">GROUP</p>
            <h1 class="text-3xl font-semibold text-[#001f54] mb-2 font-kanit">
                บริษัท ดิจิตอล เวิด์ลกรุ๊ป
            </h1>
            <hr class="border-t-[1px] border-solid border-[#001f54] mb-2">
            <p class="text-gray-600 text-lg leading-relaxed mb-6 text-justify font-sarabun">
                &nbsp;&nbsp;&nbsp;&nbsp;จัดตั้งเมื่อปี 2566 ซึ่งได้รวบรวมทั้งสินค้าและบริการ ที่ครบวงจรไว้ในบริษัทเดียว
                เรามีหน้าที่อำนวยความสะดวก รวดเร็วและการบริการอย่างเต็มที่ เราจึงเป็นผู้นำทางด้านดิจิตอลอย่างเต็มรูปแบบ
                ปัจจุบันทางบริษัทได้ขยายฐานร้านค้า Tossagun one Stop Shop & Service
                และธุรกิจทางด้านดิจิตอลออนไลน์ออกสู่ตลาด ในประเทศมากกว่า 300 สาขาทั่วประเทศ
                เราตั้งใจว่าในอนาคตเราจะเป็นผู้นำทางด้านดิจิตอล และศูนย์บริการครบวงจร
                ที่พร้อมรองรับฐานลูกค้าทั้งในและต่างประเทศอย่างแน่นอน
            </p>
            <div class="flex justify-center">
                <button class="signupBtn" @click="openModal">
                    VIEW VIDEO
                    <span class="arrow">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            fill="bg-[#001f54]" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" class="lucide lucide-play">
                            <polygon points="6 3 20 12 6 21 6 3" />
                        </svg>
                    </span>
                </button>
            </div>
        </div>
        <!-- Image Section -->
        <div class="md:w-1/2">
            <img src="../../assets/b2_index.png" class="shadow-lg bg-gradient-to-tl from-[#001f54] via-[#0047ab] to-[#001f54]" />
        </div>
        <!-- Modal Section -->
        <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
            <div class="relative w-full h-full">
                <button class="absolute top-4 right-4 text-white text-3xl font-bold hover:text-gray-300 z-50"
                    @click="closeModal">
                    ✕
                </button>
                <div class="w-full h-full flex items-center justify-center">
                    <video class="w-full h-full max-w-6xl max-h-[90vh]" controls autoplay>
                        <source src="../../assets/videos.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Body_Index2',
    data() {
        return {
            isModalOpen: false, // ตัวแปรควบคุมสถานะของ modal
        };
    },
    methods: {
        openModal() {
            this.isModalOpen = true; // เปิด modal
        },
        closeModal() {
            this.isModalOpen = false; // ปิด modal
        },
    },
};
</script>

<style scoped>
.signupBtn {
    width: 147px;
    height: 40px;
    border-radius: 30px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 13px;
    gap: 9px;
    color: white;
    background: linear-gradient(to right, #001f54, #0047ab);
    position: relative;
    cursor: pointer;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.212);
    font-weight: 600;
}

.arrow {
    position: absolute;
    right: 7.5px;
    background-color: white;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 30px;
    transition: all 0.5s ease;
}

.signupBtn:hover .arrow {
    width: calc(147px - (7.5px) * 2);
}
</style>
