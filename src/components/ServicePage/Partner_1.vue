<script setup>
import { ref, onMounted } from "vue";
import axios from 'axios';
const showModal = ref(false);
const showSecondModal = ref(false);

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

const closeModal = () => {
    showModal.value = false;
};

const closeSecondModal = () => {
    showSecondModal.value = false;
};

const handleConfirm = () => {
    closeModal();
    showSecondModal.value = true;
};
const options = ['S', 'M', 'L', 'XL', 'ลงทุนแบบอิสระ'];
const selectedOption = ref('');

const provinces = ref([]);
const districts = ref([]);
const subdistricts = ref([]);
const selectedProvince = ref("");
const selectedDistrict = ref("");
const selectedSubdistrict = ref("");
const postalCode = ref("");

onMounted(() => {
    fetchProvinces();
});

const fetchProvinces = () => {
    axios
        .get("/provinces.json")
        .then((response) => {
            provinces.value = response.data;
        })
        .catch((error) => {
            console.error("Error fetching provinces:", error);
        });
};

// Handle province selection
const onProvinceChange = () => {
    if (selectedProvince.value) {
        fetchDistricts(selectedProvince.value);
    } else {
        districts.value = [];
        subdistricts.value = [];
        postalCode.value = "";
    }
};

// Fetch districts based on provinceCode
const fetchDistricts = (provinceCode) => {
    axios
        .get("/districts.json")
        .then((response) => {
            districts.value = response.data.filter(
                (district) => district.provinceCode === provinceCode
            );
        })
        .catch((error) => {
            console.error("Error fetching districts:", error);
        });
};

// Handle district selection
const onDistrictChange = () => {
    if (selectedDistrict.value) {
        fetchSubdistricts(selectedProvince.value, selectedDistrict.value);
    } else {
        subdistricts.value = [];
        postalCode.value = "";
    }
};

// Fetch subdistricts based on provinceCode and districtCode
const fetchSubdistricts = (provinceCode, districtCode) => {
    axios
        .get("/subdistricts.json")
        .then((response) => {
            subdistricts.value = response.data.filter(
                (subdistrict) =>
                    subdistrict.provinceCode === provinceCode &&
                    subdistrict.districtCode === districtCode
            );
        })
        .catch((error) => {
            console.error("Error fetching subdistricts:", error);
        });
};

// Handle subdistrict selection
const onSubdistrictChange = () => {
    const selectedSub = subdistricts.value.find(
        (subdistrict) => subdistrict.subdistrictCode === selectedSubdistrict.value
    );
    postalCode.value = selectedSub ? selectedSub.postalCode : "";
};
</script>

<template>
    <div class="flex flex-col justify-center items-center w-full p-8 text-center">
        <h1 class="text-4xl font-sarabun font-bold text-gray-800">One Stop Service</h1>
    </div>
    <article class="container mx-auto items-center justify-between mt-10 mb-10 px-4 sm:px-10 md:px-20">
        <!-- Card -->
        <div class="bg-[#001F54] shadow rounded-lg mb-6 p-4">
            <div class="flex flex-col sm:flex-row border border-[#0047AB] rounded-lg overflow-hidden">
                <!-- Image Section -->
                <div class="flex flex-col items-center border-b sm:border-b-0 sm:border-r sm:w-1/4 p-6">
                    <img src="../../assets/img/register_land.png" class="shadow p-2 mb-4 w-40 h-40 sm:w-60 sm:h-60"
                        alt="Register Invest">
                </div>
                <!-- Content Section -->
                <div class="flex flex-col sm:w-3/4 p-6 text-white space-y-4">
                    <h2 class="text-2xl sm:text-3xl font-sarabun underline text-center sm:text-left">
                        ลงทุนด้วยพื้นที่และสถานที่</h2>
                    <p class="text-justify text-[18px] font-sarabun sm:text-base leading-relaxed">
                        &nbsp;&nbsp;&nbsp;
                        สำหรับบุคลทั่วไปที่สนใจลงทุนด้วยสถานที่พร้อมมีเจ้าหน้าที่ศูนย์บริการดูแลศูนย์โดยไม่ต้องใช้เงินทุนตัวเองในการลงทุน
                        ระบบทำงานอัตโนมัติ เพียงท่านเป็นเจ้าของสถานที่ หรือมีอำนาจในการใช้สถานที่ถูกต้องตามกฎหมาย
                        รับส่วนแบ่งทางการตลาดตามแผนการตลาดของบริษัทฯ โดยเงื่อนไขเป็นไปตามข้อตกลงที่บริษัทฯ กำหนด
                        เท่านั้น
                    </p>
                    <div class="flex justify-center sm:justify-center p-2">
                        <button type="button" @click="showModal = true"
                            class="text-black bg-gradient-to-tr from-[#E1A82F] via-[#FCE05C] to-[#E1A82F] active:scale-95 hover:scale-98 font-sarabun rounded-lg text-sm sm:text-base font-bold px-5 py-2.5">
                            ลงทะเบียน
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- First Modal -->
        <div v-if="showModal" @click.self="closeModal"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div class="bg-white rounded-xl shadow-xl w-11/12 md:w-2/3">
                <div class="flex justify-end items-center p-4 border-b">
                    <button @click="closeModal" type="button"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                    </button>
                </div>
                <div class="p-4 space-y-1 overflow-y-auto max-h-[calc(80vh-2rem)]">
                    <div class="text-[120%] font-sarabun leading-relaxed gap-2">
                        <p class="ql-align-center">
                            <strong>สัญญาเปิดศูนย์บริการลูกค้า </strong>
                        </p>
                        <p class="ql-align-center">
                            <strong>ภายใต้แบรนด์ ทศกัณฐ์ (TOSSAGUN) </strong>
                        </p>
                        <p class="ql-align-center">
                            <strong>ทศกัณฐ์ วันสต็อป ช็อป (TOSSAGUN ONE STOP SHOP) </strong>
                        </p>
                        <p class="ql-align-center">
                            <strong>สัญญามีที่ ไม่มีทุน </strong>
                        </p>
                        <p class="ql-align-center">
                            <br>
                        </p>
                        <p>
                            สัญญาฉบับนี้จัดทำขึ้น ณ บริษัท ทศกัณฐ์ ดิจิตอล นิว เจนเนอเรชั่น จำกัด เมื่อวันที่
                            <u>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </u>
                            ระหว่าง บริษัท ทศกัณฐ์ ดิจิตอล นิว เจนเนอเรชั่น ทะเบียนบริษัทเลขที่ 0505567007065
                            สำนักงานใหญ่ตั้งอยู่ 103 หมู่ที่ 4 ถนนรอบเมืองเชียงใหม่ ตำบลสุเทพ อำเภอเมืองเชียงใหม่
                            จังหวัดเชียงใหม่ 50200 ซึ่งต่อไปในสัญญาฉบับนี้ เรียกว่า “บริษัทฯ” ฝ่ายหนึ่ง
                        </p>
                        <p>
                            กับ นาย/นาง/นางสาว
                            <u>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </u>
                            ซึ่งต่อไปนี้เรียกว่า “ผู้เปิดศูนย์ฯ” ในการให้บริการตามแผนการตลาดของบริษัทฯ
                            การรับสมัครสมาชิก/ การให้บริการสมาชิก การขายสินค้า และการบริการทุกประเภท โดยบริษัทฯ
                            เป็นศูนย์กลางในการให้ข้อมูล และประสานงาน ทั้งสองฝ่ายตกลงทำสัญญากัน ดังมีข้อความต่อไปนี้
                        </p>
                        <p>
                            <br>
                        </p>
                        <p>
                            ขนาด Size S (พื้นที่ 4 x 6 ตารางเมตร) ขนาด Size M (พื้นที่ 6 x 8 ตารางเมตร)
                        </p>
                        <p>
                            <br>
                        </p>
                        <p>
                            ขนาด Size L (พื้นที่ 10 x 12 ตารางเมตร) ขนาด Size XL (พื้นที่ 12 ตารางเมตรขึ้นไป)
                        </p>
                        <p>
                            <br>
                        </p>
                        <p>
                            <strong>1.&nbsp;&nbsp;คำจำกัดความ </strong>
                        </p>
                        <div class="ml-4">
                            <p>
                                1.1 ลายมือชื่ออิเล็กทรอนิกส์ หมายถึง ว่าด้วยพระราชบัญญัติว่าด้วยธุรกรรมทางอิเล็กทรอนิกส์
                                พ.ศ. 2544 ลายมือชื่ออิเล็กทรอนิกส์ หมายถึง อักษร อักขระ ตัวเลข
                                เสียงหรือสัญลักษณ์อื่นใดที่สร้างขึ้นให้อยู่ในรูปแบบอิเล็กทรอนิกส์ซึ่งนำมาใช้ประกอบกับข้อมูลอิเล็กทรอนิกส์
                                เพื่อแสดงความสัมพันธ์ระหว่างบุคคลกับข้อมูลอิเล็กทรอนิกส์
                                โดยมีวัตถุประสงค์เพื่อระบุตัวบุคคลผู้เป็นเจ้าของลายมือชื่ออิเล็กทรอนิกส์ที่เกี่ยวข้องกับข้อมูลอิเล็กทรอนิกส์นั้น
                                และเพื่อแสดงว่าบุคคลดังกล่าวยอมรับข้อความในข้อมูลอิเล็กทรอนิกส์นั้น
                            </p>
                            <p>
                                1.2 ผู้เปิดศูนย์ฯ หมายถึง ผู้เปิดศูนย์บริการลูกค้าทุกประเภทของบริษัทฯ
                                เพื่อจำหน่ายสินค้าหรือให้บริการรวมถึงการดำเนินการตามแผนการตลาดของบริษัทฯ
                                ภายใต้ขอบเขตของบริษัทฯ
                            </p>
                            <p>
                                1.3 ผู้ลงทุน หมายถึง บุคคลที่เป็นเจ้าของกรรมสิทธิ์ในกิจการ ในสัญญาฉบับนี้ให้หมายถึง
                                บริษัท ทศกัณฐ์ ดิจิตอล นิวเจนเนอเรชั่น จำกัด
                            </p>
                            <p>1.4 บริษัทฯ หมายถึง ทศกัณฐ์ ดิจิตอล นิวเจนเนอเรชั่น จำกัด</p>
                            <p>
                                1.5 ข้อมูลส่วนบุคคล หมายถึง
                                ข้อมูลเกี่ยวกับบุคคลซึ่งทำให้สามารถระบุตัวบุคคลนั้นได้ไม่ว่าทางตรง ทางอ้อม
                                รวมถึงข้อมูลส่วนบุคคลตามกฎหมายเกี่ยวกับการคุ้มครองข้อมูลส่วนบุคคล
                            </p>
                            <p>
                                1.6 ข้อมูลอันเป็นความลับ หมายถึง ข้อมูลส่วนบุคคล หรือข้อมูลทางการค้า ความลับเชิงพาณิชย์
                                ข้อมูลที่เป็นความลับหรือทางการค้าเกี่ยวกับบริษัทฯ และคู่สัญญาของบริษัทฯ
                                <strong></strong>
                                และข้อมูลที่เป็นความลับอื่นๆทั้งหมด ที่บริษัทอาจเปิดเผยแก่ผู้เปิดศูนย์
                                <strong>ฯ</strong>
                            </p>
                            <p>
                                1.7 ทรัพย์สินทางปัญญา หมายถึง สิทธิในทรัพย์สินทางปัญญาทั้งปวงอันรวมถึงแต่ไม่จำกัดเพียง
                                ลิขสิทธิ์ สิทธิบัตร เครื่องหมายทางการค้า เครื่องหมายบริการ ซึ่งทางการค้าหรือการออกแบบ
                                ระบบงานใดที่เกิดจากการสร้างสรรค์ คิดค้น ออกแบบ
                            </p>
                            <p>
                                1.8 เหตุสุดวิสัย หมายถึง เหตุใด ๆ
                                ที่คู่สัญญาไม่อาจป้องกันหรือมิได้เกิดจากการกระทำของคู่สัญญานั้น
                                แม้ว่าจะได้ใช้ความระมัดระวังอันตามสมควรอันพึงคาดหมายได้จากบุคคลในฐานะและภาวะเช่นนั้นซึ่งได้แก่
                                เหตุที่เกิดจากภัยธรรมชาติ เช่น น้ำท่วม ไฟไหม้
                                แผ่นดินไหวหรือเกิดจากการใช้อำนาจรัฐหรือการกระทำโดยบุคคลภายนอกหรือปัจจัยภายนอก
                            </p>
                            <p>
                                1.9 สินค้า หมายถึง สินค้าที่เจ้าของสินค้าทำการผลิตหรือนำเข้าหรือสินค้าประเภทอื่น ๆ
                                ที่เกี่ยวข้องที่มี ณ ปัจจุบันหรือจะมีเพิ่มเติมในอนาคต ที่เจ้าของสินค้าฝากให้แก่บริษัทฯ
                                เพื่อจำหน่ายให้แก่ลูกค้าหรือสินค้าที่ทางบริษัทฯ จัดหาหรือผลิตเอง
                            </p>
                            <p>
                                1.10
                                <a href="https://www.xxxxxxx/" rel="noopener noreferrer" target="_blank">www.xxxxxxx</a>
                                . หมายถึง เว็บไซต์ของบริษัทฯ
                                ในการซื้อขายสินค้าหรือบริการจัดการธุรกรรมซื้อขายผลิตภัณฑ์ต่าง ๆ
                                และให้หมายความรวมถึงเว็บไซต์อื่น ๆ ของบริษัทฯ ที่จะมีขึ้นในอนาคตด้วย
                            </p>
                            <p>
                                1.11 ทุกช่องทางของบริษัทฯ หมายถึง ช่องทางออนไลน์อื่นใด ที่อยู่ภายใต้เว็บไซต์ของบริษัทฯ
                            </p>
                            <p>
                                1.12 ลูกค้า หมายถึง บุคคลธรรมดา ร้านค้าหรือนิติบุคคลทั่วไป
                                ที่ซื้อสินค้าจากเจ้าของสินค้าในลักษณะซื้อ-ขายเสร็จเด็ดขาดบนหน้าเว็บไซต์
                                http://tossaguns.com หรือทุกช่องทางของบริษัทฯ
                            </p>
                        </div>
                        <p>
                            <br>
                        </p>
                        <p>
                            <strong>2.&nbsp;&nbsp;ความสัมพันธ์ตามสัญญา</strong>
                        </p>
                        <div class="ml-4">
                            <p>
                                2.1 ผู้เปิดศูนย์ฯ ได้สมัครเพื่อให้บริการดำเนินการตามแผนการตลาดของบริษัทฯ
                                เพื่อเป็นสื่อกลางในการให้บริหารงานภายใต้ขอบเขตที่บริษัทฯกำหนด
                                และให้ข้อมูลข่าวสารองค์ความรู้แก่ตัวแทนศูนย์ฯ ภายใต้พื้นที่ที่สมาชิกดูแล
                                และรับสมัครสมาชิกตลอดจนชี้แจงประสานงาน และให้บริการข้อมูลข่าวสารแก่สมาชิก และบริการอื่น
                                ๆ ตามแผนการตลาดของบริษัทฯ
                            </p>
                            <p>
                                2.2 ผู้เปิดศูนย์ฯ จะได้รับหนังสือแต่งตั้งการเป็นตัวแทนตามประเภท ออกเป็นหนังสือติดตั้งไว้
                                ณ ศูนย์บริการของท่านเสมือนเป็นตัวแทนของบริษัทฯ พร้อมทั้งเอกสารที่เกี่ยวข้อง
                            </p>
                            <p>
                                2.3 ผู้เปิดศูนย์ฯ ทราบและเข้าใจเป็นอย่างดีว่า บริษัทฯ
                                เป็นผู้ให้บริการการตลาดแบบตรงหรือเป็นสื่อกลางกับผู้ใช้บริการ และผู้บริโภค
                                ผ่านเว็บไซต์หรือทุกช่องทางของบริษัทฯ เพื่อเป็นช่องทางในการซื้อขายสินค้าหรือบริการ
                                จัดการธุรกรรมซื้อขายผลิตภัณฑ์ต่าง ๆ ซึ่งต่อไปนี้เรียกว่า “ระบบแพลตฟอร์ม”
                                โดยผู้เปิดศูนย์ฯ ตกลงใช้บริการแพลตฟอร์ม และบริษัทฯ ตกลงให้ผู้เปิดศูนย์ฯ
                                ใช้ระบบแพลตฟอร์มดังกล่าวตามประเภทที่ได้เลือกตามความสมัครใจของผู้เปิดศูนย์ฯ แต่ละประเภท
                                โดยใบแต่งตั้งทางบริษัทฯ จะอนุมัติ และออกให้ตามประเภทที่เลือกนั้น ๆ
                            </p>
                        </div>
                        <p>
                            <br>
                        </p>
                        <p>
                            <strong>3.&nbsp;&nbsp;เครื่องหมายทางการค้าในธุรกิจ</strong>
                        </p>
                        <div class="ml-4">
                            <p>
                                3.1 เครื่องหมายหรือสัญลักษณ์การเป็นตัวแทนของบริษัทฯ ตลอดจนเว็บไซต์แอพพลิเคชั่น
                                และสื่อการตลาดทุกรูปแบบ รวมถึงทรัพย์สินทางปัญญา นวัตกรรม ฯลฯ ของบริษัทฯ
                                เพื่อให้ใช้สิทธิต่าง ๆ
                                ตามสัญญาฉบับนี้มีผลบังคับใช้เพื่อให้มีการเปิดศูนย์บริการฝากขายสินค้า
                                และบริการเป็นไปตามที่ส่วนกลางกำหนด ไม่อนุญาตให้ดัดแปลง แก้ไข
                                โดยไม่ได้รับอนุญาตเป็นลายลักษณ์อักษรจากทางบริษัทฯ
                            </p>
                            <p>
                                3.2 ผู้เปิดศูนย์ฯ
                                จะต้องใช้เครื่องหมายทางการค้าตามสัญญาฉบับนี้เพื่อประกอบกิจการค้าตามปกติ
                                และอยู่ภายใต้ขอบเขตที่กำหนดไว้ในสัญญา ผู้เปิดศูนย์ฯ ตกลงว่าจะไม่กระทำการใด ๆ
                                อันเป็นการรบกวนหรือแย้งกับสิทธิประโยชน์เจ้าของเครื่องหมายทางการค้ารวมถึงผู้มีส่วนเกี่ยวข้องไม่ว่าจะกระทำเพื่อตนเองหรือผู้อื่น
                                ตลอดจนจะไม่กระทำการใด ๆ
                                หรือยอมให้กระทำการฝ่าฝืนกฎหมายหรือขัดต่อความสงบเรียบร้อยหรือศีลธรรมอันดีของประชาชนหรือก่อให้เกิดความรำคาญหรือเป็นที่น่ารังเกียจแก่บุคคลใดในสภาพที่ประกอบการค้านั้น
                            </p>
                            <p>
                                3.3 ผู้เปิดศูนย์ฯ จะต้องป้องกันเครื่องหมาย
                                สัญลักษณ์หรือเครื่องหมายทางการค้าดังกล่าวมิให้ผู้อื่นกระทำการล่วงล้ำสิทธิในเครื่องหมายทางการค้าของบริษัทฯ
                                ไม่ว่าจะเป็นการใช้เครื่องหมายปลอม การลอกเลียนแบบเครื่องหมายทางการค้า
                                การใช้รูปรอยประดิษฐ์หรือข้อความใด ๆ หากพบเห็นจะต้องแจ้งให้บริษัทฯ ทราบทันที
                            </p>
                        </div>
                        <p>
                            <br>
                        </p>
                        <p>
                            <strong>4.&nbsp;&nbsp;ระยะเวลาในการให้สิทธิประกอบธุรกิจ</strong>
                        </p>
                        <div class="ml-4">
                            <p>
                                4.1 ระยะเวลาในการให้สิทธิในการประกอบธุรกิจระยะเวลา 3 ปีตามสัญญาฉบับนี้ บริษัทฯ
                                ตกลงให้ใช้สิทธิในการประกอบธุรกิจแก่ผู้เปิดศูนย์ฯ
                                มีผลตลอดระยะเวลาตามสัญญาในการเปิดศูนย์ให้บริการภายใต้ความดูแลและควบคุมของบริษัทฯ
                                สิทธิในการประกอบธุรกิจมีผลจนกว่าคู่สัญญาฝ่ายใดฝ่ายหนึ่งจะปฏิบัติตามเงื่อนไขการสิ้นสุดของสัญญา
                            </p>
                            <p>
                                4.2 ระยะเวลาการเปิดศูนย์บริการลูกค้า
                                คือไม่มีกำหนดระยะเวลาจนกว่าจะมีประกาศเปลี่ยนแปลงเป็นลายลักษณ์อักษร
                            </p>
                        </div>
                        <p>
                            <br>
                        </p>
                        <p>
                            <strong>5.&nbsp;&nbsp;ประเภทแฟรนไชต์</strong>
                        </p>
                        <div class="ml-4">
                            <p>
                                ผู้เปิดศูนย์ฯ สามารถเลือกประเภทของศูนย์บริการได้ตามความสมัครใจ
                                โดยมีรายละเอียดเพิ่มเติมในส่วนของค่าตอบแทนทางการตลาด ดังต่อไปนี้
                            </p>
                            <p>
                                อัตราค่าตอบแทน 100 % = ผู้บริหารศูนย์ฯ 70 %, ผู้ลงทุน(บริษัทฯ) 20%, ค่าบริการ, ระบบ 10%
                                ของกำไรสุทธิหลังหักต้นทุน และค่าใช้จ่ายทางการตลาด (ค่าส่งเสริมการตลาด อาธิ เงินคืน
                                กองทุน All sale โบนัส) ตามแผนบริษัทฯ กำหนด
                            </p>
                            <p>
                                ยอดขายสินค้า/ รายได้ค่าบริการประจำ
                                วัน&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;xxx
                            </p>
                            <p>
                                <u>หัก</u>
                                ต้นทุน
                                <strong>(1)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <u>xxx</u>
                            </p>
                            <p>
                                <u>กำไรหลังหักต้นทุน</u>
                                คงเหลือ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;xxxx
                                <strong>(A)</strong>
                            </p>
                            <p>ค่าใช้จ่ายในการส่งเสริมการขาย และการตลาด</p>
                            <p>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(แบ่งปันPlatform) 10% แบ่งออกเป็น 2 ส่วน ดังนี้
                                <strong>(A x 10%)</strong>
                                <strong>(B)</strong>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </p>
                            <p>
                                <u>ส่วนที่</u>
                                <strong>
                                    <u>1</u>
                                    20%
                                </strong>
                                ของ
                                <strong>(</strong>Bx20%<strong>)</strong>
                                <u></u>
                            </p>
                            <p>
                                <u>หัก</u>
                                เงินปันผลกองทุน&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </p>
                            <p>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;กองทุน
                                7.5% (B x
                                7.5%)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;xxx&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </p>
                            <p>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;All
                                sale 7.5% (B x
                                7.5%)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;xxx
                            </p>
                            <p>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;โบนัสพนักงาน
                                5%(B x
                                5%)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <u>xxx</u>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(xxx)
                            </p>
                            <p>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <u>xxxx</u>
                            </p>
                            <p>
                                <u>ส่วนที่</u>
                                <strong><u>2</u>80%</strong>
                                ของ B x 80% =
                                <strong>100%</strong>
                                เพื่อคำนวณส่วนแบ่ง&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </p>
                            <p>
                                เงินคืนผู้ซื้อ 55%(B x 55
                                %)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;xxx
                            </p>
                            <p>
                                <u>หัก</u>
                                ภาษี ณ ที่จ่าย 3%
                                (2)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <u>xxx</u>
                            </p>
                            <p>
                                ยอดเงินสุทธิหลังหักภาษีของผู้ซื้อ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(xxx)
                            </p>
                            <p>
                                ผู้แนะนำคนที่ 1 20% (B x 20
                                %)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;xxx
                            </p>
                            <p>
                                <u>หัก</u>
                                ภาษี ณ ที่จ่าย 3%
                                (2)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <u>xxx</u>
                            </p>
                            <p>
                                ยอดเงินสุทธิหลังหักภาษีของผู้แนะนำคนที่
                                1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(xxx)
                            </p>
                            <p>
                                ผู้แนะนำคนที่ 2 15% (B x 15
                                %)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;xxx
                            </p>
                            <p>
                                <u>หัก</u>
                                ภาษี ณ ที่จ่าย 3%
                                (2)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <u>xxx</u>
                            </p>
                            <p>
                                ยอดเงินสุทธิหลังหักภาษีของผู้แนะนำคนที่
                                2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(xxx)
                            </p>
                            <p>
                                ผู้แนะนำคนที่ 3 10% (B x 10
                                %)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;xxx
                            </p>
                            <p>
                                <u>หัก</u>
                                ภาษี ณ ที่จ่าย 3%
                                (2)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <u>xxx</u>
                            </p>
                            <p>
                                ยอดเงินสุทธิหลังหักภาษีของผู้แนะนำคนที่
                                3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(xxx)
                            </p>
                            <p>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;xxxx
                                (c)
                            </p>
                            <p>
                                <u>หัก</u>
                                เงินลงทุนของผู้ลงทุน (บริษัท) 20%
                                <strong>(3)</strong> (<strong>c x 20% </strong>)
                                <strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>
                                xxx
                            </p>
                            <p>
                                <u>หัก</u>
                                ค่าระบบ + บริการ 10%
                                <strong>(4)</strong> (<strong>c x 10%
                                </strong>)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <u>xxx</u>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(xxx)
                            </p>
                            <p>
                                <br>
                            </p>
                            <p>
                                <u style="color: red;">หัก</u>
                                <span style="color: lime;">ส่วนแบ่งผู้บริหารศูนย์ฯ 70%</span>
                                (<strong>c x 70%
                                </strong>)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;xxx
                            </p>
                            <p>
                                <u style="color: red;">หัก</u>
                                <span style="color: lime;">ภาษี ณ ที่จ่าย 3% </span>
                                <strong>(2)</strong>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;xxx&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <u>(xxx)</u>
                                &nbsp;&nbsp;&nbsp;
                            </p>
                            <p>
                                <span style="color: lime;">ยอดเงินส่วนแบ่งผู้บริหารศูนย์ฯ สุทธิหลังหักภาษี</span>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <u style="color: lime;">xxxx</u>
                            </p>
                            <p>
                                <u>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </u>
                            </p>
                            <p>
                                จำนวนเงินรวมที่ต้องนำส่งบริษัทฯ
                                <strong>(1)(2)(3)</strong>
                                <strong>(4)</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <u>xxxx</u>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <strong>หมายเหตุ</strong>
                            </p>
                            <p>1.&nbsp;&nbsp;ต้นทุนสินค้าที่ขาย และบริการ&nbsp;</p>
                            <p>2.&nbsp;&nbsp;ภาษีหัก ณ ที่จ่ายเพื่อนำส่งกรมสรรพากร&nbsp;</p>
                            <p>3.&nbsp;&nbsp;เงินลงทุนของผู้ลงทุน (บริษัทฯ)</p>
                            <p>4.&nbsp;&nbsp;ค่าใช้จ่ายในการส่งเสริมการตลาดตามแผนของบริษัทฯ</p>
                            <p>5.&nbsp;&nbsp;ยอดเงินสุทธิหลังหักภาษี ณ ที่จ่าย (Platform) จะเข้าบัญชีสมาชิกบน Platform
                                และสมาชิกสามารถทำรายการถอนเงินเพื่อเข้าบัญชีธนาคารที่ลงทะเบียนไว้ตามเงื่อนไขที่บริษัทฯ
                                กำหนด</p>
                            <p>
                                <br>
                            </p>
                        </div>
                        <p>
                            <strong>6.&nbsp;&nbsp;รูปแบบของพื้นที่</strong>
                        </p>
                        <div class="ml-4">
                            <p>
                                ผู้บริหารศูนย์ฯ จำต้องส่งข้อมูลที่เท็จจริงให้กับทางบริษัทฯ เพื่อให้บริษัทฯ พิจารณา
                                และเปิดศูนย์บริการโดยจะต้องติดสัญญาเป็นสาขากับทางบริษัท 3 ปี ต่อสัญญารายครั้ง
                                จำต้องประกอบไปด้วย
                            </p>
                            <p>
                                6.1 กรณีเป็นเจ้าของพื้นที่เอง ต้องแนบเอกสารสำคัญของพื้นที่ ประกอบไปด้วย
                                สำเนาทะเบียนบ้านเจ้าของที่ตั้งศูนย์ และสำเนาบัตรประชาชนเจ้าของผู้บริหารศูนย์ฯ
                            </p>
                            <p>
                                6.2 กรณีไม่ใช่เจ้าของพื้นที่หรือเป็นผู้เช่า ต้องแนบประกอบไปด้วย
                                สำเนาทะเบียนบ้านเจ้าของสถานที่ สำเนาบัตรประชาชนของเจ้าของสถานที่
                                (ตามกรรมสิทธิ์ทะเบียนบ้าน) พร้อมหนังสือ
                                ยินยอมใช้สถานที่ของเจ้าของกรรมสิทธิ์ในพื้นที่นั้น พร้อมทั้ง เอกสารการจ่ายเงินล่วงหน้า 3
                                ปี
                            </p>
                        </div>
                        <p>
                            <br>
                        </p>
                        <p>
                            <strong>7.&nbsp;&nbsp;สินค้า</strong>
                        </p>
                        <div class="ml-4">
                            <p>
                                7.1 ในการดำเนินกิจการของผู้เปิดศูนย์ฯ
                                จะต้องใช้สินค้าและบริการที่สั่งผ่านแพลตฟอร์มของทางบริษัทฯ เท่านั้น หากทางบริษัทฯ
                                ตรวจพบว่าผู้เปิดศูนย์ฯ
                                มีการลักลอบนำสินค้าและบริการมาให้บริการกับลูกค้าโดยไม่ผ่านแพลตฟอร์มของทางบริษัทฯ
                                ผู้เปิดศูนย์ฯ ยินยอมให้บริษัทฯ ดำเนินคดีตามกฎหมาย เว้นแต่ได้รับความยินยอมจากบริษัทฯ
                            </p>
                            <p>
                                7.2 ผู้เปิดศูนย์ฯ ตกลงที่จะขายสินค้าและบริการในราคาที่บริษัทฯ กำหนด
                                ในกรณีที่มีการเปลี่ยนแปลงราคาของสินค้าหรือบริการ บริษัทฯ
                                จะแจ้งเรื่องการเปลี่ยนแปลงราคาให้ทางผู้บริหารศูนย์ฯ ทราบ และห้ามมิให้ผู้เปิดศูนย์ฯ
                                เปลี่ยนแปลงราคาสินค้าที่ขายก่อนได้รับความยินยอมจากบริษัทฯ
                            </p>
                        </div>
                        <p>
                            <br>
                        </p>
                        <p>
                            <strong>8.&nbsp;&nbsp;ค่าตอบแทน</strong>
                        </p>
                        <div class="ml-4">
                            <p>
                                8.1 ผู้บริหารศูนย์ฯ จะได้รับค่าตอบแทนในรูปแบบค่าคอมมิชชั่น
                                คำนวณจากยอดขายประจำวันหักราคาต้นทุนสินค้า กำไรสุทธิหลัง ภาษี หัก ณ ที่จ่าย 70 %
                                ในยอดขายประจำวัน
                            </p>
                            <p>
                                ผู้บริหารศูนย์ฯ จำต้องโอนยอดเงินต้นทุนสินค้า พร้อมภาษี ณ&nbsp;ที่จ่าย 3 % กำไรสุทธิหลัง
                                ภาษี หัก ณ ที่จ่ายให้กับทางบริษัทฯ โดยระบบจะทำการปิดยอดขายในแต่ละวัน เวลา 23.59 น.
                                ของทุกวัน&nbsp;ผู้บริหารศูนย์ฯ
                                มีระยะเวลาในการโอนยอดเงินที่ต้องนำส่งตามที่ระบบรายงานตามแจ้ง ไม่เกิน 12.00 (เที่ยงวัน)
                                ในวันถัดไป
                            </p>
                            <p>
                                หากเกิดกรณีผู้บริหารศูนย์ฯ ดำเนินการโอนยอดเงินล่าช้า
                                ระบบจะทำการคิดค่าปรับบวกกับค่าติดตามวันละ จำนวน 300 บาท (สามร้อยบาทถ้วน)
                            </p>
                            <p>
                                อนึ่ง ผู้บริหารศูนย์ฯ ทำการโอนยอดเงินล่าช้า เกิน 48 ชั่วโมงหรือ 2 รอบบิล จากที่บริษัทฯ
                                กำหนด บริษัทฯ จะทำการระงับระบบ ส่งผลให้ผู้บริหารศูนย์ฯ
                                จะไม่สามารถทำรายการซื้อขายสินค้าหรือบริการทุกประเภทได้
                            </p>
                            <p>
                                หรือล่วงเลยเวลาเกิน 7 วัน นับตั้งแต่ระบบปิด บริษัทฯ จะถือว่าผู้บริหารศูนย์ฯ
                                ได้ทุจริตโดยเจตนา
                            </p>
                            <p>
                                บริษัทฯ มีสิทธิ์ที่จะบอกเลิกสัญญาพร้อมเรียกค่าเสียหายกับผู้บริหารศูนย์ฯ ได้
                                โดยจะทำการแจ้งเป็นลายลักษณ์อักษร ผู้บริหารศูนย์ฯ ต้องปฏิบัติตามไม่เกิน 7
                                วันหลังจากได้รับจดหมาย มิฉะนั้นทางบริษัทฯ มีสิทธิ์จะดำเนินคดีตามกฎหมาย&nbsp;&nbsp;
                            </p>
                            <p>
                                8.2 ค่าตอบแทนการเปิดศูนย์และสมาชิกภายใต้แบรนด์ ยินยอมให้บริษัทฯ
                                มีสิทธิ์ในการเปลี่ยนแปลงหรือยกเลิกแผนการตลาดและอัตราการจ่ายค่าตอบแทน
                                โดยไม่ต้องบอกกล่าวล่วงหน้า
                            </p>
                        </div>
                        <p>
                            <br>
                        </p>
                        <p>
                            <strong>9.&nbsp;&nbsp;ค่าธรรมเนียม</strong>
                        </p>
                        <div class="ml-4">
                            <p>
                                9.1 ศูนย์บริการลูกค้าครบวงจรด้านธุรกิจ และสินค้า ณ วันทำสัญญาฉบับนี้
                                ไม่มีการเรียกเก็บค่าธรรมเนียมตลอดระยะเวลา 3 ปีในการเปิดศูนย์ บริษัทฯ
                                ขอสงวนสิทธิ์ในการเปลี่ยนแปลงข้อสัญญาที่สามารถเรียกเก็บค่าธรรมเนียม/ ค่าสัญญารายปีอื่น ๆ
                                โดยจะแจ้งให้ผู้ใช้ทราบล่วงหน้า
                            </p>
                            <p>
                                9.2 ค่าตอบแทนการเปิดศูนย์และสมาชิกภายใต้แบรนด์ ยินยอมให้บริษัทฯ
                                มีสิทธิ์ในการเปลี่ยนแปลงหรือยกเลิกแผนการตลาด และอัตราการจ่ายค่าตอบแทน
                                โดยไม่ต้องบอกกล่าวล่วงหน้า แต่จะแจ้งเป็นหนังสือหรือผ่านทางระบบบริหารจัดการศูนย์ฯ
                                ในหัวข้อประกาศหรือแจ้งให้ทราบ ถือเป็นการแจ้งให้ทราบตามหัวข้อนี้
                            </p>
                        </div>
                        <p>
                            <br>
                        </p>
                        <p>
                            <strong>10.&nbsp;&nbsp;ภาษีอากรและค่าธรรมเนียมราชการใดๆ</strong>
                            <strong>(ค่าภาษีบำรุงท้องที่ ภาษีป้าย ภาษีสรรพสามิต)</strong>
                        </p>
                        <div class="ml-4">
                            <p>
                                10.1 การจ่ายค่าตอบแทนในรูปแบบค่าคอมมิชชั่นมีการหักภาษี ณ ที่จ่ายในอัตรา 3%
                                และนำส่งกรมสรรพากร ตามระยะเวลาที่กฎหมายกำหนด โดยบริษัทฯ จะออกหนังสือรับรองการหักภาษี ณ
                                ที่จ่ายโดยวิธีที่กรมสรรพากรกำหนดเพื่อนำไปเป็นหลักฐานในการยื่นภาษีเงินได้บุคคลธรรมดา
                                นิติบุคคลหรือประเภทอื่นฯ ที่ตั้งตามกฎหมายนั้น
                            </p>
                            <p>
                                ต่อไปในส่วนภาษีซื้อ และภาษีขาย จากการขายสินค้า และบริการทุกประเภท ทางบริษัทฯ
                                จะเป็นผู้รับผิดชอบและเป็นผู้จัดทำรายงานในแต่ละสาขาและนำส่งกรมสรรพากรตามแบบและกฎหมายกำหนด
                            </p>
                            <p>
                                10.2 ภาษีอากร ภาษีป้าย ภาษีโรงเรือน และค่าธรรมเนียมราชการใด ๆ ผู้เปิดศูนย์ฯ
                                เป็นผู้รับผิดชอบค่าใช้จ่ายแต่เพียงผู้เดียว
                            </p>
                            <p>
                                10.3 ค่าสาธารณูปโภค ค่าน้ำประปา ค่าบริการอินเตอร์เน็ต ค่าบริการเก็บขยะเทศบาล
                                ผู้เปิดศูนย์ฯ เป็นผู้รับผิดชอบค่าใช้จ่ายแต่เพียงผู้เดียว
                            </p>
                        </div>
                        <p>
                            <br>
                        </p>
                        <p>
                            <strong>11.&nbsp;&nbsp;การต่อเติมร้าน เปลี่ยนแปลง</strong>
                            <strong>ปรับปรุง ตกแต่งสถานประกอบกิจการ</strong>
                        </p>
                        <div class="ml-4">
                            <p>
                                11.1 ผู้เปิดศูนย์บริการ
                                จะต้องจัดเตรียมสถานที่ให้พร้อมต่อการดำเนินการเปิดร้านตามที่บริษัทฯ กำหนดเบื้องต้น
                                ที่ทางบริษัทฯ ได้แจ้งก่อนทำสัญญาฉบับนี้
                            </p>
                            <p>
                                11.2 ในการต่อเติมร้าน เปลี่ยนแปลง ตกแต่งสถานประกอบกิจการร้านค้าในระหว่างสัญญา
                                ทางผู้เปิดศูนย์ฯ ต้องส่งแบบที่ต้องการเปลี่ยน แจ้งให้ทางบริษัทฯ
                                ทราบเพื่อทำหนังสือยินยอมตามความเหมาะสม
                            </p>
                            <p>
                                11.3 ในแต่ละช่วงเวลา บริษัทฯ อาจทำข้อตกลงให้ผู้เปิดศูนย์ฯ ทำการปรับปรุงร้านค้า
                                เครื่องมือเฟอร์นิเจอร์ ป้ายสัญลักษณ์เพื่อเป็นไปตามเอกลักษณ์ของบริษัทฯ
                                ซึ่งค่าใช้จ่ายในการปรับปรุงจะเป็นไปตามลักษณะของประเภทศูนย์ โดยบริษัทฯ จะเป็นผู้รับผิดชอบ
                            </p>
                        </div>
                        <p>
                            <br>
                        </p>
                        <p>
                            <strong>12.&nbsp;&nbsp;การทำประกันภัย</strong>
                        </p>
                        <div class="ml-4">
                            <p>
                                12.1
                                เพื่อเป็นการจัดการความเสี่ยงภัยในธุรกิจของผู้ลงทุนที่อยู่ภายใต้การควบคุมดูแลของบริษัทฯ
                                ผู้เปิดศูนย์ฯ ตกลงจะจัดทำประกัน
                                โดยค่าใช้จ่ายผู้ลงทุนเป็นผู้รับผิดชอบอันเกิดจากการจัดทำประกันภัยสำหรับร้านค้าในทรัพย์สินอันรวมถึงแต่ไม่จำกัดเพียง
                                ค่าเบี้ยประกันภัย ค่าตัวแทน ค่าธรรมเนียม และค่าอากรต่าง ๆ
                                โดยกรมธรรม์ประกันภัยที่จัดทำนั้นต้องมีวงเงินเอาประกันภัยไม่น้อยกว่า
                                ราคาตามประเภทของการเปิดศูนย์บริการลูกค้า โดยมีผู้ลงทุนเป็นผู้รับผลประโยชน์จากกรมธรรม์
                                ในกรณีที่ผู้เปิดศูนย์ฯ จัดทำประกันต่ำกว่ามาตรฐานที่กำหนด ผู้เปิดศูนย์ฯ
                                ยินยอมชดใช้ค่าส่วนต่างในส่วนที่เหลือให้แก่บริษัทฯ และผู้ลงทุน
                            </p>
                            <p>
                                12.2 เมื่อผู้ลงทุนได้มีการจัดทำประกันภัยเป็นที่เรียบร้อยแล้ว
                                ผู้ลงทุนจะต้องส่งสำเนากรมธรรม์ประกันภัยดังกล่าวให้แก่บริษัทฯ เพื่อใช้ในการจัดเก็บ
                                และอ้างอิง
                            </p>
                        </div>
                        <p>
                            <br>
                        </p>
                        <p>
                            <strong>13.&nbsp;&nbsp;การปฏิเสธความรับผิด</strong>
                        </p>
                        <div class="ml-4">
                            <p>
                                13.1 ทางบริษัทฯ ไม่มีความเกี่ยวข้องใด ๆ สำหรับช่องทางการจำหน่ายของผู้เปิดศูนย์ฯ
                                รวมถึงการนำเสนอหรือการให้ข้อมูลต่อสาธารณชนเพื่อจำหน่ายหรือประชาสัมพันธ์
                                อันเป็นการละเมิดต่อข้อบังคับของบริษัทฯ
                            </p>
                            <p>
                                13.2 บริษัทฯ เป็นเพียงตัวแทนการชำระเงิน และบริษัทฯ
                                ไม่ทราบถึงข้อตกลงที่ทำขึ้นหรือสิทธิข้อผูกพันใด ๆ ระหว่างผู้บริโภคและผู้เรียกเก็บเงิน
                                บริษัทฯไม่ต้องรับผิดชอบสำหรับความเสียหายที่เกิดขึ้นจากการละเมิดข้อตกลงระหว่างผู้บริโภคกับผู้เรียกเก็บเงิน
                                ผู้เปิดศูนย์ฯ รับทราบและตกลงว่าเป็นความรับผิดชอบของผู้เปิดศูนย์ฯ แต่เพียงผู้เดียว
                                ในการทำให้แน่ใจว่าคำสั่งการชำระของผู้บริโภคถูกต้อง ก่อนที่จะมีคำสั่งให้ทางบริษัทฯ
                                ทำการจ่ายเงิน บริษัทฯ
                                จะไม่รับผิดชอบในความรับผิดหรือค่าใช้จ่ายจากการชำระเกินกำหนดที่เกิดขึ้น
                            </p>
                        </div>
                        <p>
                            <br>
                        </p>
                        <p>
                            <strong>14.&nbsp;&nbsp;ข้อจำกัดความรับผิดของบริษัท</strong>
                        </p>
                        <div class="ml-4">
                            <p>
                                14.1 บริษัทฯ จะจัดส่งสินค้าให้ถึงมือท่านโดยเร็วที่สุด
                                โดยใช้บริการของคู่ค้าพาร์ทเนอร์ของบริษัทฯ ในการจัดส่งสินค้า บริษัทฯ จะทำการทำการติดตาม
                                และแจ้งท่านเมื่อสินค้าได้รับการความรับผิดชอบ และความเสียหายระหว่างการจัดส่ง
                                สามารถเรียกร้องได้กับคู่ค้าพาร์ทเนอร์หรือผู้ให้บริการจัดส่งที่บริษัทฯ ได้ใช้บริการ
                            </p>
                            <p>
                                14.2 บริษัทฯ ไม่ต้องรับผิดต่อผู้เปิดศูนย์บริการลูกค้า
                                ไม่ว่าในลักษณะใดไม่อาจถือได้ว่าบริษัทฯ เป็นผู้ละเมิดเงื่อนไขเหล่านี้
                                อันเนื่องมาจากความล่าช้าในการปฏิบัติตามสัญญาหรือการไม่สามารถปฏิบัติหน้าที่ตามข้อผูกพันของตนภายใต้เงื่อนไขเหล่านี้
                                หากความล่าช้าหรือไม่สามารถปฏิบัติหน้าที่ได้นั้นเป็นผลมาจากเหตุใด ๆ ที่อยู่เหนือการควบคุม
                                ที่สมเหตุสมผลของบริษัทฯ เมื่อเกิดเหตุสุดวิสัยขึ้นบริษัทฯ
                                อาจเลือกที่จะชะลอการปฏิบัติตามสัญญาฉบับนี้ และภายในระยะเวลา 3
                                ปีนับตั้งแต่วันที่สัญญาฉบับนี้สิ้นสุดลง หากผู้เปิดศูนย์ฯ
                                ประพฤติผิดเงื่อนไขสัญญานี้บริษัทฯ มีสิทธิ์เรียกร้องให้ผู้เปิดศูนย์ฯ
                                รับผิดชอบความเสียหายที่เกิดขึ้นได้
                            </p>
                            <p>
                                14.3 ผู้เปิดศูนย์ฯ รับทราบ และตกลงว่าบริษัทฯ ไม่ต้องมีความรับผิดหากบริษัทฯ
                                ไม่สามารถทำให้คำสั่งการชำระเงินเสร็จสิ้นได้ด้วยเหตุนอกเหนือการควบคุมของบริษัทฯ
                            </p>
                            <p>
                                14.3.1 หากบัญชีในแพลตฟอร์มของผู้เปิดศูนย์ฯ มีเงินไม่เพียงพอโดยไม่ใช่ความผิดของบริษัทฯ
                            </p>
                            <p>
                                14.3.2 ศูนย์กลางการประมวลผลการชำระเงินของทางบริษัทฯ ทำงานไม่ปกติ และผู้เปิดศูนย์ฯ
                                รู้หรือได้รับแจ้งจากทางบริษัทฯ เกี่ยวกับการทำงานที่ผิดปกตินั้นก่อนที่ผู้เปิดศูนย์ฯ
                                ดำเนินการรับโอนดังกล่าว
                            </p>
                            <p>
                                14.3.3 ผู้เปิดศูนย์ฯ ไม่ได้ให้ข้อมูลที่ถูกต้องแก่ทางบริษัทฯ หรือข้อมูลที่ผู้เปิดศูนย์ฯ
                                ให้ไว้ไม่ถูกต้องหรือผู้เปิดศูนย์ฯ ปกปิดข้อมูลแก่บริษัทฯ
                            </p>
                            <p>
                                14.4 พฤติการณ์นอกเหนือการควบคุมของบริษัทฯ
                                เหตุสุดวิสัยหรือไม่ว่าจะสามารถคาดเห็นได้หรือคาดเห็นแล้วก็ตามอันมีลักษณะเป็นการขัดขวางการดำเนินการโอน
                                และบริษัทฯ ได้เตรียมการป้องกันไว้ตามสมควรเพื่อหลีกเลี่ยงพฤติการณ์ดังกล่าวแล้ว
                            </p>
                            <p>
                                14.5 หากความผิดพลาด ล่าช้า ไม่ว่าจะเกิดขึ้นจากระบบคอมพิวเตอร์ ระบบอินเตอร์เน็ต
                                อุปกรณ์อิเล็กทรอนิกส์ต่าง ๆ ระบบแพลตฟอร์มของทางบริษัทฯ
                                ระบบขนส่งหรือระบบอื่นใดที่เกี่ยวข้องกับการให้บริการ ไม่ว่าจะเกิดเหตุใด ๆ ผู้เปิดศูนย์ฯ
                                ตกลงจะไม่ยกเอาเหตุขัดข้องดังกล่าวมาเป็นข้อเรียกร้องค่าเสียหายใด ๆ จากบริษัทฯ
                            </p>
                        </div>
                        <p>
                            <br>
                        </p>
                        <p>
                            <strong>15.&nbsp;&nbsp;การโฆษณา และส่งเสริมการขาย</strong>
                        </p>
                        <div class="ml-4">
                            <p>
                                15.1 ผู้เปิดศูนย์ฯ จะต้องเป็นผู้รับผิดชอบดำเนินการโฆษณา และส่งเสริมการขายให้แก่บริษัทฯ
                                เพื่อให้การประกอบธุรกิจเป็นไปตามมาตรฐาน และคุณภาพของบริษัทฯ
                                ตามวัตถุประสงค์ของสัญญาฉบับนี้ และเพื่อป้องกันความเสียหายที่อาจเกิดขึ้นกับธุรกิจ
                                ผู้เปิดศูนย์ฯ ตกลงจะถ่ายทอดองค์ความรู้ ให้การสนับสนุน
                                และให้ความช่วยเหลือในการดำเนินธุรกิจของบริษัทฯ รวมถึงตัวแทนบริษัทฯ ตามสัญญาฉบับนี้ด้วย
                            </p>
                            <p>
                                15.2 การบริหาร การจัดการตลาด
                                แผนการตลาดผ่านสื่อสังคมออนไลน์เพื่อประชาสัมพันธ์บริการลูกค้า บริษัทฯ
                                จะเป็นผู้จัดทำแผนการตลาดทั้งหมด ไม่ว่าจะเป็นการส่งเสริมการตลาด การโฆษณา
                                สื่อสิ่งพิมพ์เนื้อหาการโฆษณา และการส่งเสริมการขาย ผู้เปิดศูนย์ฯ
                                มีหน้าที่เพียงช่วยส่งเสริมการขายตามแผนการตลาดของบริษัทฯ เท่านั้น ทางบริษัทฯ
                                ไม่อนุญาตให้ผู้เปิดศูนย์ฯ ดัดแปลง เปลี่ยนแปลง
                                เพิ่มเติมหรือกระทำการใดอันนอกเหนือจากที่บริษัทฯ กำหนดไว้
                                เว้นแต่ได้รับการอนุญาตจากบริษัทฯ เป็นหนังสือหรืออื่นใดที่ยืนยันว่าได้รับอนุญาตจากบริษัทฯ
                            </p>
                        </div>
                        <p>
                            <br>
                        </p>
                        <p>
                            <strong>16.&nbsp;&nbsp;การควบคุมคุณภาพ และมาตรฐานของธุรกิจ</strong>
                        </p>
                        <div class="ml-4">
                            <p>
                                16.1 เจ้าของสินค้าต้องปกป้อง คุ้มครอง คุ้มกันบริษัทฯ พนักงานของบริษัทฯ
                                และ/หรือผู้จำหน่ายสินค้าของบริษัทฯ อื่นๆ จากการถูกเรียกร้อง ฟ้องร้อง
                                และต้องรับผิดชอบและชดใช้ค่าเสียหายที่เกิดขึ้นกับผู้เสียหาย เช่น สินค้าสูญหาย เสียหาย
                                เป็นต้น รวมถึงข้อมูลใด ๆ ที่ได้รับจากเจ้าของสินค้าอันเป็นเท็จ และ/หรือโฆษณาเกินจริง
                                และ/หรือทรัพย์สินทางปัญญาหรือการกระทำอันฝ่าฝืนต่อพระราชบัญญัติคุ้มครองผู้บริโภค
                                ซึ่งเป็นเหตุให้ลูกค้า/บริษัทฯ/พนักงานบริษัทฯ หรือผู้จำหน่ายสินค้าของบริษัทฯ
                                ได้รับความเสียหาย ตลอดจนถึงการดำเนินการใด ๆ เพื่อให้กรณีดังกล่าวยุติโดยเร็วที่สุด
                                และบริษัทฯ อาจถือเงื่อนไขดังกล่าวเป็นเหตุแห่งการแจ้งเตือนหรือบอกเลิกสัญญาบับนี้ได้
                            </p>
                            <p>16.2 กรณีผู้บริหารศูนย์ฯ</p>
                            <p>
                                16.2.1 สาขานั้นๆ ต้องติดตั้งกล้องวงจรปิดตามที่บริษัทฯ กำหนดเท่านั้น
                                เพื่อดูแลความปลอดภัยของทรัพย์สิน และลูกค้าอันควรจะมี ตลอดจนอนุญาตให้ทางบริษัทฯ
                                หรือตัวแทนของบริษัทฯ เข้าดูและบันทึกไฟล์ภาพพร้อมเสียงตลอดเวลา
                                และตลอดระยะเวลาของสัญญาฉบับนี้ใช้บังคับ ค่าใช้จ่ายที่เกิดขึ้นผู้เปิดศูนย์ฯ
                                เป็นผู้รับผิดชอบทั้งหมด
                            </p>
                            <p>
                                16.2.2 สาขานั้นๆ ต้องติดตั้งอินเตอร์เน็ตตามที่บริษัทฯ กำหนดเท่านั้น
                                เพื่อประสิทธิภาพในการบริหารจัดการ และแก้ไขปัญหา ในกรณีที่เกิดปัญหาด้านเทคนิค
                                โดยผู้บริหารศูนย์ฯ นั้น ๆ เป็นผู้รับผิดชอบค่าใช้จ่ายรายเดือน โดยทางสำนักงานใหญ่บริษัทฯ
                                จะเป็นผู้เรียกเก็บรายเดือนต่อไป
                            </p>
                            <p>
                                16.2.3 ผู้บริหารศูนย์ฯ สาขานั้นๆ เป็นผู้รับผิดชอบในบรรดาค่าตกแต่งเพิ่มเติม ค่าเช่า
                                ภาษีป้าย ภาษีโรงเรือน ที่ดิน และค่าธรรมเนียมราชการใด ๆ แต่เพียงผู้เดียว
                            </p>
                            <p>
                                16.2.4 ผู้บริหารศูนย์ฯ สาขานั้น ๆ ต้องดูแล ปรับปรุง และทำความสะอาดบริเวณร้าน และรอบ ๆ
                                ร้านให้สะอาดอยู่เสมอ และจัดเรียงสินค้าต่าง ๆ ตามระเบียบของบริษัทฯ
                            </p>
                            <p>
                                16.2.5 ผู้บริหารศูนย์ฯ สาขานั้น ๆ ต้องอนุญาตให้พนักงานเจ้าหน้าที่ของบริษัทฯ ตรวจสอบระบบ
                                สินค้า และอุปกรณ์ต่างๆ ในศูนย์ให้บริการได้ตลอดเวลาทำการ โดยไม่จำเป็นต้องบอกกล่าวล่วงหน้า
                            </p>
                        </div>
                        <p>
                            <br>
                        </p>
                        <p>
                            <strong>17.&nbsp;&nbsp;การตรวจสอบ และประเมินธุรกิจ</strong>
                        </p>
                        <div class="ml-4">
                            <p>
                                เพื่อการควบคุมมาตรฐานและคุณภาพของธุรกิจให้เป็นไปตามสัญญาฉบับนี้อย่างต่อเนื่อง
                                ผู้เปิดศูนย์ฯ รับทราบและตกลงให้บริษัทฯ หรือตัวแทนที่บริษัทฯ แต่งตั้ง
                                มีสิทธิ์ในการตรวจสอบกิจการได้ ดังต่อนี้ไปนี้
                            </p>
                            <div class="ml-4">
                                <p>
                                    17.1 บริษัทฯ หรือตัวแทนของบริษัทฯ
                                    สามารถตรวจดูร้านได้ตลอดเวลาที่ร้านเปิดทำการผ่านกล้องวงจรปิด
                                </p>
                                <p>
                                    17.2 บริษัทฯ หรือตัวแทนของบริษัทฯ
                                    สามารถลงพื้นที่ตรวจสอบร้านค้าที่อยู่ใต้ภายเครื่องหมายการค้าของบริษัทฯ
                                    ได้ตลอดเวลาทำการเปิดการ โดยไม่จำเป็นต้องแจ้งล่วงหน้าให้ผู้เปิดศูนย์ฯ ทราบ
                                </p>
                                <p>
                                    ผู้เปิดศูนย์ฯ ยินยอมให้บริษัทฯ ตรวจสอบจำนวนรายการขายสินค้าและจำนวนสต๊อกสินค้า
                                    ในกรณีที่จำนวนรายการขายสินค้ากับจำนวนสต๊อกของสินค้าไม่ตรงกัน บริษัทฯ
                                    จะทำการปรับยอดรายการขายสินค้ากับจำนวนสต็อกของสินค้าให้ตรงกับระบบแล้วทำการสรุปเป็นยอดขายสินค้าและจำนวนสต็อกของสินค้าวันนั้น
                                    และผู้บริหารศูนย์ฯ ต้องชดเชยค่าเสียหายให้แก่บริษัทฯ และ/หรือผู้ลงทุน
                                </p>
                                <p>
                                    17.3 อนึ่ง ผู้เปิดศูนย์ฯ
                                    ตกลงจะให้ความร่วมมือและสนับสนุนการดำเนินการตรวจสอบดังกล่าวตามที่บริษัทฯ
                                    ร้องขอทั้งสิ้น ทั้งนี้ข้อมูลหรือเอกสารใด ๆ ที่ผู้เปิดศูนย์ฯ
                                    ได้เปิดเผยข้อมูลหรือเอกสารใด ๆ ตามที่บริษัทฯ ร้องขอ ผู้เปิดศูนย์ฯ
                                    ให้การรับรองว่าข้อมูลหรือเอกสารใดๆนั้นถูกต้องและแท้จริง หากบริษัทฯ
                                    ตรวจพบว่าผู้เปิดศูนย์ฯ ทุจริตหรือกระทำการอันใดที่เป็นการปกปิดข้อมูลแก่บริษัทฯ
                                    ผู้เปิดศูนย์ฯ ยินยอมให้บริษัทฯดำเนินคดีตามกฎหมาย
                                </p>
                                <p>
                                    17.4 บริษัทฯ หรือตัวแทนของบริษัทฯ สามารถตรวจสอบเอกสารสำคัญ
                                    ตรวจสอบการดำเนินกิจการภายในของผู้เปิดศูนย์ฯ
                                    ได้ตามที่จำเป็นต้องใช้ในการดำเนินการทางธุรกิจหรือต้องแนบเอกสารสำคัญอื่นใด
                                    ตามที่ส่วนราชการร้องขอ
                                </p>
                            </div>
                        </div>
                        <p>
                            <br>
                        </p>
                        <p>
                            <strong>18.&nbsp;&nbsp;การค้าแข่ง </strong>
                        </p>
                        <div class="ml-4">
                            <p>
                                18.1 ผู้เปิดศูนย์ฯ ตกลงว่า
                                จะไม่ประกอบกิจการหรือให้บริการใดในลักษณะคล้ายคลึงกับธุรกิจของบริษัทฯ ตามสัญญาฉบับนี้
                                อันเป็นลักษณะของการแข่งขันทางการค้ากับบริษัทฯ โดยตรง
                            </p>
                            <p>
                                18.2 ผู้เปิดศูนย์ฯ ตกลงว่า
                                จะไม่เป็นผู้เกี่ยวข้องกับธุรกิจหรือกิจการที่มีลักษณะดังกล่าวตาม 16.1
                                อันรวมถึงแต่ไม่จำกัดเพียง ผู้ถือหุ้น หุ้นส่วน กรรมการ หุ้นส่วนผู้จัดการหรือตัวแทนใด ๆ
                            </p>
                            <p>
                                18.3 ผู้เปิดศูนย์ฯ ตกลงว่า จะไม่ทำการใด ๆ ให้บริษัทฯ
                                เสียประโยชน์จากการประกอบธุรกิจหรือในกิจการลักษณะเช่นว่า ไม่ว่าโดยตรงหรือโดยอ้อม
                            </p>
                        </div>
                        <p>
                            <br>
                        </p>
                        <p>
                            <strong>19.&nbsp;&nbsp;ความลับทางการค้า</strong>
                        </p>
                        <div class="ml-4">
                            <p>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ในการเข้าทำสัญญาฉบับนี้
                                คู่สัญญาแต่ละฝ่ายอาจได้ล่วงรู้หรือได้รับข้อมูลของคู่สัญญาอีกฝ่ายหนึ่ง
                                ไม่ว่าจากคู่สัญญาอีกฝ่ายหนึ่งนั้นเองหรือจากบุคคลอื่นใด
                                คู่สัญญาแต่ละฝ่ายต่างตกลงจะเก็บรักษาข้อมูลของคู่สัญญาอีกฝ่ายไว้เป็นความลับ
                                ไม่ว่าจะเป็นข้อมูลส่วนบุคคลหรือข้อมูลทางการค้า และไม่ว่าจะมีมูลค่าหรือไม่ก็ตาม
                                และจะไม่เปิดเผย ตีพิมพ์ ประกาศ รับรอง หรือเผยแพร่ต่อบุคคลที่สาม ไม่ว่า ณ เวลาใด
                                และไม่ว่าสัญญาฉบับนี้จะสิ้นสุดลงแล้วหรือไม่ก็ตาม
                            </p>
                        </div>
                        <p>
                            <br>
                        </p>
                        <p>
                            <strong>20.&nbsp;&nbsp;การโอนกรรมสิทธิ์</strong>
                        </p>
                        <div class="ml-4">
                            <p>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;เว้นแต่จะได้กำหนดไว้เป็นอย่างอื่นในสัญญานี้
                                คู่สัญญาแต่ละฝ่ายจะไม่โอนสิทธิ หน้าที่
                                และความรับผิดชอบตามสัญญาฉบับนี้ให้แก่บุคคลใดโดยมิได้รับความยินยอมเป็นลายลักษณ์อักษรจากคู่สัญญาอีกฝ่ายเป็นการล่วงหน้า
                                ไม่ว่ากรณีใด ๆ ผู้เปิดศูนย์ฯ
                                ตกลงจะไม่โอนสิทธิและหน้าที่ตามสัญญาฉบับนี้ไม่ว่าทั้งหมดหรือบางส่วนให้แก่บุคคลที่สาม
                                เว้นแต่บริษัทฯ ยินยอมให้ถือดุลยพินิจของบริษัทฯ เป็นที่สุด
                            </p>
                        </div>
                        <p>
                            <br>
                        </p>
                        <p>
                            <strong>21.&nbsp;&nbsp;การโมฆะกรรมแยกส่วน</strong>
                        </p>
                        <div class="ml-4">
                            <p>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;หากมีข้อความหรือข้อตกลงใดในสัญญาฉบับนี้ตกเป็นโมฆะ
                                ไม่สมบูรณ์หรือไม่มีผลบังคับใช้ ไม่ว่าด้วยเหตุใด ๆ ก็ตาม
                                คู่สัญญาตกลงให้ข้อความและข้อตกลงอื่น ๆ ในสัญญาฉบับนี้ยังคงมีผลสมบูรณ์
                                ผูกพันธ์คู่สัญญาเสมือนหนึ่งว่าไม่มีส่วนที่เป็นโมฆะ
                                ไม่สมบูรณ์หรือส่วนที่ไม่มีผลบังคับใช้อยู่ในสัญญาฉบับนี้
                            </p>
                        </div>
                        <p>
                            <br>
                        </p>
                        <p>
                            <strong>22.&nbsp;&nbsp;การแก้ไข เปลี่ยนแปลง ปรับปรุงระบบ ในทุกรูปแบบ</strong>
                        </p>
                        <div class="ml-4">
                            <p>
                                22.1 บริษัทฯ มีสิทธิ์อนุมัติ เปลี่ยนแปลง แก้ไข ยกเลิก ระบบบริหารจัดการ/ โปรแกรมออนไลน์
                                ระบบบัญชีผู้บริหารงานจัดการออนไลน์ และระบบบริหารจัดการศูนย์ทุกรูปแบบ
                                โดยไม่จำเป็นต้องแจ้งให้ผู้เปิดศูนย์ฯ ทราบล่วงหน้า และการที่ผู้เปิดศูนย์ฯ
                                ได้ใช้งานระบบได้ทำการแก้ไขเรียบร้อยแล้วนั้น ถือเป็นการยอมรับการแก้ไขในครั้งนั้นแล้ว
                            </p>
                            <p>
                                22.2 บริษัทฯ ขอสงวนสิทธิ์ในการปรับปรุงหรือยกเลิกบริการหรือส่วนใดส่วนหนึ่งของบริการ
                                ไม่ว่าจะชั่วคราวหรือตลอดไปได้ตลอดเวลา โดยบริษัทฯ จะแจ้งล่วงหน้าให้ทราบหรือไม่ก็ได้
                                แต่ทั้งนี้การยกเลิกหรือการระงับบริการหรือส่วนใดส่วนหนึ่งของบริษัทฯ ย่อมไม่กระทบถึงหนี้ใด
                                ๆ ที่ผู้เปิดศูนย์ฯ ยังคงค้างชำระอยู่กับบริษัทฯ
                                รวมทั้งไม่เป็นการลบล้างสิทธิหรือความรับผิดใด ๆ ที่บริษัทฯ และผู้เปิดศูนย์ฯ
                                มีอยู่หรือได้เกิดขึ้นก่อนวันที่มีผลของการยกเลิกหรือการระงับบริการหรือส่วนหนึ่งส่วนใดของบริการดังกล่าว
                            </p>
                        </div>
                        <p>
                            <br>
                        </p>
                        <p>
                            <strong>23.&nbsp;&nbsp;การยกเลิกการเปิดศูนย์ฯ</strong>
                        </p>
                        <div class="ml-4">
                            <p>บริษัทฯ มีสิทธิยกเลิกสถานภาพการเปิดศูนย์ฯ มีเงื่อนไขดังต่อไปนี้</p>
                            <div class="ml-4">
                                <p>
                                    23.1 ผู้เปิดศูนย์ฯ กระทำผิดตามสัญญาการเปิดศูนย์ฯ
                                    ข้อใดข้อหนึ่งไม่ว่าทั้งหมดหรือเพียงบางส่วน
                                </p>
                                <p>
                                    23.2 ผู้เปิดศูนย์ฯ ไม่ประสงค์ดำเนินการหรือต้องการยกเลิกสถานภาพการเปิดศูนย์ฯ
                                    โดยสามารถยื่นคำร้องเป็นลายลักษณ์อักษร
                                    เพื่อให้บริษัทฯทำการอนุมัติยกเลิกสัญญาการเปิดศูนย์ฯ และหากว่าผู้เปิดศูนย์ฯ
                                    ต้องการขอคืนเงินในระบบแพลตฟอร์ม บริษัทฯ ขอสงวนสิทธิ์ไม่คืนเงินในระบบทุกกรณี
                                    แต่สามารถใช้บริการแพลตฟอร์มจนกว่าเงินจะหมดได้
                                </p>
                                <p>
                                    23.3 ผู้เปิดศูนย์ฯ จะต้องทำตามหลักเกณฑ์และวิธีการตามบริษัทฯ กำหนดเท่านั้น บริษัทฯ
                                    ขอสงวนสิทธิ์ในกรณีที่ศูนย์บริการลูกค้าของผู้เปิดศูนย์ฯ
                                    ผิดเงื่อนไขบางประการกับทางบริษัทฯ ผู้เปิดศูนย์ฯ
                                    ไม่สามารถดำเนินการยกเลิกบัญชีด้วยตนเองได้
                                </p>
                                <p>
                                    23.4 ผู้เปิดศูนย์ฯ
                                    เกิดปัญหาพิพาทและถูกหน่วยงานรัฐมีคำสั่งให้ยึดหรืออายัดทรัพย์สินหรือบุคคลที่ถูกกำหนดหรือถูกกล่าวหา
                                    หรือถูกสงสัยว่าเป็นผู้กระทำความผิดหรือกระทำการใด ๆ
                                    ที่อาจก่อให้เกิดความเสียหายกับบริษัทฯ หรือบุคคลอื่นแล้วแต่กรณี
                                </p>
                            </div>
                        </div>
                        <p>
                            <br>
                        </p>
                        <p>
                            <strong>24.&nbsp;&nbsp;ผลของการสิ้นสุดของสัญญา</strong>
                        </p>
                        <div class="ml-4">
                            <p>เมื่อสัญญาฉบับนี้สิ้นสุดลง คู่สัญญามีหน้าที่ต้องปฏิบัติดังนี้</p>
                            <div class="ml-4">
                                <p>
                                    24.1 เลิกประกอบธุรกิจของบริษัทฯ ทันที
                                    และไม่ดำเนินการอื่นใดอันเป็นการแสดงว่าเกี่ยวข้องหรือเป็นตัวแทนของทางบริษัทฯ
                                </p>
                                <p>
                                    24.2 เลิกใช้เครื่องหมายทางการค้า การออกแบบ การตกแต่ง ความลับทางการค้า
                                    สิทธิหรือทรัพย์สินใด ๆ อันเป็นสิทธิของบริษัทฯ
                                    ไม่ว่าจะใช้ในการประกอบธุรกิจหรือใช้ในวัตถุประสงค์ใดก็ตาม
                                    และถอนการติดตั้งทั้งหมดที่เกี่ยวกับทางบริษัทฯ ไม่ว่าจะเป็นป้าย ไวนิล โปสเตอร์
                                    โบรชัวร์หรือสิ่งอื่นใดที่บ่งบอกเกี่ยวกับทางบริษัทฯ
                                    โดยจะต้องดำเนินการถอนการติดตั้งให้แล้วเสร็จภายใน 7 วัน นับแต่วันที่เลิกสัญญาบับนี้
                                </p>
                                <p>
                                    24.3 กรณีสัญญาฉบับนี้สิ้นผล โดยผู้บริหารศูนย์ฯ ทุจริตหรือยกเลิกสัญญาก่อนครบระยะเวลา
                                    3 ปี จะต้องส่งมอบสินค้าตามยอดคงเหลือในระบบ และชำระค่าเสียหายเป็นจำนวนเงิน 200,000
                                    บาท (สองแสนบาทถ้วน) และหากความเสียหายมากกว่าจำนวนเงินประกัน บริษัทฯ
                                    สามารถฟ้องร้องเรียกค่าเสียหายได้จนกว่าจะครบตามจำนวน
                                </p>
                                <p>
                                    24.4 ในกรณีที่ผู้เปิดศูนย์ฯ
                                    ยังคงติดค้างชำระค่าตอบแทนการให้ใช้สิทธิการประกอบธุรกิจหรือเงินอื่นใดที่ผู้เปิดศูนย์ฯ
                                    มีหน้าที่ต้องชำระให้แก่บริษัทฯ ตามสัญญาฉบับนี้ ไม่ว่าทั้งหมดหรือบางส่วน
                                    ผู้เปิดศูนย์ฯ จะต้องชำระค่าตอบแทนนั้นให้ครบถ้วนทันที
                                </p>
                                <p>
                                    24.5 การสิ้นสุดระยะเวลาของสัญญาหรือการบอกเลิกสัญญาฉบับนี้ไม่ว่าด้วยเหตุใด
                                    มิให้กระทบต่อความสมบูรณ์ของข้อกำหนดในสัญญาฉบับนี้ระบุไว้ว่าให้มีผลบังคับใช้
                                    เมื่อสัญญาสิ้นสุดลงมิให้เสื่อมสิทธิหรือสิทธิเรียกร้องความเสียหายอื่นใดที่คู่สัญญามีอยู่
                                </p>
                            </div>
                        </div>
                        <p>
                            <br>
                        </p>
                        <p>
                            <strong>25.&nbsp;&nbsp;การแก้ไขเพิ่มเติม</strong>
                        </p>
                        <div class="ml-4">
                            <p>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;บริษัทฯ ขอสงวนสิทธิ์ในการแก้ไขเพิ่มเติมข้อกำหนด
                                และเงื่อนไขเหล่านี้ ณ เวลาใดก็ได้
                                ข้อแก้ไขเพิ่มเติมต่อเงื่อนไขเหล่านี้จะประกาศไว้ในแพลตฟอร์มของบริษัทฯ
                                อย่างไรก็ตามการใช้บริการกับบริษัทฯ ต่อไปจะถือว่าเป็นการยอมรับเงื่อนไขใหม่
                                เมื่อผู้เปิดศูนย์ฯ ใช้บริการกับแพลตฟอร์มการให้บริการของบริษัทฯ บริษัทฯ
                                ตกลงว่าผู้เปิดศูนย์ฯ กระทำการดังกล่าวภายใต้เงื่อนไขเหล่านี้ที่เป็นปัจจุบันขณะนั้น ณ
                                วันที่ผู้เปิดศูนย์ฯ ใช้บริการ และผู้เปิดศูนย์ฯ
                                มีหน้าที่ที่จะต้องทบทวนเงื่อนไขล่าสุดทุกครั้งที่ใช้บริการในระบบของบริษัทฯ
                            </p>
                        </div>
                        <p>
                            <br>
                        </p>
                        <p>
                            <strong>26.&nbsp;&nbsp;กฎหมายข้อบังคับใช้</strong>
                        </p>
                        <div class="ml-4">
                            <p>
                                ทั้งนี้ ในกรณีที่ไม่สามารถหาข้อยุติในข้อพิพาทดังกล่าวระหว่างคู่สัญญาทั้งสองฝ่ายได้
                                ข้อพิพาท ข้อโต้เถียง ข้อขัดแย้งใด ๆ อันเนื่องมาจากสัญญาฉบับนี้
                                หากคู่สัญญาไม่สามารถตกลงกันได้ คู่สัญญาตกลงจะนำข้อพิพาทดังกล่าวขึ้นฟ้องต่อศาลในประเทศไทย
                            </p>
                            <p>
                                <br>
                            </p>
                            <p>
                                สัญญาฉบับนี้ทำขึ้นสองฉบับมีข้อความถูกต้องตรงกัน
                                คู่สัญญาแต่ละฝ่ายได้อ่านโดยตลอดแล้วยืนยันว่าถูกต้องตามเจตนา
                                จึงได้ลงลายมือชื่อไว้เป็นสำคัญ
                            </p>
                            <p>
                                <br>
                            </p>
                            <p>
                                หมายเหตุ : พระราชบัญญัติ ว่าด้วยธุรกรรมทางอิเล็กทรอนิกส์ พ.ศ. ๒๕๔๔ ที่แก้ไขเพิ่มเติม
                                (ฉบับที่ 3) พ.ศ.2562 ถือว่า การเข้าสู่ระบบโดยใช้ชื่อผู้ใช้ ( username ) และรหัสผ่าน (
                                password ) เข้าสู่ระบบ และมีการยอมรับเงื่อนไข และข้อตกลงในระบบ
                                ถือว่าสัญญาฉบับนี้สมบูรณ์แบบ
                            </p>
                        </div>
                    </div>
                    <!-- Contract Details -->
                    <div class="flex items-center justify-center w-full p-4 border-t">
                        <button @click="handleConfirm"
                            class="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 font-sarabun">
                            ยืนยัน
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Second Modal -->
        <div v-if="showSecondModal" @click.self="closeSecondModal"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div class="bg-white rounded-lg shadow-xl w-11/12 md:w-1/2">
                <div class="flex justify-between items-center p-4 border-b">
                    <h3 class="text-xl font-semibold text-yellow-600"></h3>
                    <button @click="closeSecondModal" type="button"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                    </button>
                </div>
                <div class="p-4 space-y-1 overflow-y-auto max-h-[calc(80vh-2rem)]">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 font-sarabun font-semibold">
                        <div class="col-span-full">
                            <label class="block text-sm font-medium text-gray-700 mb-2">ชื่อผู้ลงทุน</label>
                            <input type="text" placeholder="กรุณากรอกชื่อผู้ลงทุน" disabled=""
                                class="mt-1 p-2 w-full text-sm  border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
                                fdprocessedid="kh7xqn">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">เบอร์โทรศัพท์</label>
                            <input type="text" placeholder="กรุณากรอกเบอร์โทรศัพท์" disabled=""
                                class="mt-1 p-2 w-full text-sm  border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
                                fdprocessedid="5oofyq">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">เลขบัตรประจำตัวประชาชน</label>
                            <input type="text" placeholder="กรุณากรอกเลขบัตรประจำตัวประชาชน" disabled=""
                                class="mt-1 p-2 w-full text-sm  border rounded-md focus:outline-none focus:border-[#DC97FF] focus:ring-1 focus:ring-[#DC97FF]"
                                fdprocessedid="4b612p">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">ขนาดร้านค้า</label>
                            <!-- <label for="shop-size" class="block text-gray-700 text-sm font-bold mb-2">ขนาดร้านค้า</label> -->
                            <div class="relative">
                                <select id="shop-size" v-model="selectedOption"
                                    class="block appearance-none w-full text-sm  bg-white border border-yellow-400 hover:border-yellow-600 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600">
                                    <option value="" disabled>กรุณาเลือก</option>
                                    <option v-for="(option, index) in options" :key="index" :value="option">
                                        {{ option }}
                                    </option>
                                </select>
                                <div
                                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-yellow-500">
                                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20">
                                        <path
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div></div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">ละติจูด</label>
                            <input type="text" placeholder="กรุณากรอกละติจูด"
                                class="w-full px-2 py-2 mt-1 border text-sm rounded-md shadow-sm focus:ring-1 focus:border-blue-300 focus:ring-blue-300 focus:outline-none"
                                fdprocessedid="3h6xqh">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">ลองจิจูด</label>
                            <input type="text" placeholder="กรุณากรอกลองจิจูด"
                                class="w-full px-2 py-2 mt-1 text-sm border rounded-md shadow-sm focus:ring-1 focus:border-blue-300 focus:ring-blue-300 focus:outline-none"
                                fdprocessedid="v3egmp">
                        </div>
                        <div class="col-span-full">
                            <label class="block text-sm font-medium text-gray-700 mb-2">ที่อยู่</label>
                            <input type="text" placeholder="กรุณากรอกที่อยู่"
                                class="w-full px-2 py-2 text-sm mt-1 border rounded-md shadow-sm focus:ring-1 focus:border-blue-300 focus:ring-blue-300 focus:outline-none"
                                fdprocessedid="bk6yju">
                        </div>
                        <div>
                            <label for="province" class="block text-sm font-medium text-gray-700">จังหวัด</label>
                            <select id="province" v-model="selectedProvince" @change="onProvinceChange"
                                class="font-sarabun bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="" disabled>เลือกจังหวัด</option>
                                <option v-for="province in provinces" :key="province.id" :value="province.provinceCode">
                                    {{ province.provinceNameTh }}
                                </option>
                            </select>
                        </div>

                        <!-- อำเภอ -->
                        <div>
                            <label for="district" class="block text-sm font-medium text-gray-700">อำเภอ</label>
                            <select id="district" v-model="selectedDistrict" @change="onDistrictChange"
                                class="font-sarabun bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="" disabled>เลือกอำเภอ</option>
                                <option v-for="district in districts" :key="district.id" :value="district.districtCode">
                                    {{ district.districtNameTh }}
                                </option>
                            </select>
                        </div>

                        <!-- ตำบล -->
                        <div>
                            <label for="subdistrict" class="block text-sm font-medium text-gray-700">ตำบล</label>
                            <select id="subdistrict" v-model="selectedSubdistrict" @change="onSubdistrictChange"
                                class="font-sarabun bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="" disabled>เลือกตำบล</option>
                                <option v-for="subdistrict in subdistricts" :key="subdistrict.id"
                                    :value="subdistrict.subdistrictCode">
                                    {{ subdistrict.subdistrictNameTh }}
                                </option>
                            </select>
                        </div>

                        <!-- รหัสไปรษณีย์ -->
                        <div>
                            <label for="zipcode" class="block text-sm font-medium text-gray-700">รหัสไปรษณีย์</label>
                            <input type="text" id="postalCode" v-model="postalCode" readonly
                                class="w-full p-2 border text-sm border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                                placeholder="รหัสไปรษณีย์" />
                        </div>
                        <div class="border">
                            <div class="mt-4 w-full p-4 flex flex-col justify-center items-center text-center">
                                <p>
                                    รูปด้านหน้าร้าน <br> (อย่างน้อย 2 รูป)
                                </p>
                            </div>
                            <div class="w-full p-4 flex flex-col justify-center items-center">
                                <!-- แสดงรูปภาพที่อัปโหลด -->
                                <div class="grid grid-cols-3 gap-4 mb-4">
                                    <div v-for="(image, index) in images" :key="index" class="relative group">
                                        <img :src="image" alt="Preview"
                                            class="w-40 h-40 object-cover rounded cursor-pointer"
                                            @click="openimg(index)" />
                                    </div>
                                </div>
                                <!-- Input สำหรับอัปโหลด -->
                                <input type="file" multiple accept="image/*"
                                    class="file-input file-input-bordered file-input-info text-gray-700 file-input-md w-full max-w-xs mb-2"
                                    @change="onFileChange" />
                                <span class="font-sarabun text-sm mb-4">(อัปโหลดรูปหลายรูป
                                    รูปจะถูกปรับให้ขนาดเท่ากัน)</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="flex items-center justify-center p-4 md:p-5 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">

                    <button
                        class="font-sarabun px-4 py-2 ml-2 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:outline-none disabled:bg-gray-300 disabled:cursor-not-allowed">
                        บันทึก
                    </button>

                    <button @click="closeSecondModal"
                        class="font-sarabun ml-2 px-4 py-2 text-gray-200 focus:outline-none bg-error rounded-lg border border-gray-200 hover:bg-red-700 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-100 dark:focus:ring-red-500 dark:bg-error dark:text-gray-200 dark:border-gray-200 dark:hover:text-white dark:hover:bg-red-600">
                        ยกเลิก
                    </button>
                </div>
            </div>
        </div>
    </article>
    <!-- Modal -->
    <div v-if="isimgOpen" class="fixed inset-0 bg-gray-700 bg-opacity-70 flex items-center justify-center z-50">
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
                <img :src="images[selectedImageIndex]" alt="Zoomable and Rotatable" class="cursor-grab"
                    :style="imageStyle" />
            </div>
        </div>
    </div>

</template>