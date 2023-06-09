<template>
    <main class="flex items-center body-font h-full bg-gradient-to-br bg-blue-500">
        <div class="container px-5 mx-auto">
            <div class="lg:w-4/5 p-4 mx-auto flex flex-wrap shadow-xl rounded-xl bg-gray-50">
                <div
                    class="lg:flex justify-center items-center hidden lg:w-1/2 w-full lg:h-auto h-64 border-r-1  border-gray-100">
                    <span class="bg-clip-text select-none text-5xl font-bold">
                        Products Store
                    </span>
                </div>
                <RouterView />
            </div>
        </div>
    </main>
</template>