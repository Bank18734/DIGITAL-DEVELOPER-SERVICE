<script setup>
import { ref, onMounted } from "vue";
import axios from 'axios';
import Partner_1 from '@/components/ServicePage/Partner_1.vue';
import Partner_2 from '@/components/ServicePage/Partner_2.vue';
import Partner_3 from '@/components/ServicePage/Partner_3.vue';
const showModal = ref(false);
const showSecondModal = ref(false);

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
// สร้างตัวแปร selectedOption และตั้งค่าเริ่มต้นเป็น 'none'
const selectedOption = ref('none');

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
    <header class="flex flex-col justify-center items-center w-full p-8 text-center">
        <h1 class="text-4xl font-sarabun font-bold text-gray-800">One Stop Service</h1>
    </header>

    <article class="container mx-auto items-center justify-between mt-10 mb-10 px-4 sm:px-10 md:px-20">
        <!-- Card -->
        <div class="bg-[#001F54] shadow rounded-lg mb-6 p-4">
            <div class="flex flex-col sm:flex-row border border-[#0047AB] rounded-lg overflow-hidden">
                <div class="flex flex-col items-center border-b sm:border-b-0 sm:border-r sm:w-1/4 p-6">
                    <img src="../../assets/img/register_invest.png" class="shadow p-2 mb-4 w-40 h-40 sm:w-60 sm:h-60"
                        alt="Register Invest">
                </div>
                <div class="flex flex-col sm:w-3/4 p-6 text-white space-y-4">
                    <h2 class="text-2xl sm:text-3xl font-sarabun underline text-center sm:text-left">ไม่ต้องลงทุน</h2>
                    <p class="text-justify text-[18px] font-sarabun sm:text-base leading-relaxed">
                        &nbsp;&nbsp;&nbsp; สำหรับบุคคลทั่วไป วิสาหกิจชุมชน ร้านค้าขายของชำ โชห่วย หรือร้านอื่นๆ
                        ที่ต้องการเครื่องมืออันทรงพลังระบบครบวงจรในการทำงาน เพื่อเป็นรายได้หลัก หรือทำเป็นธุรกิจเสริม
                        เพิ่มรายได้ประจำวัน เพียงท่านเป็นเจ้าของสถานที่ หรือมีอำนาจในการใช้สถานที่ถูกต้องตามกฎหมาย
                        ลงทุนน้อย กำไรระยะยาว รับส่วนแบ่งกำไรทันทีเมื่อให้บริการ ตามแผนการตลาดของบริษัทฯ
                        โดยเงื่อนไขเป็นไปตามข้อตกลงที่บริษัทฯ กำหนด เท่านั้น
                    </p>
                    <div class="flex justify-center sm:justify-center p-2">
                        <button @click="showModal = true"
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
                <div class="flex justify-between items-center p-4 border-b">
                    <h3 class="text-xl font-semibold text-yellow-600 font-sarabun"></h3>
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
                        <strong>สัญญาเปิดศูนย์บริการ ภายใต้แบรนด์ ทศกัณฐ์ (TOSSAGUN)</strong>
                        <p><strong>one stop service</strong></p>
                        <p>
                            <strong>1.&nbsp;&nbsp;&nbsp;คำจำกัดความ</strong>
                        </p>
                        <div class="ml-4">
                            <p>
                                1.1&nbsp;&nbsp;&nbsp;ลายมือชื่ออิเล็กทรอนิกส์ หมายถึง
                                ว่าด้วยพระราชบัญญัติว่าด้วยธุรกรรมทางอิเล็กทรอนิกส์ พ.ศ. 2544 ลายมือชื่ออิเล็กทรอนิกส์
                                หมายถึง อักษร อักขระ ตัวเลข
                                เสียงหรือสัญลักษณ์อื่นใดที่สร้างขึ้นให้อยู่ในรูปแบบอิเล็กทรอนิกส์ซึ่งนำมาใช้ประกอบกับข้อมูลอิเล็กทรอนิกส์
                                เพื่อแสดงความสัมพันธ์ระหว่างบุคคลกับข้อมูลอิเล็กทรอนิกส์
                                โดยมีวัตถุประสงค์เพื่อระบุตัวบุคคลผู้เป็นเจ้าของลายมือชื่ออิเล็กทรอนิกส์ที่เกี่ยวข้องกับข้อมูลอิเล็กทรอนิกส์นั้น
                                และเพื่อแสดงว่าบุคคลดังกล่าวยอมรับข้อความในข้อมูลอิเล็กทรอนิกส์นั้น
                            </p>
                            <p>
                                1.2&nbsp;&nbsp;&nbsp;ผู้เปิดศูนย์บริการ หมายถึง
                                ผู้เปิดศูนย์บริการลูกค้าทุกประเภทของบริษัทฯ
                                เพื่อจำหน่ายสินค้าและ/หรือให้บริการรวมถึงการดำเนินการตามแผนการตลาดของบริษัทฯ
                                ภายใต้ขอบเขตของบริษัทฯ
                            </p>
                            <p>
                                1.3&nbsp;&nbsp;&nbsp;บริษัทฯ หมายถึง บริษัท ทศกัณฐ์ ดิจิตอล นิวเจนเนอเรชั่น จำกัด
                            </p>
                            <p>
                                1.4&nbsp;&nbsp;&nbsp;ข้อมูลส่วนบุคคล หมายถึง
                                ข้อมูลเกี่ยวกับบุคคลซึ่งทำให้สามารถระบุตัวบุคคลนั้นได้ไม่ว่าทางตรง ทางอ้อม
                                รวมถึงข้อมูลส่วนบุคคลตามกฎหมายเกี่ยวกับการคุ้มครองข้อมูลส่วนบุคคล
                            </p>
                            <p>
                                1.5&nbsp;&nbsp;&nbsp;ข้อมูลอันเป็นความลับ หมายถึง ข้อมูลส่วนบุคคลหรือข้อมูลทางการค้า
                                ความลับเชิงพาณิชย์ ข้อมูลที่เป็นความลับหรือทางการค้าเกี่ยวกับบริษัทฯ
                                และคู่สัญญาของบริษัทฯ
                            </p>
                            <p>
                                1.6&nbsp;&nbsp;&nbsp;ทรัพย์สินทางปัญญา หมายถึง
                                สิทธิในทรัพย์สินทางปัญญาทั้งปวงอันรวมถึงแต่ไม่จำกัดเพียง ลิขสิทธิ์ สิทธิบัตร
                                เครื่องหมายทางการค้า เครื่องหมายบริการ ซึ่งทางการค้าหรือการออกแบบ
                                ระบบงานใดที่เกิดจากการสร้างสรรค์ คิดค้น ออกแบบ
                            </p>
                            <p>
                                1.7&nbsp;&nbsp;&nbsp;เหตุสุดวิสัย หมายถึง เหตุใดๆ
                                ที่คู่สัญญาไม่อาจป้องกันได้หรือมิได้เกิดจากการกระทำของคู่สัญญานั้น
                                แม้ว่าจะได้ใช้ความระมัดระวังซึ่งบุคคลในภาวะเช่นนั้นจักต้องมีตามวิสัยและพฤติการณ์ตามสมควรอันพึงคาดหมายได้
                                ซึ่งได้แก่ เหตุที่เกิดจากภัยธรรมชาติ เช่น น้ำท่วม ไฟไหม้
                                แผ่นดินไหวหรือเกิดจากการใช้อำนาจรัฐหรือการกระทำโดยบุคคลภายนอกหรือปัจจัยภายนอก
                            </p>
                            <p>
                                1.8&nbsp;&nbsp;&nbsp;สินค้า หมายถึง
                                สินค้าที่เจ้าของสินค้าทำการผลิตหรือนำเข้าหรือสินค้าประเภทอื่น ๆ ที่เกี่ยวข้องที่มี ณ
                                ปัจจุบันหรือจะมีเพิ่มเติมในอนาคต ที่เจ้าของสินค้าฝากให้แก่บริษัทฯ
                                เพื่อจำหน่ายให้แก่ลูกค้าหรือสินค้าที่ทางบริษัทฯ จัดหาหรือผลิตเอง
                            </p>
                            <p>
                                1.9&nbsp;&nbsp;&nbsp;ทุกช่องทางของบริษัทฯ หมายถึง
                                ช่องทางออนไลน์อื่นใดที่อยู่ภายใต้เว็บไซต์ของบริษัทฯ
                            </p>
                            <p>
                                1.10 ลูกค้า หมายถึง บุคคลธรรมดา
                                ร้านค้าหรือนิติบุคคลทั่วไปที่ซื้อสินค้าจากเจ้าของสินค้าในลักษณะซื้อ-ขายเสร็จเด็ดขาด
                                หรือที่ใช้บริการบนหน้าเว็บไซต์ https://tossaguns.com หรือทุกช่องทางของบริษัทฯ
                            </p>
                            <p>
                                1.11&nbsp;https://service.tossaguns.com หมายถึง เว็บไซต์ของบริษัทฯ
                                ในการซื้อขายสินค้าหรือบริการจัดการธุรกรรมซื้อขายผลิตภัณฑ์ต่าง ๆ
                                และให้หมายความรวมถึงเว็บไซต์อื่น ๆ ของบริษัทฯ ที่จะมีขึ้นในอนาคตด้วย
                            </p>
                        </div>
                        <p>
                            <strong>2.&nbsp;&nbsp;&nbsp;ความสัมพันธ์ตามสัญญา</strong>
                        </p>
                        <div class="ml-4">
                            <p>
                                2.1&nbsp;&nbsp;&nbsp;ผู้เปิดศูนย์บริการ
                                ได้สมัครเพื่อให้บริการดำเนินการตามแผนการตลาดของบริษัทฯ
                                เพื่อเป็นสื่อกลางในการให้บริการงานภายใต้ขอบเขตที่บริษัทฯ กำหนด
                                และให้ข้อมูลข่าวสารองค์ความรู้แก่ตัวแทนศูนย์ฯ ภายใต้พื้นที่ที่ผู้เปิดศูนย์บริการดูแล
                                และรับสมัครสมาชิกตลอดจนชี้แจงประสานงาน และให้บริการข้อมูลข่าวสารแก่สมาชิก และบริการอื่น
                                ๆ ตามแผนการตลาดของบริษัทฯ
                            </p>
                            <p>
                                2.2&nbsp;&nbsp;&nbsp;ผู้เปิดศูนย์บริการ จะได้รับหนังสือแต่งตั้งการเป็นตัวแทนตามประเภท
                                โดยออกเป็นหนังสือติดตั้งไว้ ณ ศูนย์บริการของผู้เปิดศูนย์บริการเสมือนเป็นตัวแทนของบริษัทฯ
                                พร้อมทั้งเอกสารที่เกี่ยวข้อง
                            </p>
                            <p>
                                2.3&nbsp;&nbsp;&nbsp;ผู้เปิดศูนย์บริการ ทราบและเข้าใจเป็นอย่างดีว่า บริษัทฯ
                                เป็นผู้ให้บริการการตลาดแบบตรง
                                หรือเป็นสื่อกลางระหว่างผู้ใช้บริการกับผู้บริโภคผ่านเว็บไซต์หรือทุกช่องทางของบริษัทฯ
                                เพื่อเป็นช่องทางในการซื้อขายสินค้าหรือบริการจัดการธุรกรรมซื้อขายผลิตภัณฑ์ต่าง ๆ
                                ซึ่งต่อไปนี้เรียกว่า “ระบบแพลตฟอร์ม” โดยผู้เปิดศูนย์บริการตกลงใช้บริการระบบแพลตฟอร์ม
                                และบริษัทฯ ตกลงให้ผู้เปิดศูนย์บริการใช้ระบบแพลตฟอร์มดังกล่าว
                                ตามประเภทที่ได้เลือกตามความสมัครใจของผู้เปิดศูนย์บริการ โดยใบแต่งตั้งทางบริษัทฯ
                                จะอนุมัติและออกให้ตามประเภทที่เลือกนั้น ๆ
                            </p>
                            <p>
                                2.4&nbsp;&nbsp;&nbsp;ผู้เปิดศูนย์บริการ
                                ตกลงและรับรองว่าข้อมูลส่วนบุคคลที่ได้ให้ไว้กับบริษัทฯ
                                ได้รับความยินยอมจากบุคคลที่เกี่ยวข้องในการเปิดเผยข้อมูลส่วนบุคคลให้กับบริษัทฯ
                                และเพื่อให้บริษัทฯ รวบรวม ใช้ และเปิดเผยตามนโยบายความเป็นส่วนตัวของบริษัทฯ
                            </p>
                        </div>
                        <p>
                            <strong>3.&nbsp;&nbsp;&nbsp;เครื่องหมายทางการค้าในธุรกิจ</strong>
                        </p>
                        <div class="ml-4">
                            <p>
                                3.1&nbsp;&nbsp;&nbsp;เครื่องหมายหรือสัญลักษณ์การเป็นตัวแทนของบริษัทฯ ตลอดจนเว็บไซต์
                                แอพพลิเคชั่น และสื่อการตลาดทุกรูปแบบ รวมถึงทรัพย์สินทางปัญญา นวัตกรรม ฯลฯ ของบริษัทฯ
                                เพื่อให้ใช้สิทธิต่าง ๆ ตามสัญญาฉบับนี้
                                มีผลบังคับใช้เพื่อให้มีการเปิดศูนย์บริการฝากขายสินค้าและบริการเป็นไปตามที่ส่วนกลางกำหนด
                                ไม่อนุญาตให้ดัดแปลง แก้ไข โดยไม่ได้รับอนุญาตเป็นลายลักษณ์อักษรจากทางบริษัทฯ
                            </p>
                            <p>
                                3.2&nbsp;&nbsp;&nbsp;ผู้เปิดศูนย์บริการจะต้องใช้เครื่องหมายทางการค้าตามสัญญาฉบับนี้
                                เพื่อประกอบกิจการค้าตามปกติ และอยู่ภายใต้ขอบเขตที่กำหนดไว้ในสัญญา
                                ผู้เปิดศูนย์บริการตกลงว่าจะไม่กระทำการใด ๆ อันเป็นการรบกวน
                                หรือแย้งกับสิทธิประโยชน์เจ้าของเครื่องหมายทางการค้า รวมถึงผู้มีส่วนเกี่ยวข้อง
                                ไม่ว่าจะกระทำเพื่อตนเองหรือผู้อื่น ตลอดจนจะไม่กระทำการใด ๆ
                                หรือยอมให้กระทำการฝ่าฝืนกฎหมาย หรือขัดต่อความสงบเรียบร้อย หรือศีลธรรมอันดีของประชาชน
                                หรือก่อให้เกิดความรำคาญ หรือเป็นที่น่ารังเกียจแก่บุคคลใดในสภาพที่ประกอบการค้านั้น
                            </p>
                            <p>
                                3.3&nbsp;&nbsp;&nbsp;ผู้เปิดศูนย์บริการ จะต้องป้องกันเครื่องหมาย
                                สัญลักษณ์หรือเครื่องหมายทางการค้าดังกล่าว
                                มิให้ผู้อื่นกระทำการล่วงล้ำสิทธิในเครื่องหมายทางการค้าของบริษัทฯ
                                ไม่ว่าจะเป็นการใช้เครื่องหมายปลอม การลอกเลียนแบบเครื่องหมายทางการค้า
                                การใช้รูปรอยประดิษฐ์ หรือข้อความใด ๆ หากพบเห็นจะต้องแจ้งให้บริษัทฯ ทราบทันที
                            </p>
                        </div>
                        <p>
                            <strong>4.&nbsp;&nbsp;&nbsp;ระยะเวลาในการให้สิทธิประกอบธุรกิจ</strong>
                        </p>
                        <div class="ml-4">
                            <p>
                                4.1&nbsp;&nbsp;&nbsp;สัญญาฉบับนี้มีผลบังคับใช้ในวันที่จัดทำสัญญาฉบับนี้
                                และถือว่าเป็นวันเริ่มต้นสัญญาฉบับนี้ “วันที่เริ่มต้นสัญญา”
                                และจะถูกต่ออายุอัตโนมัติจนกว่าฝ่ายใดฝ่ายหนึ่งจะส่งคำบอกกล่าวเป็นลายลักษณ์อักษรแจ้งถึงความประสงค์ที่ต้องการบอกเลิกสัญญานั้นไปยังอีกฝ่าย
                            </p>
                            <p>
                                โดยบริษัทฯ ตกลงให้ผู้เปิดศูนย์บริการใช้สิทธิในการประกอบธุรกิจ
                                มีผลตลอดระยะเวลาตามสัญญาในการเปิดศูนย์ให้บริการภายใต้ความดูแล และควบคุมของบริษัทฯ
                                สิทธิในการประกอบธุรกิจมีผลจนกว่าคู่สัญญาฝ่ายใดฝ่ายหนึ่งจะปฏิบัติตามเงื่อนไขการสิ้นสุดของสัญญา
                            </p>
                        </div>
                        <p>
                            <strong>5.&nbsp;&nbsp;&nbsp;การปฏิเสธความรับผิด</strong>
                        </p>
                        <div class="ml-4">
                            <p>
                                5.1&nbsp;&nbsp;&nbsp;ทางบริษัทฯ ไม่มีความเกี่ยวข้องใด ๆ สำหรับช่องทางการจำหน่าย
                                และบริการของผู้เปิดศูนย์บริการ รวมถึงการนำเสนอหรือการให้ข้อมูลต่อสาธารณชน
                                เพื่อจำหน่ายหรือประชาสัมพันธ์อันเป็นการละเมิดต่อข้อบังคับของบริษัทฯ
                            </p>
                            <p>
                                5.2&nbsp;&nbsp;&nbsp;บริษัทฯ เป็นเพียงตัวแทนการให้ใช้บริการระบบบน “แพลตฟอร์ม” ของบริษัทฯ
                                และบริษัทฯ ไม่ทราบถึงข้อตกลงที่ทำขึ้นหรือสิทธิข้อผูกพันใด ๆ
                                ระหว่างลูกค้ากับผู้เปิดศูนย์บริการ บริษัทฯ
                                จึงไม่ต้องรับผิดชอบสำหรับความเสียหายที่เกิดขึ้นจากการละเมิดข้อตกลงระหว่างลูกค้ากับผู้เปิดศูนย์บริการ
                                ผู้เปิดศูนย์บริการรับทราบ
                                และตกลงว่าเป็นความรับผิดชอบของผู้เปิดศูนย์บริการแต่เพียงผู้เดียว
                            </p>
                            <p>
                                5.3&nbsp;&nbsp;&nbsp;ในกรณีที่ผู้เปิดศูนย์บริการเป็นผู้รับผิดชอบในการจัดส่งสินค้า
                                และ/หรือให้บริการ หากเกิดความผิดพลาด ความล่าช้าหรือความเสียหายใด ๆ
                                เกิดขึ้นจากผู้เปิดศูนย์บริการเอง ผู้เปิดศูนย์บริการจะต้องเป็นผู้รับผิดชอบต่อลูกค้า
                                ตลอดจนบุคคลภายนอกผู้ได้รับความเสียหายด้วยค่าใช้จ่ายของตนเองทั้งหมด
                            </p>
                        </div>
                        <p>
                            <strong>6.&nbsp;&nbsp;&nbsp;จำกัดความรับผิดของบริษัทฯ</strong>
                        </p>
                        <div class="ml-4">
                            <p>
                                6.1&nbsp;&nbsp;&nbsp;บริษัทฯ ไม่ต้องรับผิดต่อผู้เปิดศูนย์บริการลูกค้า ไม่ว่าในลักษณะใด
                                ไม่อาจถือได้ว่าบริษัทฯ เป็นผู้ละเมิดเงื่อนไขเหล่านี้
                                อันเนื่องมาจากความล่าช้าในการปฏิบัติตามสัญญา
                                หรือการไม่สามารถปฏิบัติหน้าที่ตามข้อผูกพันของตนภายใต้เงื่อนไขเหล่านี้
                                หากความล่าช้าหรือไม่สามารถปฏิบัติหน้าที่ได้นั้นเป็นผลมาจากเหตุใด ๆ
                                ที่อยู่เหนือการควบคุมที่สมเหตุสมผลของบริษัทฯ เมื่อเกิดเหตุสุดวิสัยขึ้น บริษัทฯ
                                อาจเลือกที่จะชะลอการปฏิบัติตามสัญญาฉบับนี้ และภายในระยะเวลา 3
                                ปีนับตั้งแต่วันที่สัญญาฉบับนี้สิ้นสุดลง หากผู้เปิดศูนย์บริการประพฤติผิดเงื่อนไขสัญญานี้
                                บริษัทฯ มีสิทธิ์เรียกร้องให้ผู้เปิดศูนย์บริการรับผิดชอบความเสียหายที่เกิดขึ้นได้
                            </p>
                            <p>
                                6.2&nbsp;&nbsp;&nbsp;ผู้เปิดศูนย์บริการ รับทราบ และตกลงว่าบริษัทฯ ไม่ต้องรับผิด
                                หากบริษัทฯ ไม่สามารถทำให้คำสั่งการเสร็จสิ้นได้ ด้วยเหตุนอกเหนือการควบคุมของบริษัทฯ
                            </p>
                            <p>
                                6.2.1&nbsp;&nbsp;&nbsp;หากบัญชีในแพลตฟอร์มของผู้เปิดศูนย์มีเงินไม่เพียงพอโดยไม่ใช่ความผิดของบริษัทฯ
                            </p>
                            <p>
                                6.2.2&nbsp;&nbsp;&nbsp;หากผู้เปิดศูนย์กลางการประมวลผลการให้บริการของทางบริษัทฯ
                                ทำงานไม่ปกติ และผู้เปิดศูนย์บริการรู้หรือได้รับแจ้งจากทางบริษัทฯ
                                เกี่ยวกับการทำงานที่ผิดปกตินั้น ก่อนที่ผู้เปิดศูนย์บริการดำเนินการรับโอนดังกล่าว
                            </p>
                            <p>
                                6.3&nbsp;&nbsp;&nbsp;พฤติการณ์นอกเหนือการควบคุมของบริษัทฯ
                                เหตุสุดวิสัยหรือไม่ว่าจะสามารถคาดเห็นได้หรือคาดเห็นแล้วก็ตาม
                                อันมีลักษณะเป็นการขัดขวางการดำเนินการ และบริษัทฯ
                                ได้เตรียมการป้องกันไว้ตามสมควรเพื่อหลีกเลี่ยงพฤติการณ์ดังกล่าวแล้ว
                            </p>
                            <p>
                                6.4&nbsp;&nbsp;&nbsp;หากความผิดพลาด ล่าช้า
                                ไม่ว่าจะเกิดขึ้นจากเหตุสุดวิสัยหรือเหตุขัดข้องใด ๆ ก็ตาม จากคู่ค้าพาร์ทเนอร์ของบริษัทฯ
                                หรือระบบคอมพิวเตอร์ ระบบอินเตอร์เน็ต อุปกรณ์อิเล็กทรอนิกส์ต่าง ๆ
                                ระบบแพลตฟอร์มของทางบริษัทฯ ระบบขนส่งหรือระบบอื่นใดที่เกี่ยวข้องกับการให้บริการ
                                ไม่ว่าจะเกิดเหตุใด ๆ
                                ผู้เปิดศูนย์บริการตกลงจะไม่ยกเอาเหตุขัดข้องดังกล่าวมาเป็นข้อเรียกร้องค่าเสียหายใด ๆ
                                จากบริษัทฯ
                            </p>
                        </div>
                        <p>
                            <strong>7.&nbsp;&nbsp;&nbsp;ความลับทางการค้า</strong>
                        </p>
                        <div class="ml-4">
                            <p>
                                ในการเข้าทำสัญญาฉบับนี้
                                คู่สัญญาแต่ละฝ่ายอาจได้ล่วงรู้หรือได้รับข้อมูลของคู่สัญญาอีกฝ่ายหนึ่ง
                                ไม่ว่าจากคู่สัญญาอีกฝ่ายหนึ่งนั้นเองหรือจากบุคคลอื่นใด
                                คู่สัญญาแต่ละฝ่ายต่างตกลงจะเก็บรักษาข้อมูลของคู่สัญญาอีกฝ่ายไว้เป็นความลับ
                                ไม่ว่าจะเป็นข้อมูลส่วนบุคคลหรือข้อมูลทางการค้า และไม่ว่าจะมีมูลค่าหรือไม่ก็ตาม
                                และจะไม่เปิดเผย ตีพิมพ์ ประกาศ รับรองหรือเผยแพร่ต่อบุคคลที่สาม ไม่ว่า ณ เวลาใด
                                และไม่ว่าสัญญาฉบับนี้จะสิ้นสุดลงแล้วหรือไม่ก็ตาม
                            </p>
                        </div>
                        <p>
                            <strong>8.&nbsp;&nbsp;&nbsp;ผลของการสิ้นสุดของสัญญา</strong>
                        </p>
                        <div class="ml-4">
                            <p>เมื่อสัญญาฉบับนี้สิ้นสุดลง ผู้เปิดศูนย์บริการมีหน้าที่ต้องปฏิบัติดังนี้</p>
                            <p>
                                8.1&nbsp;&nbsp;&nbsp;เลิกประกอบธุรกิจของบริษัทฯ ทันที
                                และไม่ดำเนินการอื่นใดอันเป็นการแสดงว่าเกี่ยวข้องหรือเป็นตัวแทนของทางบริษัทฯ
                            </p>
                            <p>
                                8.2&nbsp;&nbsp;&nbsp;เลิกใช้เครื่องหมายทางการค้า การออกแบบและการตกแต่ง ความลับทางการค้า
                                สิทธิหรือทรัพย์สินใด ๆ อันเป็นสิทธิของบริษัทฯ
                                ไม่ว่าจะใช้ในการประกอบธุรกิจหรือใช้ในวัตถุประสงค์ใดก็ตาม
                                และถอนการติดตั้งทั้งหมดที่เกี่ยวกับทางบริษัทฯ ไม่ว่าจะเป็น ป้าย ไวนิล โปสเตอร์
                                โบรชัวร์หรือสิ่งอื่นใดที่บ่งบอกเกี่ยวกับทางบริษัทฯ
                                โดยจะต้องดำเนินการถอนการติดตั้งให้แล้วเสร็จภายใน 7 วัน นับแต่วันที่เลิกสัญญาบับนี้
                            </p>
                            <p>
                                8.3&nbsp;&nbsp;&nbsp;ในกรณีที่ผู้เปิดศูนย์บริการยังคงติดค้างชำระค่าตอบแทนการให้ใช้สิทธิการประกอบธุรกิจหรือเงินอื่นใดที่ผู้เปิดศูนย์บริการมีหน้าที่ต้องชำระให้แก่บริษัทฯ
                                ตามสัญญาฉบับนี้ไม่ว่าทั้งหมดหรือบางส่วน
                                ผู้เปิดศูนย์บริการจะต้องชำระค่าตอบแทนนั้นให้ครบถ้วนทันที
                            </p>
                            <p>
                                8.4&nbsp;&nbsp;&nbsp;การสิ้นสุดระยะเวลาของสัญญาหรือการบอกเลิกสัญญาฉบับนี้ไม่ว่าด้วยเหตุใด
                                มิให้กระทบต่อความสมบูรณ์ของข้อกำหนดในสัญญาฉบับนี้ที่ระบุไว้ว่าให้มีผลบังคับใช้
                                เมื่อสัญญาสิ้นสุดลงมิให้เสื่อมสิทธิหรือสิทธิเรียกร้องความเสียหายอื่นใดที่คู่สัญญามีอยู่
                            </p>
                        </div>
                        <p>
                            <strong>9.&nbsp;&nbsp;&nbsp;การแก้ไขเพิ่มเติม</strong>
                        </p>
                        <div class="ml-4">
                            <p>
                                <strong></strong>
                                บริษัทฯ ขอสงวนสิทธิ์ในการแก้ไขเพิ่มเติมข้อกำหนด และเงื่อนไขเหล่านี้ ณ เวลาใดก็ได้
                                ข้อแก้ไขเพิ่มเติมต่อเงื่อนไขเหล่านี้จะประกาศไว้ในแพลตฟอร์มของบริษัทฯ อย่างไรก็ตาม
                                การใช้บริการกับบริษัทฯ ต่อไปจะถือว่าเป็นการยอมรับเงื่อนไขใหม่
                                เมื่อผู้เปิดศูนย์บริการยื่นคำสั่งซื้อกับแพลตฟอร์มการให้บริการของบริษัทฯ บริษัทฯ
                                ตกลงว่าผู้เปิดศูนย์บริการกระทำการดังกล่าวภายใต้เงื่อนไขเหล่านี้ที่เป็นปัจจุบันขณะนั้น ณ
                                วันที่ผู้เปิดศูนย์บริการได้ใช้บริการ
                                ท่านมีหน้าที่ที่จะต้องทบทวนเงื่อนไขล่าสุดทุกครั้งที่ผู้เปิดศูนย์บริการใช้บริการในระบบของบริษัทฯ
                            </p>
                        </div>
                        <p>
                            <strong>10.&nbsp;&nbsp;&nbsp;การรักษาข้อมูลลูกค้า</strong>
                        </p>
                        <div class="ml-4">
                            <p>
                                “ข้อมูลลูกค้า” หมายถึง ข้อมูลเกี่ยวกับลูกค้าทุกอย่างที่สร้างขึ้นหรือเก็บบันทึกโดยบริษัทฯ
                                และข้อมูลใด ๆ ที่ผู้เปิดศูนย์บริการได้รับจากการดำเนินธุรกิจภายใต้สัญญาฉบับนี้
                                รวมถึงแต่ไม่จำกัดเพียง ชื่อลูกค้า ที่อยู่ในการจัดส่ง อีเมล เบอร์โทรศัพท์
                                ข้อมูลการชำระเงิน ผู้เปิดศูนย์บริการตกลงที่จะใช้ข้อมูลลูกค้าเพียงเพื่อส่งมอบสินค้า
                                และ/หรือให้บริการที่เกี่ยวข้องในข้อตกลงนี้เท่านั้น
                            </p>
                            <p>
                                ผู้เปิดศูนย์บริการจะไม่นำข้อมูลลูกค้าไปเพื่อเสริมข้อมูลของทางผู้เปิดศูนย์บริการหรือบุคคลที่สาม
                                ผู้เปิดศูนย์บริการตกลงที่จะไม่นำข้อมูลลูกค้าไปขาย ใช้เพื่อทำตนเป็นนายหน้าหรือเปิดเผยใด ๆ
                                ต่อบุคคลที่สามทั้งส่วนใดส่วนหนึ่งหรือทั้งหมดด้วยสาเหตุใด ๆ ก็ตาม
                            </p>
                            <p>
                                ยกเว้นการปฏิบัติเพื่อให้สอดคล้องกับกฎหมาย หากผู้เปิดศูนย์บริการว่าจ้างบุคคลที่สามใด ๆ
                                เพื่อดำเนินธุรกิจดังกล่าว บุคคลที่สามนั้นจะต้องปฏิบัติตามข้อตกลง
                                และมีมาตรารักษาความปลอดภัยของข้อมูลลูกค้าที่เหมาะสม
                                ผู้เปิดศูนย์บริการหรือบุคคลที่สามที่ผู้เปิดศูนย์บริการว่าจ้างจะต้องรักษานโยบายความเป็นส่วนตัว
                                และปฏิบัติตามกฎหมายที่เกี่ยวข้อง
                            </p>
                        </div>
                        <p>
                            <strong>11.&nbsp;&nbsp;&nbsp;ข้อตกลงอื่น ๆ</strong>
                        </p>
                        <div class="ml-4">
                            <p>
                                11.1&nbsp;&nbsp;&nbsp;สัญญาฉบับนี้ไม่ก่อให้เกิดความผูกพันในลักษณะของการเป็นตัวแทน
                                หุ้นส่วนหรือกิจการร่วมค้า
                                และไม่มีฝ่ายใดที่มีอำนาจกระทำการแทนอีกฝ่ายหรือกระทำการในฐานะตัวแทนของอีกฝ่ายหนึ่งไม่ว่าด้วยประการใด
                                ๆ
                            </p>
                            <p>
                                11.2&nbsp;&nbsp;&nbsp;สัญญาฉบับนี้เป็นสิทธิเฉพาะตัว
                                คู่สัญญาทั้งสองฝ่ายไม่อาจโอนสิทธิตามสัญญาฉบับนี้โดยเด็ดขาด
                                ไม่ว่าทั้งหมดหรือส่วนหนึ่งส่วนใด
                                เว้นแต่จะได้รับความยินยอมจากอีกฝ่ายหนึ่งเป็นลายลักษณ์อักษร
                            </p>
                            <p>
                                11.3&nbsp;&nbsp;&nbsp;หากมีการเปลี่ยนแปลงข้อตกลงหรือเงื่อนไขใด ๆ ในสัญญาฉบับนี้
                                ผู้เปิดศูนย์บริการยินยอมให้บริษัทเปลี่ยนแปลงแก้ไขข้อตกลง และเงื่อนไขฉบับนี้ได้
                                โดยบริษัทฯ จะแจ้งให้ผู้เปิดศูนย์บริการทราบล่วงหน้า โดยผู้เปิดศูนย์บริการยอมรับ
                                และปฏิบัติตาม
                            </p>
                            <p>
                                11.4&nbsp;&nbsp;&nbsp;หากพบว่าลูกจ้าง
                                พนักงานหรือตัวแทนผู้เปิดศูนย์บริการทุจริตหรือมีส่วนร่วมกับผู้ทุจริต เป็นเหตุให้บริษัทฯ
                                ได้รับความเสียหาย ผู้เปิดศูนย์บริการตกลงรับผิดชอบทั้งสิ้น โดยยินยอมให้บริษัทฯ
                                หักเงินค่าเสียหายใด ๆ ที่ผู้เปิดศูนย์บริการพึงจะได้รับจากบริษัทฯ ได้ทันที
                                และหากจำนวนเงินดังกล่าวไม่เพียงพอ บริษัทฯ มีสิทธิเรียกให้ชำระค่าเสียหายเพิ่มเติมได้
                            </p>
                            <p>
                                11.5&nbsp;&nbsp;&nbsp;กรณีลูกค้าขอคืนเงินหรือปฏิเสธการชำระเงิน
                                เนื่องจากไม่ได้รับสินค้าและบริการ หรือได้รับแต่ไม่ถูกต้องครบถ้วน
                                ซึ่งเกิดจากความผิดพลาดจากผู้เปิดศูนย์บริการ
                                ผู้เปิดศูนย์บริการต้องเป็นผู้รับผิดชอบในการคืนเงินหรือความเสียหายที่เกิดขึ้นทั้งสิ้น
                            </p>
                            <p>
                                11.6&nbsp;&nbsp;&nbsp;หากผู้เปิดศูนย์ไม่ได้เก็บรักษาเอกสารหลักฐานการทำธุรกรรมไว้
                                หรือเก็บรักษาไว้ไม่ครบถ้วน ผู้เปิดศูนย์บริการตกลงให้บันทึก และเอกสารหลักฐานที่บริษัทฯ
                                ได้เก็บรักษาไว้ถือว่าถูกต้อง และแท้จริง
                            </p>
                            <p>
                                11.7&nbsp;&nbsp;&nbsp;การคิดค่าบริการระบบ
                                คู่สัญญาทั้งสองฝ่ายตกลงให้ยึดถือตามข้อมูลยอดขายที่อยู่บนระบบของบริษัทฯ
                                ว่าเป็นข้อมูลที่ถูกต้องและแท้จริง
                            </p>
                        </div>
                        <p>
                            <strong>12.&nbsp;&nbsp;&nbsp;ข้อความในสัญญานี้</strong>
                        </p>
                        <div class="ml-4">
                            <p>
                                หากมีข้อความหรือข้อตกลงใดในสัญญาฉบับนี้ตกเป็นโมฆะ ไม่สมบูรณ์หรือไม่มีผลบังคับใช้
                                ไม่ว่าด้วยเหตุใด ๆ ก็ตาม คู่สัญญาตกลงให้ข้อความและข้อตกลงอื่น ๆ
                                ในสัญญาฉบับนี้ยังคงมีผลสมบูรณ์ผูกพันคู่สัญญาเสมือนหนึ่งว่าไม่มีข้อความส่วนที่เป็นโมฆะ
                                ไม่สมบูรณ์หรือส่วนที่ไม่มีผลบังคับใช้อยู่ในสัญญาฉบับนี้
                            </p>
                        </div>
                        <p>
                            <strong>13.&nbsp;&nbsp;&nbsp;กฎหมายข้อบังคับใช้</strong>
                        </p>
                        <div class="ml-4">
                            <p>
                                ทั้งนี้ หากมีข้อพิพาท ข้อโต้แย้ง ข้อขัดแย้งใดๆ เกิดขึ้นอันเนื่องมาจากสัญญาฉบับนี้
                                หากคู่สัญญาไม่สามารถตกลงกันได้ คู่สัญญาตกลงจะนำข้อพิพาทดังกล่าวขึ้นฟ้องต่อศาลในประเทศไทย
                            </p>
                            <p>
                                สัญญาฉบับนี้ทำขึ้นสองฉบับมีข้อความถูกต้องตรงกัน
                                คู่สัญญาแต่ละฝ่ายได้อ่านโดยตลอดแล้วยืนยันว่าถูกต้องตามเจตนา
                                จึงได้ลงลายมือชื่อไว้เป็นสำคัญและแต่ละฝ่ายยึดถือไว้หนึ่งฉบับ
                            </p>
                            <p>
                                หมายเหตุ : พระราชบัญญัติ ว่าด้วยธุรกรรมทางอิเล็กทรอนิกส์ พ.ศ. ๒๕๔๔ ที่แก้ไขเพิ่มเติม
                                (ฉบับที่ 3) พ.ศ.2562 ถือว่า การเข้าสู่ระบบโดยใช้ชื่อผู้ใช้ ( username ) และรหัสผ่าน (
                                password ) เข้าสู่ระบบ และมีการยอมรับเงื่อนไข และข้อตกลงในระบบ
                                ถือว่าสัญญาฉบับนี้มีผลสมบูรณ์
                            </p>
                        </div>
                    </div>
                    <!-- Contract Details -->
                    <div class="flex items-center justify-center w-full p-4 border-t">
                        <button @click="handleConfirm"
                            class="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 text-base font-sarabun">
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
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 font-sarabun">
                        <div class="col-span-full">
                            <label class="block text-sm font-medium text-gray-700 mb-2">ชื่อร้านค้า</label>
                            <input type="text" placeholder="กรุณากรอกชื่อร้านค้า"
                                class="w-full text-sm px-2 py-2 mt-1 border rounded-md shadow-sm focus:ring-1 focus:border-blue-300 focus:ring-blue-300 focus:outline-none"
                                fdprocessedid="52g04">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">ละติจูด</label>
                            <input type="text" placeholder="กรุณากรอกละติจูด"
                                class="w-full text-sm px-2 py-2 mt-1 border rounded-md shadow-sm focus:ring-1 focus:border-blue-300 focus:ring-blue-300 focus:outline-none"
                                fdprocessedid="j9ld1l">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">ลองจิจูด</label>
                            <input type="text" placeholder="กรุณากรอกลองจิจูด"
                                class="w-full text-sm px-2 py-2 mt-1 border rounded-md shadow-sm focus:ring-1 focus:border-blue-300 focus:ring-blue-300 focus:outline-none"
                                fdprocessedid="o126w">
                        </div>
                        <div class="col-span-full">
                            <label class="block text-sm font-medium text-gray-700 mb-2">ที่อยู่</label>
                            <input type="text" placeholder="กรุณากรอกที่อยู่"
                                class="w-full text-sm px-2 py-2 mt-1 border rounded-md shadow-sm focus:ring-1 focus:border-blue-300 focus:ring-blue-300 focus:outline-none"
                                fdprocessedid="0vw1u">
                        </div>
                        <!-- จังหวัด -->
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
                                class="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100" />
                        </div>

                        <div class="col-span-full">
                            <!-- Dropdown -->
                            <label
                                class="block text-sm font-medium text-gray-700 mb-2">คุณได้จดทะเบียนภาษีหรือไม่?</label>
                            <select id="tax-status" v-model="selectedOption"
                                class="w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none text-sm">
                                <option value="none">ไม่มี</option>
                                <option value="registered">จดทะเบียนภาษี</option>
                                <option value="registered">จดทะเบียนพาณิชย์</option>
                            </select>
                        </div>
                        <!-- Conditional Message -->
                        <div v-if="selectedOption === 'registered'" class="mt-2 col-span-full">
                            <label class="block text-sm font-medium text-gray-700 mb-2">ชื่อจดทะเบียนภาษี</label>
                            <input type="text" placeholder="กรอกข้อมูลจดทะเบียนภาษี"
                                class="w-full text-sm px-2 py-2 mt-1 border rounded-md shadow-sm focus:ring-1 focus:border-blue-300 focus:ring-blue-300 focus:outline-none">
                        </div>
                        <div v-if="selectedOption === 'registered'" class="mt-2 col-span-full">
                            <label class="block text-sm font-medium text-gray-700 mb-2">ที่อยู่ที่จดทะเบียนภาษี</label>
                            <input type="text" placeholder="กรอกข้อมูลจดทะเบียนภาษี"
                                class="w-full text-sm px-2 py-2 mt-1 border rounded-md shadow-sm focus:ring-1 focus:border-blue-300 focus:ring-blue-300 focus:outline-none">
                        </div>
                        <div v-if="selectedOption === 'registered'" class="mt-2">
                            <label class="block text-sm font-medium text-gray-700 mb-2">เลขประจำตัวจดทะเบียนภาษี</label>
                            <input type="text" placeholder="กรอกเลขประจำตัวจดทะเบียนภาษี"
                                class="w-full text-sm px-2 py-2 mt-1 border rounded-md shadow-sm focus:ring-1 focus:border-blue-300 focus:ring-blue-300 focus:outline-none">
                        </div>
                        <div v-if="selectedOption === 'registered'" class="mt-2">
                            <label
                                class="block text-sm font-medium text-gray-700 mb-2">เบอร์โทรศัพท์จดทะเบียนภาษี</label>
                            <input type="text" placeholder="กรอกเบอร์โทรศัพท์จดทะเบียนภาษี"
                                class="w-full px-2 text-sm py-2 mt-1 border rounded-md shadow-sm focus:ring-1 focus:border-blue-300 focus:ring-blue-300 focus:outline-none">
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

    <Partner_1 />
    <Partner_2 />
    <Partner_3 />
</template>
