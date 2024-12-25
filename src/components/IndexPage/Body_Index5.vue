<template>
    <section>
        <div class="hero relative mb-6">
            <!-- รูปภาพและพื้นหลัง -->
            <img src="../../assets/contact_wall.jpg" class="w-full h-[320px] sm:h-[420px] lg:h-[620px] mx-auto object-cover">
            <div class="hero-overlay bg-opacity-20 w-full mx-auto object-cover"></div>

            <!-- การ์ดข้อความ -->
            <div class="flex justify-center items-center px-4">
                <div
                    class="relative bg-white w-full max-w-[320px] sm:max-w-[420px] lg:max-w-[520px] p-6 sm:p-8 lg:p-10 shadow-sm shadow-gray-100">
                    <!-- โลโก้วงกลม -->
                    <div
                        class="absolute -top-12 left-1/2 transform -translate-x-1/2 w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] lg:w-[120px] lg:h-[120px] flex items-center justify-center border-[6px] sm:border-[8px] lg:border-[10px] border-white rounded-full">
                        <img src="../../assets/b5_index.png" class="w-full h-full object-contain">
                    </div>

                    <!-- เนื้อหาการ์ด -->
                    <div class="text-center mt-8 sm:mt-12 lg:mt-14">
                        <h2 class="text-2xl sm:text-3xl lg:text-4xl text-[#001f54] font-bowlby">
                            CONTACT&nbsp;US
                        </h2>
                        <p class="text-gray-600 mt-4 font-sarabun text-justify text-sm sm:text-base lg:text-[18px]">
                            &nbsp;&nbsp;หากคุณมีข้อสงสัยเกี่ยวกับบริการของเรา หรืออยากได้รับคำแนะนำจากทีมงานผู้เชี่ยวชาญ
                            เราพร้อมที่จะช่วยเหลือคุณในทุกขั้นตอน ติดต่อเราเพื่อรับคำแนะนำและข้อมูลที่คุณต้องการ
                        </p>
                        <div class="mt-6 border-t-[1.5px] border-[#001f54] w-[200px] sm:w-[250px] lg:w-[300px] mx-auto"></div>
                        <button @click="openModal"
                            class="mt-4 border-[2px] sm:border-[2.5px] border-[#001f54] p-2 sm:p-3 font-semibold text-sm sm:text-base hover:bg-[#ffd700] hover:border-[#ffd700]">
                            SEND MESSAGE
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal for sending message -->
        <div v-if="isModalOpen"
            class="modal-overlay fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center px-4">
            <div class="modal-container bg-white p-4 sm:p-6 lg:p-8 w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[500px] rounded-lg">
                <div class="modal-header flex justify-between items-center">
                    <p class="text-lg sm:text-xl lg:text-2xl font-semibold font-edu text-[#001f54] underline">
                        CONTACT&nbsp;&nbsp;INFORMATION
                    </p>
                    <button @click="closeModal" class="text-lg sm:text-xl font-bold">&times;</button>
                </div>
                <form @submit.prevent="submitForm" class="mt-4">
                    <!-- Name -->
                    <div class="mb-4">
                        <label for="name" class="block text-[#001f54] font-semibold text-sm sm:text-base">Full Name :</label>
                        <input type="text" id="name" v-model="name"
                            class="w-full p-2 sm:p-3 border border-gray-300 text-sm sm:text-base" required />
                    </div>

                    <!-- Email -->
                    <div class="mb-4">
                        <label for="email"
                            class="block text-[#001f54] font-semibold text-sm sm:text-base">Email :</label>
                        <input type="email" id="email" v-model="email"
                            class="w-full p-2 sm:p-3 border border-gray-300 text-sm sm:text-base" required />
                    </div>

                    <!-- Phone Number -->
                    <div class="mb-4">
                        <label for="phone"
                            class="block text-[#001f54] font-semibold text-sm sm:text-base">Phone Number :</label>
                        <input type="tel" id="phone" v-model="phone"
                            class="w-full p-2 sm:p-3 border border-gray-300 text-sm sm:text-base" required />
                    </div>

                    <!-- Details -->
                    <div class="mb-4">
                        <label for="details"
                            class="block text-[#001f54] font-semibold text-sm sm:text-base">Details :</label>
                        <textarea id="details" v-model="details"
                            class="w-full p-2 sm:p-3 border border-gray-300 text-sm sm:text-base" rows="4"
                            required></textarea>
                    </div>

                    <div class="flex justify-end">
                        <button type="submit"
                            class="bg-[#ffd700] px-4 py-2 sm:px-6 sm:py-3 font-semibold text-sm sm:text-base">SUBMIT</button>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>


<script>
export default {
    name: 'Body_Index5',
    data() {
        return {
            isModalOpen: false,
            name: "",
            email: "",
            phone: "",
            details: "",
        };
    },
    methods: {
        openModal() {
            this.isModalOpen = true;
        },
        closeModal() {
            this.isModalOpen = false;
        },
        submitForm() {
            console.log("Name:", this.name);
            console.log("Email:", this.email);
            console.log("Phone:", this.phone);
            console.log("Details:", this.details);
            this.closeModal();
        },
    },
};
</script>

<style scoped>
.modal-overlay {
    z-index: 9999;
}

.modal-container {
    border-radius: 0.5rem;
}

.modal-header button {
    background: transparent;
    border: none;
    color: black;
    font-size: 20px;
}
</style>
