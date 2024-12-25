<script setup>
import { ref } from 'vue';

const images = ref([]);
const isimgOpen = ref(false);
const selectedImageIndex = ref(null);
const imageStyle = ref({
  transform: 'scale(1) rotate(0deg)',
  maxWidth: '100vw',
  maxHeight: '90vh',
});
const scale = ref(1);
const rotation = ref(0);

const onFileChange = (event) => {
  const files = Array.from(event.target.files);
  files.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      images.value.push(e.target.result);
    };
    reader.readAsDataURL(file);
  });
};

const openimg = (index) => {
  selectedImageIndex.value = index;
  isimgOpen.value = true;
};

const closeimg = () => {
  isimgOpen.value = false;
  scale.value = 1;
  rotation.value = 0;
  updateTransform();
};

const zoomIn = () => {
  scale.value += 0.1;
  updateTransform();
};

const zoomOut = () => {
  scale.value = Math.max(0.1, scale.value - 0.1);
  updateTransform();
};

const rotateLeft = () => {
  rotation.value -= 90;
  updateTransform();
};

const rotateRight = () => {
  rotation.value += 90;
  updateTransform();
};

const updateTransform = () => {
  imageStyle.value.transform = `scale(${scale.value}) rotate(${rotation.value}deg)`;
};
</script>

<template>
  <div class="flex flex-col items-center mt-8">
    <!-- แสดงรูปภาพที่อัปโหลด -->
    <div class="grid grid-cols-3 gap-4 mb-4">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="relative group"
      >
        <img
          :src="image"
          alt="Preview"
          class="w-40 h-40 object-cover rounded cursor-pointer"
          @click="openimg(index)"
        />
      </div>
    </div>

    <!-- Input สำหรับอัปโหลด -->
    <input
      type="file"
      multiple
      accept="image/*"
      class="file-input file-input-bordered file-input-info text-gray-700 file-input-md w-full max-w-xs mb-2"
      @change="onFileChange"
    />
    <span class="font-sarabun text-sm mb-4">(อัปโหลดรูปหลายรูป รูปจะถูกปรับให้ขนาดเท่ากัน1)</span>
  </div>

  <!-- Modal -->
  <div
    v-if="isimgOpen"
    class="fixed inset-0 bg-gray-700 bg-opacity-70 flex items-center justify-center z-50"
  >
    <div class="relative bg-transparent p-2">
      <div class="flex items-center justify-end w-full">
        <div class="bg-gray-400 bg-opacity-60 rounded-box p-2 space-x-2 mb-1 me-2">
          <!-- ปุ่มจัดการรูปภาพ -->
          <button @click="rotateRight" type="button"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-rotate-cw h-6 w-6">
                            <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                            <path d="M21 3v5h-5" />
                        </svg>
                    </button>
          <button @click="rotateLeft" type="button"
                        class="relative text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-rotate-ccw h-6 w-6">
                            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                            <path d="M3 3v5h5" />
                        </svg>
                    </button>
                    <button @click="zoomIn" type="button"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-zoom-in h-6 w-6">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" x2="16.65" y1="21" y2="16.65" />
                            <line x1="11" x2="11" y1="8" y2="14" />
                            <line x1="8" x2="14" y1="11" y2="11" />
                        </svg>
                    </button>
                    <button @click="zoomOut" type="button"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-zoom-out h-6 w-6">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" x2="16.65" y1="21" y2="16.65" />
                            <line x1="8" x2="14" y1="11" y2="11" />
                        </svg>
                    </button>
          <button @click="closeimg" type="button"
                        class="text-gray-200 bg-error hover:bg-red-600 hover:text-gray-200 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-x h-6 w-6">
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                    </button>
        </div>
      </div>
      <div class="overflow-hidden flex items-center justify-center mt-">
        <img
          :src="images[selectedImageIndex]"
          alt="Zoomable and Rotatable"
          class="cursor-grab"
          :style="imageStyle"
        />
      </div>
    </div>
  </div>
</template>

