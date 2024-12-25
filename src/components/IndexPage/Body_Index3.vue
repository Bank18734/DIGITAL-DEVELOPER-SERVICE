<template>
    <div class="flex flex-wrap items-center justify-between mx-[10%] mb-6 gap-4">
        <!-- OUR PARTNERS -->
        <div class="w-full sm:w-auto text-center sm:text-left">
            <p class="text-2xl sm:text-3xl lg:text-4xl text-[#001f54] font-bowlby">OUR PARTNERS</p>
        </div>

        <!-- JOIN US -->
        <div class="w-full sm:w-auto text-right hidden sm:block">
            <!-- ใช้ hidden และ sm:block เพื่อซ่อนปุ่มในหน้าจอเล็ก -->
            <button class="flex items-center justify-center gap-2 text-[#001f54] hover:text-[#ffd700] duration-300">
                <p class="font-bowlby sm:text-xl" @click="$router.push({ name: 'login' })">JOIN US</p>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: "Body_Index3",
};
</script>

<style scoped>
button {
    padding: 0;
    margin: 0;
    border: none;
    background: none;
    cursor: pointer;
}

button {
    --primary-color: #001f54;
    --hovered-color: #ffd700;
    position: relative;
    display: flex;
    font-weight: 400;
    font-size: 10px;
    gap: 0.5rem;
    align-items: center;
}

button p {
    margin: 0;
    position: relative;
    font-size: 20px;
    color: var(--primary-color);
}

button::after {
    position: absolute;
    content: "";
    width: 0;
    left: 0;
    bottom: -2px;
    background: var(--hovered-color);
    height: 2px;
    transition: 0.3s ease-out;
}

button p::before {
    position: absolute;
    content: "";
    width: 0%;
    inset: 0;
    color: var(--hovered-color);
    overflow: hidden;
    transition: 0.3s ease-out;
}

button:hover::after {
    width: 100%;
}

button:hover p::before {
    width: 100%;
}

button:hover svg {
    transform: translateX(4px);
    color: var(--hovered-color);
}

button svg {
    color: var(--primary-color);
    transition: 0.2s;
    position: relative;
    width: 15px;
    transition-delay: 0.2s;
}
</style>
