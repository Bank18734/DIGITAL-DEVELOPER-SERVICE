<script setup>
import { ref } from "vue";

// รูปภาพสินค้า
const image1 = ref(null);
const image2 = ref(null);
const image3 = ref(null);
const image4 = ref(null);
const image5 = ref(null);

// Viewer
const currentImage = ref(null); // รูปที่กำลังแสดงใน Viewer
const isImgOpen = ref(false);

// การแปลงภาพใน Viewer
const imageStyle = ref({
    transform: 'scale(1) rotate(0deg)',
    maxWidth: '90vw',
    maxHeight: '90vh',
});
const scale = ref(1);
const rotation = ref(0);

// อัปโหลดไฟล์
const onFileChange = (event, imageRef) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imageRef.value = e.target.result;
        };
        reader.readAsDataURL(file);
    }
};

// เปิด Viewer
const openIMG = (image) => {
    currentImage.value = image;
    isImgOpen.value = true;
};

// ปิด Viewer
const closeIMG = () => {
    isImgOpen.value = false;
    resetTransform();
};

// ซูมเข้า / ซูมออก
const zoomIn = () => {
    scale.value += 0.1;
    updateTransform();
};
const zoomOut = () => {
    scale.value = Math.max(0.1, scale.value - 0.1);
    updateTransform();
};

// หมุน
const rotateLeft = () => {
    rotation.value -= 90;
    updateTransform();
};
const rotateRight = () => {
    rotation.value += 90;
    updateTransform();
};

// อัปเดต Transform
const updateTransform = () => {
    imageStyle.value.transform = `scale(${scale.value}) rotate(${rotation.value}deg)`;
};

// รีเซ็ต Transform
const resetTransform = () => {
    scale.value = 1;
    rotation.value = 0;
    updateTransform();
};
</script>

<template>
    <!-- รูปภาพสินค้า -->
    <div v-for="(image, index) in [image1, image2, image3, image4, image5]" :key="index" class="col-span-full lg:col-span-6">
        <label class="block text-[16px] font-medium text-gray-700 text-start">
            {{ index === 0 ? 'รูปภาพสินค้า' : `รูปภาพย่อยสินค้า ${index}` }}:
        </label>
        <div class="w-full flex flex-col justify-center items-center">
            <div v-if="image" class="mb-4 relative">
                <img :src="image" alt="Preview" class="w-32 h-32 object-cover rounded cursor-pointer"
                    @click="openIMG(image)" />
            </div>
            <input type="file" class="mt-1 file-input file-input-bordered file-input-sm w-full max-w-xs file-input-info text-gray-700"
                @change="(event) => onFileChange(event, [image1, image2, image3, image4, image5][index])" />
        </div>
    </div>

    <!-- Viewer -->
    <div v-if="isImgOpen" class="fixed inset-0 bg-gray-700 bg-opacity-70 flex items-center justify-center z-50">
        <div class="relative bg-transparent p-4">
            <div class="flex items-center justify-end w-full">
                <div class="bg-gray-50 rounded-box p-2 space-x-2 mb-1">
                    <button @click="rotateLeft" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rotate-ccw h-6 w-6">
                            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                            <path d="M3 3v5h5" />
                        </svg>
                    </button>
                    <button @click="rotateRight" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rotate-cw h-6 w-6">
                            <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                            <path d="M21 3v5h-5" />
                        </svg>
                    </button>
                    <button @click="zoomIn" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zoom-in h-6 w-6">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" x2="16.65" y1="21" y2="16.65" />
                            <line x1="11" x2="11" y1="8" y2="14" />
                            <line x1="8" x2="14" y1="11" y2="11" />
                        </svg>
                    </button>
                    <button @click="zoomOut" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zoom-out h-6 w-6">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" x2="16.65" y1="21" y2="16.65" />
                            <line x1="8" x2="14" y1="11" y2="11" />
                        </svg>
                    </button>
                    <button @click="closeIMG" class="text-gray-200 bg-error hover:bg-red-600 hover:text-gray-200 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x h-6 w-6">
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                    </button>
                </div>
            </div>
            <div class="overflow-hidden flex items-center justify-center">
                <img :src="currentImage" alt="Zoomable and Rotatable" class="cursor-grab" :style="imageStyle" />
            </div>
        </div>
    </div>
</template>
