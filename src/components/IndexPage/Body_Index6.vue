<template>
    <div class="max-w-7xl mx-auto bg-gray-50 shadow-lg flex flex-col md:flex-row">
        <!-- ซ้าย: Google Map -->
        <div class="w-full md:w-2/3 h-96 bg-gray-300">
            <iframe
                class="w-full h-96"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15112.354945724917!2d98.940896!3d18.749573!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30da31c03fc4c397%3A0x977f32ad0cefd709!2z4Lia4Lij4Li04Lip4Lix4LiXIOC4lOC4tOC4iOC4tOC4leC4reC4pSDguJTguLTguYDguKfguKXguKXguYfguK3guJvguYDguJvguK3guKPguYwg4LmA4LiL4Lit4Lij4LmM4Lin4Li04LiqIOC5gOC4i-C5h-C4meC5gOC4leC4reC4o-C5jA!5e0!3m2!1sth!2sth!4v1732174126745!5m2!1sth!2sth"
                width="600"
                height="450"
                style="border: 0;"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>

        <!-- ขวา: Contact Us -->
        <div class="w-full md:w-1/3 p-10">
            <p class="text-4xl font-bowlby text-[#001f54]">CONTACT US</p>
            <div class="mt-1 border-t-[1.5px] border-[#001f54] mx-auto mb-4"></div>
            <ul class="mt-4 space-y-6">
                <!-- LINE -->
                <li class="flex items-center gap-x-4">
                    <svg
                        role="img"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-12 w-12 fill-[#0047ab]"
                    >
                        <title>LINE</title>
                        <path
                            d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"
                        />
                    </svg>
                    <p class="font-semibold text-gray-500 text-lg">ID LINE : @ddsc89988</p>
                </li>

                <!-- Call -->
                <li class="flex items-center gap-x-4">
                    <svg
                        role="img"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-12 w-12 fill-[#0047ab]"
                    >
                        <title>Call</title>
                        <path
                            d="M16.434.001a.826.826 0 00-.164.008l-3.423.543a2.635 2.635 0 01-2.189 3.01 2.629 2.629 0 01-3.01-2.185l-3.417.538a.818.818 0 00-.677.931l3.24 20.467a.818.818 0 00.931.677l3.423-.543a2.635 2.635 0 012.189-3.01 2.629 2.629 0 013.01 2.185l3.422-.543a.818.818 0 00.677-.93L17.2.685a.816.816 0 00-.767-.685zm-3.22 6.534c.066 0 .128.005.185.017.423.09.975.6 1.315.955.178.187.192.519.048.73l-1.228 1.795a.89.89 0 01-.437.283c-.504.125-1.248-.95-1.771 1.507-.524 2.458.59 1.776 1.003 2.098a.828.828 0 01.283.437l.394 2.14a.613.613 0 01-.341.649c-.456.182-1.167.427-1.589.336-.907-.192-2.342-2.4-1.57-6.044.725-3.415 2.71-4.89 3.708-4.903Z"
                        />
                    </svg>
                    <p class="font-semibold text-gray-500 text-lg">052-083288</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
@media (min-width: 768px) {
  .flex {
    flex-direction: row;
  }
}
</style>
