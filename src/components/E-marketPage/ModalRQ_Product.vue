<template>
    <!-- First Modal -->
    <div v-if="showModal" @click.self="closeModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ease-in duration-1000 ">
        <div class="bg-white rounded-box shadow-xl w-full max-w-4xl">
            <div class="flex justify-between items-center p-4 border-b">
                <h2 class="text-xl font-sarabun font-bold text-yellow-500">เพิ่มข้อมูลฝากขายสินค้า</h2>
                <button @click="closeModal" type="button"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                </button>
            </div>
            <div class="p-4 space-y-1 overflow-y-auto max-h-[calc(80vh-2rem)] ">
                <div class="grid grid-cols-12 w-full gap-4 px-5 font-sarabun mb-3">
                    <div class="col-span-full">
                        <label class="block text-[16px] font-medium text-gray-700 text-start">ชื่อสินค้า
                            :</label>
                        <input v-model="productName" type="text" placeholder="กรุณากรอกชื่อสินค้า"
                            class="w-full text-sm px-2 py-2 mt-1 border rounded-md shadow-sm focus:ring-1 focus:border-blue-300 focus:ring-blue-300 focus:outline-none">
                    </div>
                    <div class="col-span-full">
                        <label class="block text-[16px] font-medium text-gray-700 text-start">หมวดหมู่สินค้า
                            :</label>
                        <select v-model="selectedCategory" id="selectedCategory" @change="fetchSubCategories"
                            class="w-full max-w-full text-sm p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:border-blue-300 focus:ring-blue-300 focus:outline-none overflow-hidden">
                            <option disabled value="" class="font-sarabun">กรุณาเลือกหมวดหมู่สินค้า</option>
                            <option v-for="(Category, index) in Category" :key="index" :value="Category">
                                {{ Category }}
                            </option>
                        </select>
                    </div>
                    <div class="col-span-full">
                        <label class="block text-[16px] font-medium text-gray-700 text-start">
                            หมวดหมู่สินค้าย่อย:
                        </label>
                        <div v-if="subCategories.length > 0" class="mt-2">
                            <div class="grid lg:grid-cols-2 gap-x-4 gap-y-2">
                                <div v-for="(subCategory, index) in subCategories" :key="index">
                                    <div class="flex items-center space-x-2">
                                        <input type="checkbox" :id="'subCategory' + index" :value="subCategory"
                                            v-model="selectedSubCategories" class="w-4 h-4 cursor-pointer" />
                                        <label :for="'subCategory' + index" class="text-sm text-black">
                                            {{ subCategory }}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else
                            class="w-full text-center text-sm px-2 py-2 mt-1 border rounded-md shadow-sm text-gray-400">
                            กรุณาเลือกหมวดหมู่เพื่อแสดงหมวดหมู่ย่อย
                        </div>
                    </div>
                    <div class="col-span-full">
                        <label class="block text-[16px] font-medium text-gray-700 text-start">ประเภทสินค้า
                            :</label>
                        <div class="grid grid-cols-12 w-full gap-4 font-sarabun mb-3">
                            <div class="col-span-6">
                                <div
                                    class="flex justify-center items-center w-full text-center text-sm px-2 py-2 mt-1 border rounded-md shadow-sm space-x-2">
                                    <input v-model="typeProduct" type="radio" class="radio" value="สินค้าทั่วไป" />
                                    <span>สินค้าทั่วไป</span>
                                </div>
                            </div>
                            <div class="col-span-6">
                                <div
                                    class="flex justify-center items-center w-full text-center text-sm px-2 py-2 mt-1 border rounded-md shadow-sm space-x-2">
                                    <input v-model="typeProduct" type="radio" class="radio" value="สินค้าสหกรณ์" />
                                    <span>สินค้าสหกรณ์</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-span-full">
                        <label class="block text-[16px] font-medium text-gray-700 text-start">กำหนดขนาดกล่องพัสดุ
                            :</label>
                        <div class="grid grid-cols-12 w-full font-sarabun">
                            <div class="col-span-full">
                                <div class="w-full text-center text-sm px-2 py-2 mt-1 border rounded-md shadow-sm">
                                    <div v-for="(parcel, index) in parcels" :key="index"
                                        class="grid grid-cols-12 w-full gap-2 font-sarabun mb-1">
                                        <!-- จำนวนสินค้า -->
                                        <div class="col-span-full lg:col-span-2">
                                            <label class="block text-[12px] font-medium text-gray-700 text-start">
                                                จำนวนสินค้า (ชิ้น):
                                            </label>
                                            <input type="text" v-model="parcel.quantity"
                                                class="w-full text-sm px-2 py-2 mt-1 border rounded-md shadow-sm focus:ring-1 focus:border-blue-300 focus:ring-blue-300 focus:outline-none" />
                                        </div>

                                        <!-- น้ำหนักสินค้า -->
                                        <div class="col-span-full lg:col-span-2">
                                            <label class="block text-[12px] font-medium text-gray-700 text-start">
                                                น้ำหนักสินค้า (กรัม):
                                            </label>
                                            <input type="text" v-model="parcel.weight"
                                                class="w-full text-sm px-2 py-2 mt-1 border rounded-md shadow-sm focus:ring-1 focus:border-blue-300 focus:ring-blue-300 focus:outline-none" />
                                        </div>

                                        <!-- ขนาดกล่อง -->
                                        <div class="col-span-full lg:col-span-6">
                                            <label class="block text-[12px] font-medium text-gray-700 text-start">
                                                ขนาดกล่อง:
                                            </label>
                                            <div v-if="parcel.customBox">
                                                <div class="flex gap-2">
                                                    <input type="text" v-model="parcel.size.length"
                                                        placeholder="ยาว (ซม.)"
                                                        class="w-1/3 text-sm px-2 py-2 mt-1 border rounded-md shadow-sm focus:ring-1 focus:border-blue-300 focus:ring-blue-300 focus:outline-none" />
                                                    <input type="text" v-model="parcel.size.width"
                                                        placeholder="กว้าง (ซม.)"
                                                        class="w-1/3 text-sm px-2 py-2 mt-1 border rounded-md shadow-sm focus:ring-1 focus:border-blue-300 focus:ring-blue-300 focus:outline-none" />
                                                    <input type="text" v-model="parcel.size.height"
                                                        placeholder="สูง (ซม.)"
                                                        class="w-1/3 text-sm px-2 py-2 mt-1 border rounded-md shadow-sm focus:ring-1 focus:border-blue-300 focus:ring-blue-300 focus:outline-none" />
                                                </div>
                                            </div>
                                            <select v-if="!parcel.customBox" v-model="parcel.selectedSizeBox"
                                                class="w-full text-sm p-2 mt-1 border border-gray-300 rounded-md">
                                                <option disabled value="">กรุณาเลือกขนาดกล่อง</option>
                                                <option v-for="(sizeBox, index) in sizeBoxOptions" :key="index"
                                                    :value="sizeBox">
                                                    {{ sizeBox }}
                                                </option>
                                            </select>
                                        </div>

                                        <!-- ปุ่ม -->
                                        <div class="col-span-full lg:col-span-2">
                                            <div class="flex items-center justify-center w-full gap-1 lg:mt-5">
                                                <button @click="toggleCustomBox(index)"
                                                    :class="{ 'w-full': index === 0, 'w-2/3': index > 0 }"
                                                    class="text-[14px] mt-1 font-semibold h-[37px] bg-blue-500 text-white rounded-lg hover:bg-blue-700">
                                                    {{ parcel.customBox ? "มาตรฐาน" : "กำหนดเอง" }}
                                                </button>
                                                <button v-if="index > 0" @click="removeBox(index)"
                                                    class="w-1/3 text-[14px] mt-1 font-semibold h-[37px] bg-red-500 text-white rounded-lg hover:bg-red-700 flex justify-center items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                        fill="none" stroke="currentColor" stroke-width="2"
                                                        stroke-linecap="round" stroke-linejoin="round"
                                                        class="lucide lucide-trash-2 h-5 w-5">
                                                        <path d="M3 6h18" />
                                                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                                        <line x1="10" x2="10" y1="11" y2="17" />
                                                        <line x1="14" x2="14" y1="11" y2="17" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <hr class="my-2" />
                                    <div class="col-span-full flex justify-end">
                                        <button @click="addBox"
                                            class="text-[12px] font-semibold h-[37px] bg-green-500 text-white hover:bg-green-600 rounded-lg px-[5px]">
                                            <div class="flex items-center justify-center space-x-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                    stroke-linejoin="round" class="lucide lucide-circle-plus h-5 w-5">
                                                    <circle cx="12" cy="12" r="10" />
                                                    <path d="M8 12h8" />
                                                    <path d="M12 8v8" />
                                                </svg>
                                                <span>เพิ่มกล่องพัสดุใหม่</span>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- ราคาต้นทุนสินค้า -->
                    <div class="col-span-full lg:col-span-4">
                        <label class="block text-[16px] font-medium text-gray-700 text-start">ราคาต้นทุนสินค้า
                            :</label>
                        <input type="number" v-model="costPrice" placeholder="กรุณากรอกราคาต้นทุน (บาท)"
                            class="w-full text-sm px-2 py-2 mt-1 border rounded-md shadow-sm focus:ring-1 focus:border-blue-300 focus:ring-blue-300 focus:outline-none"
                            @input="calculate" />
                    </div>
                    <!-- VAT 7% -->
                    <div class="col-span-full lg:col-span-4">
                        <label class="block text-[16px] font-medium text-gray-700 text-start">Vat 7%
                            :</label>
                        <input type="number" :value="vatcostAmount.toFixed(2)" placeholder="0.00"
                            class="w-full text-sm px-2 py-2 mt-1 border rounded-md shadow-sm focus:ring-1 focus:border-blue-300 focus:ring-blue-300 focus:outline-none"
                            readonly />
                    </div>
                    <!-- ราคาต้นทุนก่อน VAT -->
                    <div class="col-span-full lg:col-span-4">
                        <label class="block text-[16px] font-medium text-gray-700 text-start">ราคาต้นทุนก่อน
                            Vat
                            :</label>
                        <input type="number" :value="netCost.toFixed(2)" placeholder="0.00"
                            class="w-full text-sm px-2 py-2 mt-1 border rounded-md shadow-sm focus:ring-1 focus:border-blue-300 focus:ring-blue-300 focus:outline-none"
                            readonly />
                    </div>
                    <!-- ราคาที่ส่งให้บริษัท -->
                    <div class="col-span-full lg:col-span-4">
                        <label class="block text-[16px] font-medium text-gray-700 text-start">ราคาที่ส่งให้บริษัท
                            :</label>
                        <input type="number" v-model="salePrice"
                            class="w-full text-sm px-2 py-2 mt-1 border rounded-md shadow-sm focus:ring-1 focus:border-blue-300 focus:ring-blue-300 focus:outline-none"
                            @input="calculate" />
                    </div>
                    <!-- VAT 7% -->
                    <div class="col-span-full lg:col-span-4">
                        <label class="block text-[16px] font-medium text-gray-700 text-start">Vat 7%
                            :</label>
                        <input type="number" :value="vatsaleAmount.toFixed(2)" placeholder="0.00"
                            class="w-full text-sm px-2 py-2 mt-1 border rounded-md shadow-sm focus:ring-1 focus:border-blue-300 focus:ring-blue-300 focus:outline-none"
                            readonly />
                    </div>
                    <!-- ราคาที่ส่งให้บริษัทก่อน vat -->
                    <div class="col-span-full lg:col-span-4">
                        <label class="block text-[16px] font-medium text-gray-700 text-start">ราคาที่ส่งให้บริษัทก่อน
                            vat
                            :</label>
                        <input type="number" :value="netSale.toFixed(2)" placeholder="0.00"
                            class="w-full text-sm px-2 py-2 mt-1 border rounded-md shadow-sm focus:ring-1 focus:border-blue-300 focus:ring-blue-300 focus:outline-none"
                            readonly />
                    </div>
                    <!-- ราคาแนะนำขาย -->
                    <div class="col-span-full lg:col-span-4">
                        <label class="block text-[16px] font-medium text-gray-700 text-start">ราคาแนะนำขาย
                            :</label>
                        <input type="number" v-model="recommendedPrice" placeholder="กรุณากรอกราคาต้นทุน (บาท)"
                            class="w-full text-sm px-2 py-2 mt-1 border rounded-md shadow-sm focus:ring-1 focus:border-blue-300 focus:ring-blue-300 focus:outline-none"
                            @input="calculate" />
                    </div>
                    <!-- กำไรสุทธิ -->
                    <div class="col-span-full lg:col-span-4">
                        <label class="block text-[16px] font-medium text-gray-700 text-start">กำไรสุทธิ
                            :</label>
                        <input type="number" :value="netProfit.toFixed(2)" placeholder="0.00"
                            class="w-full text-sm px-2 py-2 mt-1 border rounded-md shadow-sm focus:ring-1 focus:border-blue-300 focus:ring-blue-300 focus:outline-none"
                            readonly />
                    </div>
                    <!-- ส่วนต่างฝากขาย -->
                    <div class="col-span-full lg:col-span-4">
                        <label class="block text-[16px] font-medium text-gray-700 text-start">ส่วนต่างฝากขาย :
                        </label>
                        <input type="number" :value="diffPrice.toFixed(2)" placeholder="0.00"
                            class="w-full text-sm px-2 py-2 mt-1 border rounded-md shadow-sm focus:ring-1 focus:border-blue-300 focus:ring-blue-300 focus:outline-none"
                            readonly />
                    </div>
                    <!-- จำนวนสินค้าในสต๊อก -->
                    <div class="col-span-full lg:col-span-6">
                        <label class="block text-[16px] font-medium text-gray-700 text-start">จำนวนสินค้าในสต๊อก
                            (ชิ้น) :</label>
                        <input type="number" v-model="amountProduct"
                            class="w-full text-sm px-2 py-2 mt-1 border rounded-md shadow-sm focus:ring-1 focus:border-blue-300 focus:ring-blue-300 focus:outline-none" 
                            @input="calculate" />
                    </div>
                    <!-- รายละเอียดสินค้า -->
                    <div class="col-span-full">
                        <label class="block text-[16px] font-medium text-gray-700 text-start">รายละเอียดสินค้า
                            :</label>
                        <textarea
                            class="w-full h-auto lg:h-44  text-sm px-2 py-2 mt-1 border rounded-md shadow-sm focus:ring-1 focus:border-blue-300 focus:ring-blue-300 focus:outline-none"></textarea>
                    </div>
                    <!-- รูปภาพสินค้า -->
                    <div v-for="(imageRef, index) in imageRefs" :key="index" class="col-span-full lg:col-span-6">
                        <label class="block text-[16px] font-medium text-gray-700 text-start">
                            {{ index === 0
                                ? 'รูปภาพสินค้า'
                                : index === 4
                                    ? 'รูปภาพเอกสารทางกฎหมายกำกับสินค้า (เช่น อย. มอก.)'
                                    : `รูปภาพย่อยสินค้า ${index}` }}
                        </label>
                        <div class="w-full flex flex-col justify-center items-center">
                            <div v-if="imageRef.value" class="mb-4 relative">
                                <img :src="imageRef.value" alt="Preview" class="w-full object-cover cursor-pointer pt-1"
                                    @click="openIMG(imageRef.value)" />
                            </div>
                            <input type="file"
                                class="mt-1 file-input file-input-bordered file-input-sm w-full max-w-xs file-input-info text-gray-700"
                                @change="(event) => onFileChange(event, imageRefs[index], index, imageRefs)" />
                        </div>
                    </div>
                </div>
            </div>
            <!-- Contract Details -->
            <div class="flex items-center justify-center mt-3 space-x-3 py-3 border-t">
                <button @click="saveData"
                    class="font-sarabun px-4 py-2 text-gray-100 bg-blue-500 rounded-box  hover:bg-blue-600 hover:text-white">
                    บันทึก
                </button>
                <button @click="closeModal"
                    class="font-sarabun px-4 py-2 text-gray-100  bg-error rounded-box hover:bg-red-700 hover:text-white">
                    ยกเลิก
                </button>
            </div>
        </div>
    </div>

    <!-- Viewer -->
    <div v-if="isImgOpen" class="fixed inset-0 bg-gray-700 bg-opacity-70 flex items-center justify-center z-50">
        <div class="relative bg-transparent p-4">
            <div class="flex items-center justify-end w-full">
                <div class="bg-gray-50 rounded-box p-2 space-x-2 mb-1">
                    <button @click="rotateLeft"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-rotate-ccw h-6 w-6">
                            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                            <path d="M3 3v5h5" />
                        </svg>
                    </button>
                    <button @click="rotateRight"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-rotate-cw h-6 w-6">
                            <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                            <path d="M21 3v5h-5" />
                        </svg>
                    </button>
                    <button @click="zoomIn"
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
                    <button @click="zoomOut"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-zoom-out h-6 w-6">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" x2="16.65" y1="21" y2="16.65" />
                            <line x1="8" x2="14" y1="11" y2="11" />
                        </svg>
                    </button>
                    <button @click="closeIMG"
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
            <div class="overflow-hidden flex items-center justify-center">
                <img :src="image" alt="Preview" class="max-w-full max-h-full" :style="imageStyle" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, reactive } from "vue";

defineProps({
    showModal: {
        type: Boolean,
        required: true,
    },
});

const emit = defineEmits(["save", "close"]);

const productName = ref("");
const selectedCategory = ref("");
const typeProduct = ref("");
const selectedSizeBox = ref("");

// ฟังก์ชันรีเซ็ตค่าฟอร์ม
const resetForm = () => {
    productName.value = "";
    selectedCategory.value = "";
    selectedSubCategories.value = "";
    subCategories.value = "";
    typeProduct.value = "";
    selectedSizeBox.value = "";
    costPrice.value = 0;
    vatcostAmount.value = 0;
    netCost.value = 0;
    salePrice.value = 0;
    vatsaleAmount.value = 0;
    netSale.value = 0;
    netProfit.value = 0;
    amountProduct.value = 0;
    recommendedPrice.value = 0;
    diffPrice.value = 0;

    // รีเซ็ตกล่องพัสดุให้เหลือ 1 อัน
    parcels.length = 0; // ลบรายการทั้งหมด
    addBox(); // เพิ่มรายการเริ่มต้น
};

// ฟังก์ชันสำหรับปิด Modal และรีเซ็ตค่า
const closeModal = () => {
    resetForm();
    image.value = null;  // รีเซ็ตค่าภาพ
    imageRefs.forEach(ref => ref.value = null);  // รีเซ็ตค่าภาพพรีวิวทั้งหมด
    isImgOpen.value = false;// รีเซ็ตสถานะการเปิดภาพ
    emit("close", null); // แจ้ง Parent ว่าปิด Modal (โดยไม่ส่งข้อมูลกลับ)
};

// ฟังก์ชันสำหรับบันทึกข้อมูล
const saveData = () => {
    emit("save",
        productName.value,
        selectedCategory.value,
        selectedSubCategories.value,
        subCategories.value,
        typeProduct.value,
        selectedSizeBox.value
    );
    closeModal(); // ปิด Modal หลังบันทึก
};

const Category = [
    "อาหารและเครื่องดื่ม (Food & Beverages)",
    "ของใช้ประจำวัน (Daily Essentials)",
    "สุขภาพและความงาม (Health & Beauty)",
    "ยาสามัญประจำบ้าน (Home Medicines)",
    "อาหารสดและแช่เย็น (Fresh & Chilled Food)",
    "ขนม (Snacks)",
    "สินค้าสำหรับเด็กและครอบครัว (Kids & Family)",
    "สัตว์เลี้ยง (Pets)",
    "เครื่องเขียนและอุปกรณ์สำนักงาน (Stationery & Office Supplies)",
    "เครื่องใช้ไฟฟ้า (Electronics)",
    "อื่น ๆ (Others)"
];

const selectedSubCategories = ref("");
const subCategories = ref("");
const fetchSubCategories = () => {
    const subCategoryMap = {
        "อาหารและเครื่องดื่ม (Food & Beverages)": [
            "อาหารพร้อมทาน (Ready-to-Eat Meals)",
            "เครื่องดื่มเย็นและร้อน (Cold & Hot Beverages)",
            "เครื่องดื่มแอลกอฮอล์ (Alcoholic Beverages)",
            "ไอศกรีม (Ice Cream)"
        ],
        "ของใช้ประจำวัน (Daily Essentials)": [
            "ผลิตภัณฑ์ทำความสะอาด (Cleaning Products)",
            "กระดาษชำระและทิชชู่ (Tissues & Paper Products)",
            "อุปกรณ์ในห้องน้ำ (Bathroom Essentials)",
            "ถุงขยะและอุปกรณ์จัดเก็บ (Trash Bags & Storage)"
        ],
        "สุขภาพและความงาม (Health & Beauty)": [
            "ผลิตภัณฑ์ดูแลร่างกาย (Body Care Products)",
            "ผลิตภัณฑ์ดูแลผิวหน้า (Facial Care)",
            "อุปกรณ์ดูแลสุขภาพ (Health Gadgets)"
        ],
        "ยาสามัญประจำบ้าน (Home Medicines)": [
            "ยาใช้ภายนอก (Outpatient Medicines)",
            "ยาใช้ภายใน (Inpatient Medicines)",
            "ยาอันตราย (Dangerous Medicines)",
        ],
        "อาหารสดและแช่เย็น (Fresh & Chilled Food)": [
            "ผลิตภัณฑ์นม (Dairy Products)",
            "อาหารแช่แข็ง (Frozen Food)",
            "ผักและผลไม้ (Fresh Vegetables & Fruits)"
        ],
        "ขนม (Snacks)": [
            "ขนม (Snacks)",
            "ลูกอม (Candy)",
            "เบเกอรี่ (Bakery)"
        ],
        "สินค้าสำหรับเด็กและครอบครัว (Kids & Family)": [
            "นมผงและอาหารเด็ก (Baby Formula & Food)",
            "ผ้าอ้อมและผลิตภัณฑ์สำหรับเด็ก (Diapers & Baby Products)",
            "ของเล่นขนาดเล็ก (Mini Toys)"
        ],
        "สัตว์เลี้ยง (Pets)": [
            "อาหารสัตว์เลี้ยง (Pet Food)",
            "ขนมสัตว์เลี้ยง (Pet Treats)",
            "ของเล่นสัตว์เลี้ยง (Pet Toys)"
        ],
        "เครื่องเขียนและอุปกรณ์สำนักงาน (Stationery & Office Supplies)": [
            "ปากกาและดินสอ (Pens & Pencils)",
            "น้ำยาลบคำผิดและยางลบ (Correction fluid & Eraser)",
            "สมุดและกระดาษ (Notebooks & Paper)",
            "เทปกาวและกาว (Tape & Glue)"
        ],
        "เครื่องใช้ไฟฟ้า (Electronics)": [
            "อุปกรณ์ชาร์จไฟ (Chargers)",
            "หูฟังและอุปกรณ์เสริม (Earphones & Accessories)",
            "ถ่านและแบตเตอรี่ (Batteries)"
        ],
        "อื่น ๆ (Others)": [
            "ของฝาก (Souvenirs)",
            "ธูปและเทียน (Incense & Candle)",
            "เครื่องสังฤทาน (Offerings)"
        ],
    };

    // อัปเดตหมวดหมู่ย่อย
    subCategories.value = subCategoryMap[selectedCategory.value] || [];
    selectedSubCategories.value = []; // ล้างหมวดหมู่ย่อยที่เลือกก่อนหน้า

};

const sizeBoxOptions = [
    "17 x 25 x 9 ซม.",
    "20 x 30 x 11 ซม.",
    "24 x 35 x 15 ซม.",
    "30 x 45 x 20 ซม.",
    "40 x 55 x 30 ซม."
];

// ฟังก์ชันสลับโหมดกำหนดเอง
const toggleCustomBox = (index) => {
    parcels[index].customBox = !parcels[index].customBox;
};


const parcels = reactive([
    {
        quantity: "",
        weight: "",
        customBox: false,
        selectedSizeBox: "",
        size: { length: "", width: "", height: "" },
    },
]);

const addBox = () => {
    parcels.push({
        quantity: "",
        weight: "",
        customBox: false,
        selectedSizeBox: "",
        size: { length: "", width: "", height: "" },
    });
};

const removeBox = (index) => {
    parcels.splice(index, 1);
};

const costPrice = ref(0);
const vatcostAmount = ref(0);
const netCost = ref(0);
const salePrice = ref(0);
const vatsaleAmount = ref(0);
const netSale = ref(0);
const netProfit = ref(0);
const recommendedPrice = ref(0);
const diffPrice = ref(0);
const amountProduct = ref(0);
const calculate = () => {
    vatcostAmount.value = costPrice.value * 0.07;
    netCost.value = costPrice.value - vatcostAmount.value;
    vatsaleAmount.value = salePrice.value * 0.07;
    netSale.value = salePrice.value - vatsaleAmount.value;
    diffPrice.value = recommendedPrice.value - salePrice.value;
    netProfit.value = netSale.value - costPrice.value;
};

const imageRefs = [ref(null), ref(null), ref(null), ref(null), ref(null)];
const image = ref(null); // เก็บรูปที่จะแสดงใน Modal
const isImgOpen = ref(false);
const imageStyle = ref({
    transform: 'scale(1) rotate(0deg)',
    maxWidth: '90vw',
    maxHeight: '90vh',
});
const scale = ref(1);
const rotation = ref(0);

const onFileChange = (event, imageRef, index, imageRefs) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            console.log("File loaded:", e.target.result);
            imageRef.value = e.target.result; // อัปเดต ref
        };
        reader.readAsDataURL(file);
    } else {
        // ตรวจสอบว่า imageRefs[index] มีค่าหรือไม่
        if (imageRefs && imageRefs[index]) {
            imageRefs[index].value = null; // ซ่อนรูป Preview
        }
        console.log("No file selected");
    }
};

const openIMG = (selectedImage) => {
    image.value = selectedImage;
    isImgOpen.value = true;
};

const closeIMG = () => {
    isImgOpen.value = false
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

<style></style>