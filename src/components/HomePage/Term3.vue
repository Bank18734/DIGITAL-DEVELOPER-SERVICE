<template>
    <!-- Main modals -->
    <div v-if="isVisible" id="static-modal" tabindex="-1" aria-hidden="true"
        class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div class="relative bg-white rounded-lg shadow  w-full max-w-4xl">
            <!-- Modal Header -->
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 class="text-xl font-sarabun font-semibold text-gray-900 ">
                    สัญญาเปิด Partner shop</h3>
                <button @click="closeModal" type="button"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                </button>
            </div>

            <!-- Modal Body -->
            <div class="p-4 md:p-5 space-y-4 max-h-[400px] overflow-y-auto">
                <div class="text-base font-sarabun leading-relaxed gap-2">
                    <strong>สัญญาคู่ค้า&nbsp;(Partner)</strong>
                    <div class="ml-4 space-y-2">
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;สัญญาฉบับนี้จัดทำขึ้น ณ บริษัท ทศกัณฐ์ ดิจิตอล นิว เจนเนอเรชั่น จำกัด เมื่อวันที่ (วันที่___{date}___) ระหว่างบริษัท ทศกัณฐ์ ดิจิตอล นิว เจนเนอเรชั่น จำกัด ทะเบียนบริษัทเลขที่ 0505567007065 สำนักงานใหญ่ตั้งอยู่ 103 หมู่ที่ 4 ถนนรอบเมืองเชียงใหม่ ตำบลสุเทพ อำเภอเมืองเชียงใหม่ จังหวัดเชียงใหม่ 50200 ซึ่งต่อไปในสัญญาฉบับนี้ เรียกว่า “บริษัทฯ” ฝ่ายหนึ่ง</p>
                        <br>
                        <p>กับ นาย/นาง/นางสาว _____{name}_____ ผู้ลงทะเบียนสมัครเป็นคู่ค้า โดยใช้บัญชีผู้ใช้ที่ลงทะเบียนเข้าใช้งานบัญชีไว้กับบริษัทฯ ซึ่งต่อไปนี้เรียกว่า “คู่ค้า” อีกฝ่ายหนึ่ง</p>
                        <br>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;โดยบริษัท ทศกัณฐ์ ดิจิตอล นิว เจนเนอเรชั่นจำกัด เป็นบริษัทที่ดำเนินการเป็นตัวกลางในการซื้อขายผลิตภัณฑ์ และให้บริการลูกค้าโดยตรงและผ่านเว็ปไซต์ <a href="https://tossaguns.com/" rel="noopener noreferrer" target="_blank" class="text-blue-600">https://tossaguns.com</a> หรือทุกช่องทางของบริษัทฯ</p>
                        <br>
                        <p>ทั้งสองฝ่ายตกลงทำสัญญากันดังมีข้อความต่อไปนี้<strong>&nbsp;</strong></p>
                    </div><br>

                    <strong>1) คำจำกัดความ</strong>
                    <div class="ml-4 space-y-2">
                        <p>1.1 ลายมือชื่ออิเล็กทรอนิกส์ หมายถึง ว่าด้วยพระราชบัญญัติว่าด้วยธุรกรรมทางอิเล็กทรอนิกส์ พ.ศ. 2544 ลายมือชื่ออิเล็กทรอนิกส์ หมายถึง อักษร อักขระ ตัวเลข เสียงหรือสัญลักษณ์อื่นใดที่สร้างขึ้นให้อยู่ในรูปแบบอิเล็กทรอนิกส์ ซึ่งนำมาใช้ประกอบกับข้อมูลอิเล็กทรอนิกส์ เพื่อแสดงความสัมพันธ์ระหว่างบุคคลกับข้อมูลอิเล็กทรอนิกส์ โดยมีวัตถุประสงค์ เพื่อระบุตัวบุคคลผู้เป็นเจ้าของลายมือชื่ออิเล็กทรอนิกส์ที่เกี่ยวข้องกับข้อมูลอิเล็กทรอนิกส์นั้น และเพื่อแสดงว่าบุคคลดังกล่าวยอมรับข้อความในข้อมูลอิเล็กทรอนิกส์นั้น</p>
                        <p>1.2 ผู้ให้บริการ หมายถึง บริษัทฯ เป็นตัวกลางในการแลกเปลี่ยนสินค้าและบริการทุกประเภทของบริษัทฯ และเพื่อจำหน่ายสินค้าหรือให้บริการรวมถึงการดำเนินการตามแผนการตลาดของบริษัทฯ ภายใต้ขอบเขตของบริษัทฯ</p>
                        <p>1.3 บริษัทฯ หมายถึง บริษัท ทศกัณฐ์ ดิจิตอล นิว เจนเนอเรชั่น จำกัด</p>
                        <p>1.4 ข้อมูลส่วนบุคคล หมายถึง ข้อมูลเกี่ยวกับบุคคลซึ่งทำให้สามารถระบุตัวบุคคลนั้นได้ไม่ว่าทางตรง ทางอ้อม รวมถึงข้อมูลส่วนบุคคลตามกฎหมายเกี่ยวกับการคุ้มครองข้อมูลส่วนบุคคล</p>
                        <p>1.5 ข้อมูลอันเป็นความลับ หมายถึง ข้อมูลส่วนบุคคล ข้อมูลทางการค้า ความลับเชิงพาณิชย์ ข้อมูลที่เป็นความลับหรือทางการค้าเกี่ยวกับบริษัทฯ และคู่สัญญาของบริษัทฯ และข้อมูลที่เป็นความลับอื่นๆทั้งหมดที่บริษัทฯ อาจเปิดเผยแก่คู่ค้า</p>
                        <p>1.6 ทรัพย์สินทางปัญญา หมายถึง สิทธิในทรัพย์สินทางปัญญาทั้งปวงอันรวมถึงแต่ไม่จำกัดเพียง ลิขสิทธิ์ สิทธิบัตร เครื่องหมายทางการค้า เครื่องหมายบริการ ซึ่งทางการค้าหรือการออกแบบ ระบบงานใดที่เกิดจากการสร้างสรรค์ คิดค้น ออกแบบ</p>
                        <p>1.7 เหตุสุดวิสัย หมายถึง เหตุใด ๆ ที่คู่สัญญาไม่อาจป้องกันได้หรือมิได้เกิดจากการกระทำของคู่สัญญานั้น แม้ว่าจะได้ใช้ความระมัดระวังซึ่งบุคคลในภาวะเช่นนั้นจักต้องมีตามวิสัยและพฤติการณ์ตามสมควรอันพึงคาดหมายได้ ซึ่งได้แก่ เหตุที่เกิดจากภัยธรรมชาติ เช่น น้ำท่วม ไฟไหม้ แผ่นดินไหวหรือเกิดจากการใช้อำนาจรัฐหรือการกระทำโดยบุคคลภายนอกหรือปัจจัยภายนอก</p>
                        <p>1.8 สินค้า หมายถึง สินค้าที่เจ้าของสินค้าทำการผลิต หรือนำเข้า หรือสินค้าประเภทอื่น ๆ ที่เกี่ยวข้อง ที่มี ณ ปัจจุบัน หรือจะมีเพิ่มเติมในอนาคต ที่เจ้าของสินค้าฝากให้แก่บริษัทฯ เพื่อจำหน่ายให้แก่ลูกค้าสมาชิก Platform หรือสินค้าที่ทางบริษัทฯ จัดหาหรือผลิตเอง</p>
                        <p>&nbsp;1.9 <a href="https://tossaguns.com/" rel="noopener noreferrer" target="_blank" class="text-blue-600">https://tossaguns.com</a> หมายถึง เว็บไซต์ของบริษัทฯ ในการซื้อขายสินค้าหรือบริการ จัดการธุรกรรม ซื้อขายผลิตภัณฑ์ต่าง ๆ และให้หมายความรวมถึงเว็บไซต์อื่น ๆ ของบริษัทฯ ที่จะมีขึ้นในอนาคตด้วย</p>
                        <p>1.10 ทุกช่องทางของบริษัทฯ หมายถึง ช่องทางออนไลน์อื่นใดที่อยู่ภายใต้เว็บไซต์ของบริษัทฯ หรือภายใต้ ดิจิตอล เวิร์ดกรุ๊ป</p>
                        <p>1.11 ลูกค้า หมายถึง บุคคลธรรมดา ร้านค้าหรือนิติบุคคลทั่วไป ที่ซื้อสินค้าจากเจ้าของสินค้าในลักษณะซื้อ-ขายเสร็จเด็ดขาดบนหน้าเว็บไซต์ <a href="https://tossaguns.com/" rel="noopener noreferrer" target="_blank" class="text-blue-600">https://tossaguns.com</a> หรือทุกช่องทางของบริษัทฯ</p>
                    </div><br>

                    <strong>2) สิทธิ และหน้าที่ของบริษัทฯ</strong>
                    <div class="ml-4 space-y-2">
                        <p>2.1 ในกรณีที่บริษัทฯ จัดให้มีวิธีการชำระเงินซึ่งอาจอำนวยความสะดวกให้ลูกค้าชำระเงินล่วงหน้าสำหรับราคาสินค้าหรือสิ่งอื่นใด คู่ค้ารับทราบและยอมรับว่าบริษัทฯ มีสิทธิที่จะได้รับดอกเบี้ย และ/หรือผลประโยชน์อื่นใดที่เกิดขึ้นจากการที่ลูกค้าได้ชำระไว้ล่วงหน้านั้น (หากมี) ตามข้อกำหนด และเงื่อนไขของวิธีการชำระเงินแต่ละวิธีที่บริษัทฯ จะเป็นผู้กำหนดเป็นครั้งคราวด้วยดุลพินิจของบริษัทฯ แต่เพียงผู้เดียว</p>
                        <p>2.2 กรณีลูกค้าชำระราคาสินค้าผ่านแอปพลิเคชั่น/Platform บริษัทฯ จะนำส่งเงินให้ร้านค้าเป็นยอดรวมของ </p>
                        <div class="ml-4 space-y-2">
                            <p>	(1) ราคาสินค้า (รวมภาษีมูลค่าเพิ่มที่เรียกเก็บในนามของร้านค้า) ที่ Platformได้รับ </p>
                            <p>	(2) หักค่าบริการร้านค้า 25% ของยอดขายสินค้า &nbsp;และ/หรือค่าบริการการส่งเสริมการขายบนแอปพลิเคชัน/ Platform ของบริษัทฯ ที่คู่ค้าต้องชำระให้แก่บริษัทฯ (รวมภาษีมูลค่าเพิ่ม) </p>
                            <p>	(3) หักการคืนเงินใด ๆ ให้แก่ลูกค้า และหนี้ค้างชำระอื่น ๆ (ยอดที่นำส่งสุดท้ายเรียกว่า “กำไร/ ส่วนแบ่งจากสินค้าสุทธิ”) โดยบริษัทฯ จะนำส่งรายได้จากสินค้าหลังจากสรุปยอดภายใน 3 วัน หรือตามข้อตกลงที่คู่ค้าได้ให้ไว้กับบริษัทฯ</p>
                        </div>
                        <p>2.3 บริษัทฯ อาจจะทำหน้าที่ตรวจสอบในเนื้อหาหรือข้อมูลที่คู่ค้านำเสนอบนหน้าแอปพลิเคชัน/ Platform ไม่ว่ากรณีใด ๆ เพื่อให้เป็นการดำเนินการตามระเบียบข้อบังคับทางกฎหมายเกี่ยวกับสินค้านั้น</p>
                        <p>2.4 บริษัทฯ จะไม่รับผิดชอบในบรรดาความบกพร่องอย่างใด ๆ อันเกิดขึ้นกับสินค้า ซึ่งรวมถึงแต่ไม่จำกัดเพียงกรณีที่สินค้าเสียหาย สินค้าบุบสลาย สินค้ามีหนอนแมลง สินค้าเน่าเสียหรือสินค้าที่ส่งกลิ่นเหม็น ทางคู่ค้า/พาร์ทเนอร์ จำต้องเป็นผู้รับผิดชอบในความสินค้าที่เกิดขึ้นทั้งหมด</p>
                    </div><br>

                    <strong>3) สิทธิ และหน้าที่ของคู่ค้า</strong>
                    <div class="ml-4 space-y-2">
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ค้ารับทราบและตกลงว่า ลูกค้าอาจเลือกชำระราคาสินค้าด้วยเงินสด บัตรเครดิต บัตรเดบิต โอนเงินผ่านบัญชีธนาคาร บริการผ่านอินเตอร์เน็ต ชำระเงินออนไลน์หรือวิธีการชำระล่วงหน้าหรือชำระภายหลัง วิธีอื่น ซึ่งอาจกระทำได้ผ่านแอปพลิเคชัน/ Platform ของบริษัทฯ โดยบริษัทฯ จัดให้มีการตกลงในการรับชำระที่ได้รับอนุญาตจากธนาคารแห่งประเทศไทยหรือหน่วยงานที่เกี่ยวข้อง&nbsp;</p>
                        <p>3.1 ในกรณีที่ลูกค้าชำระราคาสินค้าเป็นเงินสด คู่ค้าตกลงชำระค่าบริการ 25% ของยอดขายสินค้า และ/หรือค่าบริการการส่งเสริมการขายบนแอปพลิเคชัน/ Platform ส่วนแบ่งกำไรทางการตลาดให้แก่บริษัทฯ ตามข้อตกลงกัน และ/หรือข้อตกลงทางการค้าเพิ่มเติม </p>
                        <p>3.2 ในกรณีที่คู่ค้าผิดนัดชำระค่าบริการ 25% ของยอดขายสินค้า ค่าบริการส่งเสริมการขายบนแอปพลิเคชัน/ Platform และ/หรือเงินใด ๆ ที่คู่ค้าต้องชำระให้แก่บริษัทฯ คู่ค้าตกลงจะชำระดอกเบี้ยผิดนัดให้แก่บริษัทฯ ในอัตราร้อยละ 15 (สิบห้า) ต่อปีของจำนวนเงินที่ผิดนัดดังกล่าว โดยเริ่มนับตั้งแต่วันแรกที่ผิดนัดจนถึงวันที่บริษัทฯ ได้รับชำระเงินดังกล่าวอย่างถูกต้อง และครบถ้วน</p>
                        <p>คู่ค้าตกลงเสนอขายสินค้าตามที่ได้ให้ข้อมูลไว้และปฏิบัติตามหน้าที่ภายใต้เงื่อนไขและข้อตกลงนี้ รวมถึงการปฏิบัติตาม กฎหมาย และ/หรือความสงบเรียบร้อยต่อศีลธรรมอันดีของประชาชน</p>
                        <p>3.3 คู่ค้าจะไม่เรียกเก็บเงินใด ๆ ที่นอกเหนือจากราคาขายสินค้าจากลูกค้า ซึ่งเป็นการรับผลประโยชน์ส่วนตัว</p>
                        <p>3.4 คู่ค้าตกลงจะแจ้งรายละเอียดและเงื่อนไขเกี่ยวกับสินค้าและช่องทางการติดต่อให้ลูกค้าอย่างชัดเจน คู่ค้ารับทราบ ว่าบริษัทฯ มีหน้าที่เพียงการให้บริการระบบ และอำนวยความสะดวกในการรับชำระเงินจากลูกค้า รับชำระเงินที่มีใบอนุญาตรับชำระเงินเท่านั้น หากลูกค้ามีข้อโต้แย้งใดๆ เกี่ยวกับสินค้า คู่ค้ามีหน้าที่ชี้แจงและแก้ไขปัญหา ข้อผิดพลาด รวมทั้งรับผิดชอบความเสียหายที่เกิดขึ้นแก่ลูกค้าแต่เพียงผู้เดียว</p>
                        <p>3.5 คู่ค้ามีหน้าที่ในการนำเสนอข้อมูลต่าง ๆ ที่จำเป็นบนหน้าแอปพลิเคชัน/ Platform โดยดำเนินการผ่านทางแอปพลิเคชัน/ Platform ร้านค้า ซึ่งรวมถึงข้อมูลของคู่ค้า ดังต่อไปนี้</p>
                        <div class="ml-4 space-y-2">
                            <p>	3.5.1 โลโก้ ภาพถ่าย ราคา และสื่อสิ่งพิมพ์ต่าง ๆ ที่เป็นจริงโดยไม่ผิดหลักข้อบังคับตามกฎหมาย</p>
                            <p>	3.5.2 คู่ค้ารับรองและรับประกันว่า ราคาสินค้าที่ปรากฏบนหน้าแอปพลิเคชัน/ Platform เป็นราคาที่สอดคล้องกับกฎหมายว่าด้วยการควบคุมราคาสินค้าหรือกฎหมายใด ๆ ที่เกี่ยวข้อง และข้อมูลที่โฆษณาบนแอปพลิเคชัน/ Platform ที่เกี่ยวข้องกับคู่ค้า และ/หรือสินค้า เป็นข้อมูลที่ถูกต้อง และสอดคล้องกับกฎหมาย และกฎระเบียบที่เกี่ยวข้องทุกประการ รวมถึงไม่เป็นการละเมิดสิทธิในทรัพย์สินทางปัญญาใด ๆ ของบุคคลภายนอก</p>
                            <p>	3.4.3 คู่ค้าตกลงว่า จะไม่จำหน่ายสินค้าผิดกฎหมายหรือสินค้าใดที่คู่ค้าไม่ได้รับอนุญาตหรือไม่มีใบอนุญาตให้จำหน่ายหรือส่ง หากบริษัทฯ ตรวจพบหรือได้รับแจ้งจากผู้ใดว่ามีการจัดจำหน่ายสินค้าดังกล่าว คู่ค้าตกลงให้บริษัทฯ มีสิทธิในการดำเนินการใด ๆ กับคู่ค้า ซึ่งรวมถึงแต่ไม่จำกัดเพียง การถอดสินค้ารายการนั้นออกจากร้านค้า การปิดร้านค้าในแอปพลิเคชันรวมถึงการเรียกร้องค่าเสียหายอย่างใด ๆ ที่เกิดขึ้นต่อบริษัทฯ อันเนื่องมาจากการจัดจำหน่ายสินค้าดังกล่าว</p>
                            <p>	3.4.4 หากมีความเปลี่ยนแปลงใด ๆ เกี่ยวกับใบอนุญาตใด ๆ ที่เกี่ยวข้องกับการประกอบธุรกิจ/ ประกอบกิจการของร้านค้า คู่ค้าจะแจ้งให้บริษัทฯ ทราบโดยทันที (และไม่ว่ากรณีใด ต้องไม่เกิน 24 ชั่วโมงนับแต่การเปลี่ยนแปลงดังกล่าว)</p>
                            <p>	3.4.5 คู่ค้าจะทำให้แน่ใจว่าสินค้ามีคุณภาพสูง และการจัดเก็บ การผลิต และการตระเตรียมเป็นไปตามกฎหมาย และระเบียบที่เกี่ยวข้องกับความปลอดภัย และกฎระเบียบอื่นที่เกี่ยวข้อง หากพบว่ามีการฝ่าฝืนกฎหมายหรือระเบียบดังกล่าว คู่ค้าต้องแจ้งให้บริษัทฯ ทราบทันที</p>
                            <p>	3.4.6 คู่ค้าจะทำให้แน่ใจว่าตลอดระยะเวลาที่ทำธุรกิจร่วม บริษัทฯ มีสิทธิในการตรวจสอบ ค้นหาข้อมูล และพิจารณาสินค้า ตามเห็นชอบของบริษัทฯ</p>
                            <p>	3.4.7 คู่ค้ามีหน้าที่ต้องรักษาคุณภาพ และปริมาณของสินค้าให้เป็นไปตามที่ได้โฆษณาอย่างสุดความสามารถ</p>
                        </div>
                    </div><br>

                    <strong>4) การเตรียมสินค้า</strong>
                    <div class="ml-4 space-y-2">
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ในกรณีทั่วไป คู่จะตกลงเตรียมสินค้าให้กับลูกค้าที่ถึงร้านค้าแล้วเท่านั้น หรือได้ทำข้อตกลงในการซื้อขายสินค้า โดยบริษัทฯ ดำเนินการใด ๆ ที่จำเป็น และเป็นที่น่าพอใจในการอำนวยความสะดวกแก่ลูกค้าในการรับสินค้า</p>
                        <p>4.1 คู่ค้าจะรับผิดชอบในค่าใช้จ่ายใด ๆ ที่เกี่ยวข้องกับการคืนเงินให้ลูกค้า ในกรณีที่ลูกค้าร้องขอการคืนเงินหรือร้องเรียนเกี่ยวกับสินค้า ไม่ว่าทั้งหมดหรือแต่บางส่วน (รวมถึงแต่ไม่จำกัดอยู่เพียงค่าใช้จ่ายใด ๆ ที่เกี่ยวข้องกับการเรียกคืนสินค้านั้น ๆ)&nbsp;&nbsp;(หากมี) ด้วยเหตุผลที่ตามตกลงกันระหว่างคู่ค้า และลูกค้า</p>
                        <p>4.2 คู่ค้าให้ความยินยอมแก่บริษัทฯ ในการดำเนินการใด ๆ ซึ่งเกี่ยวกับการวางสื่อทางการตลาด การโฆษณาของบริษัทฯ การให้บริการ และการให้ข้อมูลที่เกี่ยวข้องใด ๆ ในแอปพลิเคชัน/ Platform และ/หรือสถานที่อื่นใดของคู่ค้า (ตามรายละเอียดที่จะตกลงร่วมกันโดยคู่สัญญาทั้งสองฝ่าย) โดยไม่คิดค่าใช้จ่ายใด ๆ</p>
                        <p>4.3 หากลูกค้าตรวจพบเกี่ยวกับความไม่ครบถ้วนถูกต้องตามคำสั่งซื้อหรือความบกพร่องของสินค้า คู่ค้ายินดีที่จะเปลี่ยนสินค้าเป็นสินค้าคุณภาพดีให้กับลูกค้า โดยคู่ค้ายินดีที่จะรับผิดชอบค่าใช้จ่ายที่เกิดขึ้นเกี่ยวกับการเปลี่ยนสินค้า แต่เพียงผู้เดียว</p>
                    </div><br>

                    <strong>5) การตลาด</strong>
                    <div class="ml-4 space-y-2">
                        <p>5.1 คู่สัญญาฝ่ายใดฝ่ายหนึ่งอาจจัดกิจกรรมการตลาด และโฆษณาที่เกี่ยวข้องกับสินค้าตามที่คู่สัญญาทั้งสองฝ่ายได้ตกลงร่วมกัน โดยกิจกรรมดังกล่าวอาจมีขึ้นผ่านช่องทางใด ๆ เช่น โซเซียลมีเดีย เว็บไซต์หรือบล็อค เพื่อขจัดข้อสงสัยบริษัทฯ อาจจัดการส่งเสริมการขายให้แก่ลูกค้าด้วยค่าใช้จ่ายของบริษัทฯ เอง เพื่อสนับสนุนธุรกิจ และบริการของคู่สัญญาทั้งสองฝ่ายตามที่กำหนดไว้ในข้อกำหนด และเงื่อนไขทั่วไปนี้</p>
                        <p>5.2 คู่ค้าตกลงเปิดเผยรายละเอียดโปรโมชั่น และ/หรือรายการส่งเสริมการขายต่าง ๆ ให้แก่บริษัทฯ (รวมถึงแต่ไม่จำกัดเฉพาะรายการที่ลดราคา รายละเอียดการส่งเสริมการขาย) เพื่อการทำการตลาด และวัตถุประสงค์ในการส่งเสริมการขายใด ๆ ผ่านแอปพลิเคชัน/ Platform</p>
                        <p>5.3 คู่ค้าให้ความยินยอมแก่บริษัทฯ ในการใช้สิทธิในทรัพย์สินทางปัญญาของคู่ค้า และ/หรือที่คู่ค้ามีสิทธิใช้ และดำเนินการด้วยค่าใช้จ่ายของคู่ค้า ในการจะส่งภาพถ่ายของสินค้าใด ๆ ให้แก่บริษัทฯ ตามที่บริษัทฯ ร้องขอ เพื่อใช้ในแอปพลิเคชัน/ Platform</p>
                    </div><br>

                    <strong>6) ภาษี</strong>
                    <p class="ml-4 space-y-2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;คู่สัญญาแต่ละฝ่ายจะรับผิดชอบในค่าภาษีใด ๆ ของตนที่เกิดขึ้นจากการเข้าทำและปฏิบัติตามหน้าที่ ตามข้อกำหนด และเงื่อนไขของสัญญาร้านค้า ข้อตกลงทางการค้าเพิ่มเติม และ/หรือข้อกำหนด และเงื่อนไขทั่วไปของสัญญาคู่ค้า เว้นแต่ ภาษีมูลค่าเพิ่ม ภาษีหัก ณ ที่จ่าย ซึ่งให้คู่ค้าเป็นผู้รับผิดชอบ เพื่อให้สิ้นข้อสงสัย จำนวนของค่าบริการที่พึงชำระให้แก่บริษัทฯ นั้น จะเป็นจำนวนที่รวมภาษีมูลค่าเพิ่ม ในกรณีที่คู่ค้าหักภาษี ณ ที่จ่าย คู่ค้ามีหน้าที่ออก และมอบหนังสือรับรองภาษีหัก ณ ที่จ่ายให้แก่บริษัทฯ ภายใน 30 (สามสิบ) วัน</p>
                    <br>

                    <strong>7) การส่งมอบเงินค่าสินค้า และส่วนแบ่งรายได้</strong>
                    <div class="ml-4 space-y-2">
                        <p >7.1 คู่ค้าตกลงจ่ายส่วนแบ่งรายได้ในการดำเนินการจำหน่ายสินค้าให้กับบริษัทฯ ในอัตราตามตกลงของราคาจำหน่ายหรือตกลงเป็นอย่างอื่นตามแนบท้ายเอกสารเพิ่มเติม (ถ้ามี)</p>
                        <p >7.2 บริษัทฯ และคู่ค้าจะทำการสรุปยอดขายรวมกันทุก ๆ วันโดยระบบจะเป็นผู้คำนวณ และออก Report ให้กับคู่ค้าในแต่ละวัน หากไม่มีข้อพิพาท </p>
                        <p >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;กรณีที่ลูกค้าชำระราคาสินค้าเป็นเงินสด คู่ค้าต้องโอนค่าบริการร้านค้า 25% ของยอดขายสินค้า &nbsp;และ/หรือค่าบริการการส่งเสริมการขายบนแอปพลิเคชัน/ Platform ให้แก่บริษัทฯ หลังจากสรุปยอดภายใน 3 วัน หรือ</p>
                        <p >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;กรณีที่ลูกค้าชำระราคาสินค้าผ่านแอปพลิเคชัน/ Platform บริษัทฯ จะโอนยอดขายของสินค้า โดยหักค่าบริการร้านค้า 25% และ/หรือค่าบริการการส่งเสริมการขายบนแอปพลิเคชัน/ Platform&nbsp;ให้แก่คู่ค้า หลังจากสรุปยอดภายใน 3 วัน</p>
                    </div><br>

                    <strong>8) การปฏิเสธความรับผิด</strong>
                    <div class="ml-4 space-y-2">
                        <p>8.1 ทางบริษัทฯ ไม่มีความเกี่ยวข้องใด ๆ สำหรับช่องทางการจำหน่ายของคู่ค้า รวมถึงการนำเสนอหรือการให้ข้อมูลต่อสาธารณชนเพื่อจำหน่ายหรือประชาสัมพันธ์ อันเป็นการละเมิดต่อข้อบังคับของบริษัทฯ อันที่เกิดขึ้นนอกเหนือแอปพลิเคชัน/ Platform</p>
                        <p>8.2 บริษัทฯ เป็นเพียงตัวแทนการชำระเงิน และบริษัทฯ ไม่ทราบถึงข้อตกลงที่ทำขึ้นหรือสิทธิ ข้อผูกพันใด ๆ ระหว่างผู้บริโภคหรือผู้เรียกเก็บเงิน บริษัทฯ ไม่ต้องรับผิดชอบสำหรับความเสียหายที่เกิดขึ้นจากการละเมิดข้อตกลงระหว่างผู้บริโภคกับผู้เรียกเก็บเงิน คู่ค้ารับทราบและตกลงว่าเป็นความรับผิดชอบของคู่ค้าแต่เพียงผู้เดียว</p>
                        <p>8.3 หากความผิดพลาด ล่าช้า ไม่ว่าจะเกิดขึ้นจากระบบคอมพิวเตอร์ ระบบอินเตอร์เน็ต อุปกรณ์อิเล็กทรอนิกส์ต่าง ๆ ระบบแอปพลิเคชัน/ Platform ของทางบริษัทฯ ระบบขนส่งหรือระบบอื่นใดที่เกี่ยวข้องกับการให้บริการ ไม่ว่าจะเกิดเหตุใด ๆ คู่ค้าตกลงจะไม่ยกเอาเหตุขัดข้องดังกล่าวมาเป็นข้อเรียกร้องค่าเสียหายใด ๆ จากบริษัทฯ</p>
                    </div><br>

                    <strong>9) ความลับทางการค้า</strong>
                    <p class="ml-4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ในการเข้าทำสัญญาฉบับนี้ คู่สัญญาแต่ละฝ่ายอาจได้ล่วงรู้หรือได้รับข้อมูลของคู่สัญญาอีกฝ่ายหนึ่ง ไม่ว่าจากคู่สัญญาอีกฝ่ายหนึ่งนั้นเองหรือจากบุคคลอื่นใด คู่สัญญาแต่ละฝ่ายต่างตกลงจะเก็บรักษาข้อมูลของคู่สัญญาอีกฝ่ายไว้เป็นความลับ ไม่ว่าจะเป็นข้อมูลส่วนบุคคลหรือข้อมูลทางการค้า และไม่ว่าจะมีมูลค่าหรือไม่ก็ตาม และจะไม่เปิดเผย ตีพิมพ์ ประกาศ รับรอง หรือเผยแพร่ต่อบุคคลที่สาม ไม่ว่า ณ เวลาใด และไม่ว่าสัญญาฉบับนี้จะสิ้นสุดลงแล้วหรือไม่ก็ตาม</p>
                    <br>

                    <strong>10) การโอนสิทธิ</strong>
                    <p class="ml-4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;เว้นแต่จะได้กำหนดไว้เป็นอย่างอื่นในสัญญานี้ คู่สัญญาแต่ละฝ่ายจะไม่โอนสิทธิ หน้าที่ และความรับผิดชอบตามสัญญาฉบับนี้ให้แก่บุคคลใดโดยมิได้รับความยินยอมเป็นลายลักษณ์อักษรจากคู่สัญญาอีกฝ่ายเป็นการล่วงหน้า ไม่ว่ากรณีใด ๆ คู่ค้าตกลงจะไม่โอนสิทธิ และหน้าที่ตามสัญญาฉบับนี้ไม่ว่าทั้งหมดหรือบางส่วนให้แก่บุคคลที่สาม</p>
                    <br>

                    <strong>11) โมฆะกรรมแยกส่วน</strong>
                    <p class="ml-4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;หากมีข้อความหรือข้อตกลงใดในสัญญาฉบับนี้ตกเป็นโมฆะ ไม่สมบูรณ์หรือไม่มีผลบังคับใช้ ไม่ว่าด้วยเหตุใด ๆ ก็ตาม คู่สัญญาตกลงให้ข้อความ และข้อตกลงอื่น ๆ ในสัญญาฉบับนี้ยังคงมีผลสมบูรณ์ ผูกพันธ์คู่สัญญาเสมือนหนึ่งว่าไม่มีส่วนที่เป็นโมฆะ ไม่สมบูรณ์หรือส่วนที่ไม่มีผลบังคับใช้อยู่ในสัญญาฉบับนี้</p>
                    <br>

                    <strong>12) การแก้ไข เปลี่ยนแปลง ปรับปรุง ระบบทุกรูปแบบ</strong>
                    <div class="ml-4 space-y-2">
                        <p>12.1 บริษัทฯ มีสิทธิ์อนุมัติ เปลี่ยนแปลง แก้ไข ยกเลิก ระบบบริหารจัดการ/ โปรแกรมออนไลน์ ระบบบัญชีผู้บริหารงานจัดการออนไลน์ และระบบบริหารจัดการศูนย์ฯ ทุกรูปแบบ โดยไม่จำเป็นต้องแจ้งให้คู่ค้าทราบล่วงหน้า และการที่คู่ค้าได้ใช้งานระบบได้ทำการแก้ไขเรียบร้อยแล้วนั้น ถือเป็นการยอมรับการแก้ไขในครั้งนั้นแล้ว เว้นแต่บริษัทฯ ได้ตกลงอันนอกเหนือสัญญากับคู่ค้าอื่นไป</p>
                        <p>12.2 บริษัทฯ ขอสงวนสิทธิ์ในการปรับปรุง หรือยกเลิกบริการ หรือส่วนใดส่วนหนึ่งของบริการ ไม่ว่าจะชั่วคราวหรือตลอดไปได้ตลอดเวลา โดยบริษัทฯ จะแจ้งล่วงหน้าให้ทราบหรือไม่ก็ได้ แต่ทั้งนี้การยกเลิก หรือการระงับบริการ หรือส่วนใดส่วนหนึ่งของบริษัทฯ ย่อมไม่กระทบถึงหนี้ใด ๆ ที่คู่ค้ายังคงค้างชำระอยู่กับบริษัทฯ รวมทั้งไม่เป็นการลบล้างสิทธิหรือความรับผิดใด ๆ ที่บริษัทฯ และคู่ค้ามีอยู่ หรือได้เกิดขึ้นก่อนวันที่มีผลของการยกเลิก หรือการระงับบริการ หรือส่วนหนึ่งส่วนใดของบริการดังกล่าว</p>
                    </div><br>

                    <strong>13) การยกเลิกสัญญา</strong>
                    <div class="ml-4 space-y-2">
                        <p>13.1 หากคู่สัญญาฝ่ายหนึ่งฝ่ายใดประสงค์จะบอกเลิกสัญญา จะต้องทำเป็นหนังสือแจ้งความประสงค์ล่วงหน้าแก่คู่สัญญาอีกฝ่ายหนึ่งไม่น้อยกว่า 30 วัน โดยฝ่ายที่ถูกกระทำละเมิดมีสิทธิเรียกร้องค่าใช้จ่ายหรือค่าเสียหายได้</p>
                        <p>13.2 สัญญาฉบับนี้ถูกยกเลิก หรือร้านค้ากระทำความผิดตามสัญญาข้อหนึ่งข้อใด บริษัทฯ มีสิทธิ์บอกเลิกสัญญาทันที และคู่ค้าตกลงจะเป็นผู้รับผิดชอบในความเสียหายที่เกิดขึ้นทั้งหมด โดยบริษัทฯ จะไม่รับผิดชอบความเสียหายที่เกิดขึ้นกับสินค้าทุกกรณี</p>
                    </div><br>

                    <strong>14) การแก้ไขเพิ่มเติม</strong>
                    <p class="ml-4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;บริษัทฯ ขอสงวนสิทธิ์ในการแก้ไขเพิ่มเติมข้อกำหนด และเงื่อนไขเหล่านี้ ณ เวลาใดก็ได้ ข้อแก้ไขเพิ่มเติมต่อเงื่อนไขเหล่านี้จะประกาศไว้ในแอปพลิเคชัน/ Platform ของบริษัทฯ อย่างไรก็ตามการใช้บริการกับบริษัทฯ ต่อไปจะถือว่าเป็นการยอมรับเงื่อนไขใหม่ เมื่อร้านค้าใช้บริการกับแพลตฟอร์มของบริษัทฯ บริษัทฯ ตกลงว่าคู่ค้ากระทำการดังกล่าวภายใต้เงื่อนไขเหล่านี้ที่เป็นปัจจุบันขณะนั้น ณ วันที่ร้านค้าใช้บริการ</p>
                    <br>

                    <strong>15) กฎหมายที่บังคับใช้</strong>
                    <div class="ml-4 space-y-2">
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ทั้งนี้ ในกรณีที่ไม่สามารถหาข้อยุติในข้อพิพาทดังกล่าวระหว่างคู่สัญญาทั้งสองฝ่ายได้ ข้อพิพาท ข้อโต้เถียง ข้อขัดแย้งใด ๆ อันเนื่องมาจากสัญญาฉบับนี้ หากคู่สัญญาไม่สามารถตกลงกันได้ คู่สัญญาตกลงจะนำข้อพิพาทดังกล่าวขึ้นฟ้องต่อศาลในประเทศไทย</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;สัญญาฉบับนี้ทำขึ้นสองฉบับมีข้อความถูกต้องตรงกัน คู่สัญญาแต่ละฝ่ายได้อ่านโดยตลอดแล้วยืนยันว่าถูกต้องตามเจตนา จึงได้ลงลายมือชื่อไว้เป็นสำคัญ</p>
                        <p><span class="font-semibold text-error">หมายเหตุ :</span> พระราชบัญญัติ ว่าด้วยธุรกรรมทางอิเล็กทรอนิกส์ พ.ศ. ๒๕๔๔ ที่แก้ไขเพิ่มเติม (ฉบับที่ 3) พ.ศ.2562 ถือว่า การเข้าสู่ระบบโดยใช้ชื่อผู้ใช้ ( username ) และรหัสผ่าน ( password ) เข้าสู่ระบบ และมีการยอมรับเงื่อนไข และข้อตกลงในระบบ ถือว่าสัญญาฉบับนี้สมบูรณ์</p>
                    </div>
                </div>
            </div>

            <!-- Modal Footer -->
            <div
                class="flex flex-col justify-center p-4 md:p-5 border-t border-gray-200 rounded-b ">
                <span class="font-sarabun">ยินยอมเมื่อ xx/xx/xxxx xx:xx:xx </span>
                <div class="flex justify-center items-center w-full">
                    <button @click="closeModal" type="button"
                        class="text-white font-sarabun bg-red-500 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        ปิด
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!-- End Main modals -->
</template>

<script>
export default {
    props: {
    isVisible: Boolean,
    contractDetails: String
  },
  methods: {
    closeModal() {
      this.$emit('close'); // Emit close event to parent
    }
  }
}
</script>

<style></style>