<template>
    <div class="flex w-full px-[5%] mt-8">
        <div
            class="flex-col bg-gradient-to-r rounded-box from-[#cdecff] via-[#b3e3ff] to-[#cdecff] p-5 w-full text-center shadow-md">
            <h1 class="font-sarabun text-2xl font-bold mb-6">เพิ่มฝากสินค้าในร้านค้า</h1>
            <div class="grid bg-gray-50 rounded-box w-full">
                <div class="flex flex-col lg:flex-row w-full py-5 gap-3">
                    <div class="w-full rounded-box">
                        <div class="flex flex-col items-center">
                            <div v-if="image" class="mb-4 relative">
                                <img :src="image" alt="Preview" class="w-40 h-40 object-cover rounded cursor-pointer"
                                    @click="openModal" />
                            </div>
                            <div>
                                <input type="file"
                                    class="file-input file-input-bordered file-input-info text-gray-700 file-input-md w-full max-w-xs mb-[2px]"
                                    @change="onFileChange" />
                            </div>
                            <span class="font-sarabun text-sm mb-4">(ขนาดจะต้องเป็น 1:1)</span>
                        </div>
                        <div class="grid grid-cols-12 w-full gap-4 px-5 font-sarabun mb-5">
                            <div class="col-span-full lg:col-span-5">
                                <label class="block text-sm font-medium text-gray-700 text-start">ชื่อสินค้า :</label>
                                <input type="text" placeholder="กรุณากรอกชื่อสินค้า"
                                    class="w-full text-sm px-2 py-2 mt-1 border rounded-md shadow-sm focus:ring-1 focus:border-blue-300 focus:ring-blue-300 focus:outline-none">
                            </div>
                            <div class="col-span-full lg:col-span-4">
                                <label class="block text-sm font-medium text-gray-700 text-start">บาร์โค้ดสินค้า
                                    :</label>
                                <div class="flex gap-2">
                                    <input type="text" id="barcodeInput" placeholder="กรุณากรอกบาร์โค้ดสินค้า"
                                        class="w-full text-sm p-2 mt-1 border rounded-md shadow-sm focus:ring-1 focus:border-blue-300 focus:ring-blue-300 focus:outline-none">
                                    <button id="checkBarcodeButton" @click="checkBarcode"
                                        class="text-[12px] mt-1 font-semibold h-[37px] bg-blue-500 text-white rounded-lg px-2">
                                        ตรวจสอบบาร์โค้ด
                                    </button>
                                </div>
                            </div>
                            <div class="col-span-full lg:col-span-3">
                                <label class="block text-sm font-medium text-gray-700 text-start">หมวดหมู่สินค้า
                                    :</label>
                                <select v-model="selectedCategory" id="selectedCategory"
                                    class="w-full max-w-full text-sm p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:border-blue-300 focus:ring-blue-300 focus:outline-none overflow-hidden">
                                    <option disabled value="" class="font-sarabun">กรุณาเลือกหมวดหมู่สินค้า</option>
                                    <option v-for="(Category, index) in Category" :key="index" :value="Category">
                                {{ Category }}
                            </option>
                                </select>
                            </div>
                        </div>
                        <div class="grid grid-cols-12 w-full gap-4 px-5 font-sarabun mb-5">
                            <!-- ราคาต้นทุน -->
                            <div class="col-span-full lg:col-span-4">
                                <label class="block text-sm font-medium text-gray-700 text-start">ราคาต้นทุน :</label>
                                <input type="number" v-model="costPrice" placeholder="กรุณากรอกราคาต้นทุน (บาท)"
                                    class="w-full text-sm px-2 py-2 mt-1 border rounded-md shadow-sm focus:ring-1 focus:border-blue-300 focus:ring-blue-300 focus:outline-none"
                                    @input="calculate" />
                            </div>
                            <!-- VAT 7% -->
                            <div class="col-span-full lg:col-span-4">
                                <label class="block text-sm font-medium text-gray-700 text-start">Vat 7% :</label>
                                <input type="text" :value="vatcostAmount.toFixed(2)" placeholder="0.00"
                                    class="w-full text-sm px-2 py-2 mt-1 border rounded-md shadow-sm focus:ring-1 focus:border-blue-300 focus:ring-blue-300 focus:outline-none"
                                    readonly />
                            </div>
                            <!-- ราคาต้นทุนก่อน VAT -->
                            <div class="col-span-full lg:col-span-4">
                                <label class="block text-sm font-medium text-gray-700 text-start">ราคาต้นทุนก่อน Vat
                                    :</label>
                                <input type="text" :value="netCost.toFixed(2)" placeholder="0.00"
                                    class="w-full text-sm px-2 py-2 mt-1 border rounded-md shadow-sm focus:ring-1 focus:border-blue-300 focus:ring-blue-300 focus:outline-none"
                                    readonly />
                            </div>
                        </div>
                        <div class="grid grid-cols-12 w-full gap-4 px-5 font-sarabun mb-5">
                            <!-- ราคาขาย -->
                            <div class="col-span-full lg:col-span-4">
                                <label class="block text-sm font-medium text-gray-700 text-start">ราคาขาย :</label>
                                <input type="number" v-model="salePrice" placeholder="กรุณากรอกราคาต้นทุน (บาท)"
                                    class="w-full text-sm px-2 py-2 mt-1 border rounded-md shadow-sm focus:ring-1 focus:border-blue-300 focus:ring-blue-300 focus:outline-none"
                                    @input="calculate" />
                            </div>
                            <!-- VAT 7% -->
                            <div class="col-span-full lg:col-span-4">
                                <label class="block text-sm font-medium text-gray-700 text-start">Vat 7% :</label>
                                <input type="text" :value="vatsaleAmount.toFixed(2)" placeholder="0.00"
                                    class="w-full text-sm px-2 py-2 mt-1 border rounded-md shadow-sm focus:ring-1 focus:border-blue-300 focus:ring-blue-300 focus:outline-none"
                                    readonly />
                            </div>
                            <!-- ราคาขายหน้าร้านก่อน Vat -->
                            <div class="col-span-full lg:col-span-4">
                                <label class="block text-sm font-medium text-gray-700 text-start">ราคาขายหน้าร้านก่อน
                                    Vat :</label>
                                <input type="text" :value="netSale.toFixed(2)" placeholder="0.00"
                                    class="w-full text-sm px-2 py-2 mt-1 border rounded-md shadow-sm focus:ring-1 focus:border-blue-300 focus:ring-blue-300 focus:outline-none"
                                    readonly />
                            </div>
                        </div>
                        <div class="grid grid-cols-12 w-full gap-4 px-5 font-sarabun mb-5">
                            <!-- กำไรสุทธิ -->
                            <div class="col-span-full lg:col-span-4">
                                <label class="block text-sm font-medium text-gray-700 text-start">กำไรสุทธิ :</label>
                                <input type="text" :value="netProfit.toFixed(2)" placeholder="0.00"
                                    class="w-full text-sm px-2 py-2 mt-1 border rounded-md shadow-sm focus:ring-1 focus:border-blue-300 focus:ring-blue-300 focus:outline-none"
                                    readonly />
                            </div>
                            <!-- กำไร Partner -->
                            <div class="col-span-full lg:col-span-4">
                                <label class="block text-sm font-medium text-gray-700 text-start">กำไร Partner :</label>
                                <input type="text" :value="profit_P.toFixed(2)" placeholder="0.00"
                                    class="w-full text-sm px-2 py-2 mt-1 border rounded-md shadow-sm focus:ring-1 focus:border-blue-300 focus:ring-blue-300 focus:outline-none"
                                    readonly />
                            </div>
                            <!-- กำไร Tossagun -->
                            <div class="col-span-full lg:col-span-4">
                                <label class="block text-sm font-medium text-gray-700 text-start">กำไร Tossagun
                                    :</label>
                                <input type="text" :value="profit_T.toFixed(2)" placeholder="0.00"
                                    class="w-full text-sm px-2 py-2 mt-1 border rounded-md shadow-sm focus:ring-1 focus:border-blue-300 focus:ring-blue-300 focus:outline-none"
                                    readonly />
                            </div>
                        </div>
                        <div class="grid grid-cols-12 w-full gap-4 px-5 font-sarabun mb-5">
                            <!-- จำนวนสินค้าในสต๊อก -->
                            <div class="col-span-full lg:col-span-4">
                                <label class="block text-sm font-medium text-gray-700 text-start">จำนวนสินค้าในสต๊อก
                                    (ชิ้น) :</label>
                                <input type="number" v-model="amountProduct"
                                    class="w-full text-sm px-2 py-2 mt-1 border rounded-md shadow-sm focus:ring-1 focus:border-blue-300 focus:ring-blue-300 focus:outline-none"
                                    @input="calculate" />
                            </div>
                        </div>
                        <div class="grid grid-cols-12 w-full gap-4 px-5 font-sarabun">
                            <div class="col-span-full">
                                <label class="block text-sm font-medium text-gray-700 text-start">รายละเอียดสินค้า
                                    :</label>
                                <textarea
                                    class="w-full h-auto lg:h-44  text-sm px-2 py-2 mt-1 border rounded-md shadow-sm focus:ring-1 focus:border-blue-300 focus:ring-blue-300 focus:outline-none"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex items-center justify-center w-full gap-4 font-sarabun mb-5">
                    <button class="bg-blue-500 text-white hover:bg-blue-700 py-2 px-4 rounded-box">บันทึกข้อมูล</button>
                    <button class="bg-error text-white hover:bg-red-700 py-2 px-4 rounded-box">ยกเลิก</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-gray-700 bg-opacity-70 flex items-center justify-center z-50">
        <div class="relative bg-transparent p-4">
            <div class="flex items-center justify-end w-full">
                <div class="bg-gray-50 rounded-box p-2 space-x-2 mb-1">
                    <button @click="rotateLeft" type="button"
                        class="relative text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-rotate-ccw h-6 w-6">
                            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                            <path d="M3 3v5h5" />
                        </svg>
                    </button>
                    <button @click="rotateRight" type="button"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-rotate-cw h-6 w-6">
                            <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                            <path d="M21 3v5h-5" />
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
                    <button @click="closeModal" type="button"
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
                <img :src="image" alt="Zoomable and Rotatable" class="cursor-grab" :style="imageStyle" />
            </div>
        </div>
    </div>


    <!-- Alert Barcode -->
    <div v-if="isAlertVisible"
        class="fixed top-[110px] right-4 z-50 flex items-center w-full max-w-xs p-3 mb-4 border-[3px] border-green-300 text-green-800 bg-green-50 rounded-box"
        role="alert">
        <div class="inline-flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
            <svg class="flex-shrink-0 w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                viewBox="0 0 20 20">
                <path
                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
        </div>
        <div class="mx-1 text-sm font-medium font-sarabun">บาร์โค้ดสินค้าดังกล่าวสามารถใช้งานได้</div>
        <button type="button"
            class="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg p-1 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8"
            data-dismiss-target="#toast-success" aria-label="Close" @click="closeAlert">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
        </button>
    </div>
    <div v-if="isInputAlert"
        class="fixed top-[110px] right-4 z-50 flex items-center w-full max-w-xs p-3 mb-4 border-[3px] border-red-300 text-red-800 bg-red-50 rounded-box"
        role="alert">
        <div class="inline-flex items-center justify-center w-8 h-8 bg-red-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </div>
        <div class="mx-1 text-sm font-medium font-sarabun">กรุณากรอกบาร์โค้ดสินค้า</div>
        <button type="button"
            class="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg p-1 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8"
            data-dismiss-target="#toast-success" aria-label="Close" @click="closeAlert">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
        </button>
    </div>
    <div v-if="isWrongInput"
        class="fixed top-[110px] right-4 z-50 flex items-center w-full max-w-xs p-3 mb-4 border-[3px] border-yellow-300 text-yellow-800 bg-yellow-50 rounded-box"
        role="alert">
        <div class="inline-flex items-center justify-center w-8 h-8 bg-yellow-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        </div>
        <div class="mx-1 text-sm font-medium font-sarabun">กรุณากรอกบาร์โค้ดสินค้าให้ถูกต้อง</div>
        <button type="button"
            class="ms-auto -mx-1.5 -my-1.5 bg-yellow-50 text-yellow-500 rounded-lg p-1 hover:bg-yellow-200 inline-flex items-center justify-center h-8 w-8"
            data-dismiss-target="#toast-success" aria-label="Close" @click="closeAlert">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
        </button>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const image = ref(null);
const isModalOpen = ref(false);
const imageStyle = ref({
    transform: 'scale(1) rotate(0deg)',
    maxWidth: '90vw',
    maxHeight: '90vh',
});
const scale = ref(1);
const rotation = ref(0);
const barcode = ref('');
let alertTimeout = null;

const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            image.value = e.target.result;
        };
        reader.readAsDataURL(file);
    }
};

const openModal = () => {
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
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

const isAlertVisible = ref(false);
const isInputAlert = ref(false);
const isWrongInput = ref(false);
const checkBarcode = () => {
    const barcodeInput = document.getElementById('barcodeInput').value.trim();

    // ตรวจสอบว่ามีค่าอินพุตหรือไม่
    if (!barcodeInput) {
        isInputAlert.value = true;
        showAlert();
        return;
    }

    // ตรวจสอบว่าบาร์โค้ดเป็นตัวเลขเท่านั้น
    if (!/^\d+$/.test(barcodeInput)) {
        isWrongInput.value = true;
        showAlert();
        return;
    }

    barcode.value = barcodeInput;
    isAlertVisible.value = true;

    showAlert();
};

const showAlert = () => {
    clearTimeout(alertTimeout); // ล้าง timeout ที่มีอยู่ก่อนหน้า
    alertTimeout = setTimeout(() => {
        isAlertVisible.value = false;
        isInputAlert.value = false;
        isWrongInput.value = false;
    }, 3500);
};

const closeAlert = () => {
    isAlertVisible.value = false;
    isInputAlert.value = false;
    isWrongInput.value = false;
    clearTimeout(alertTimeout);
};

const costPrice = ref(0);
const vatcostAmount = ref(0);
const netCost = ref(0);
const salePrice = ref(0);
const vatsaleAmount = ref(0);
const netSale = ref(0);
const netProfit = ref(0);
const profit_T = ref(0);
const profit_P = ref(0);
const amountProduct = ref(0);

// Function to calculate VAT and net cost
const calculate = () => {
    vatcostAmount.value = costPrice.value * 0.07;
    netCost.value = costPrice.value - vatcostAmount.value;
    vatsaleAmount.value = salePrice.value * 0.07;
    netSale.value = salePrice.value - vatsaleAmount.value;
    netProfit.value = netSale.value - costPrice.value;
    profit_T.value = (netProfit.value / 2);
    profit_P.value = (netProfit.value / 2);
};

const selectedCategory = ref("");
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
</script>

<style>
/* Prevent image selection */
img {
    user-select: none;
}
</style>
