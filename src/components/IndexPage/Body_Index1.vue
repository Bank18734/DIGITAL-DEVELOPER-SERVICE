<template>
    <section>
        <!-- Hero Section -->
        <div class="hero relative mb-6">
            <img src="../../assets/b1_index.jpg" class="w-full h-[650px] mx-auto object-cover" />
            <div class="hero-overlay bg-opacity-60 w-full mx-auto object-cover"></div>
            <div
                class="hero-content w-full mx-auto object-cover text-neutral-content text-center absolute inset-0 flex justify-center items-center">
                <div class="max-w-lg">
                    <h1 class="font-zen text-7xl text-[#ffd700]">DIGITAL</h1>
                    <h1 class="font-zen text-5xl text-[#ffd700] mb-3"> WORLDS GROUP</h1>
                    <p class="font-sarabun text-3xl text-bold mb-3 text-white">
                        อาณาจักร ธุรกิจไร้ขอบเขต แห่งโลกอนาคต
                    </p>
                    <p class="font-sarabun  text-3xl text-bold text-white">
                        ดิจิตอล นิวเจนเนอเรชั่น
                    </p>
                    <p class="font-sarabun  text-3xl text-bold mb-5 text-white">
                        Digital Newgeneration
                    </p>
                    <button @click="openModal" class="button">
                        GET STARTED
                    </button>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
                class="bg-gray-50 p-3 flex flex-col items-center justify-center text-center max-w-4xl max-h-screen w-full">
                <img src="../../assets/b1.2_index.jpg" alt="Modal Image" class="w-full object-contain mb-4" />
                <p class="text-4xl font-bold font-sarabun">ร่วมเป็นส่วนหนึ่งกับเรา</p>
                <p class="text-xl font-semibold font-sarabun mb-2">ไปด้วยกัน ไปได้ไกล พัฒนาชุมชนไทย ให้ยั่งยืน</p>
                <div class="flex gap-1 justify-center items-center">
                    <button @click="$router.push({ name: 'login' })"
                    class="font-sarabun text-white font-semibold text-[15px] bg-[#001f54] rounded-md p-2 hover:text-[#001f54] hover:bg-[#ffd700] transition transform active:scale-95 hover:scale-98">
                        ลงทะเบียนพาร์ทเนอร์
                    </button>
                    <button @click="closeModal"
                    class="font-sarabun text-white font-semibold text-[15px] rounded-md bg-red-700 p-2 transition transform active:scale-90 hover:scale-95">
                    ✕
                    </button>
                </div>
            </div>
        </div>

    </section>
</template>


<script>
import { ref } from "vue";

export default {
    name: "Body_Index1",
    setup() {
        const showModal = ref(false);

        const openModal = () => {
            showModal.value = true;
        };

        const closeModal = () => {
            showModal.value = false;
        };

        return {
            showModal,
            openModal,
            closeModal,
        };
    },
};
</script>

<style scoped>
.button {
    padding: 12.5px 30px;
    border: 0;
    border-radius: 100px;
    background-color: #001f54;
    color: #ffd700;
    font-weight: Bold;
    transition: all 0.5s;
    -webkit-transition: all 0.5s;
}

.button:hover {
    background-color: #0047ab;
    box-shadow: 0 0 20px #ffeabf;
    transform: scale(1.1);
}

.button:active {
    background-color: #0047ab;
    transition: all 0.25s;
    -webkit-transition: all 0.25s;
    box-shadow: none;
    transform: scale(0.98);
}
</style>