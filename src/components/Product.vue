<!-- eslint-disable @typescript-eslint/semi -->
<script setup lang="ts">
const props = defineProps(["headers", "data", "actions"]);
const emits = defineEmits([
  "delete",
  "edit",
  "filters",
  "getdata",
]);

const filters: { [key: string]: any } = reactive({});

// delete
const showModal = ref(false);
const idToDelete = ref(0);
const ToggelModal = (id?: number) => {
  showModal.value = !showModal.value;
  idToDelete.value = id;
};
const remove = () => emits("delete", idToDelete.value);
onBeforeMount(() => {
//   props.headers.forEach((item: { attribute: string }) => {
//     filters[item.attribute] = "";
//   });
});

const search = useDebounceFn((filters: any) => {
  emits("filters", filters);
}, 500);
</script>

<template>
    <div class="relative mb-4 flex w-full flex-wrap items-stretch">
        <input
        v-model="filters['name']"
        @change="search(filters)"
        type="search"
        class="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"      placeholder="Search"
        aria-label="Search"
        aria-describedby="button-addon1" 
        />
        <!--Search button-->
        <button
        @click="search(filters)"
        class="relative z-[2] flex items-center rounded-r bg-blue-500 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
        type="button"
        id="button-addon1"
        data-te-ripple-init
        data-te-ripple-color="light">
        <SearchIcon/>
        </button>
    </div>
    <div v-if="props.data" class="container m-auto grid grid-cols-3 gap-4">
        <div v-for="data in props.data" :key="data.id" class="max-w-5xl px-10 py-6 bg-white rounded-lg shadow-md mb-3">
            <div class="flex justify-between items-center">
                <span class="font-light text-gray-600">{{ data.date }}</span>
            </div>
            <div class="mt-2  cursor-default">
                <p class="text-2xl text-gray-700 font-bold">{{ data.name }}</p>
                <p class="mt-2 text-gray-500">{{ data.description.substring(0, 100) }}...</p>
            </div>
            <div class="mt-2">
                <ul class="flex text-sm items-center gap-4">
                    <!--  Sizes -->
                    <li v-for="size in data.sizes" :key="size.id" class="pagination-li  cursor-default">
                        <div
                            class=" leading-tight border px-3 py-1 border-1 border-black shadow bg-blue-500 border-blue-500 text-white"
                        >
                            {{ size.name }}
                        </div>
                    </li>
                </ul>
            </div>
            <div class="flex items-center mt-4 cursor-default">
                <p class="mt-2 text-black-500">Price:</p>
                <p class="mt-2 ml-2 text-black-500 font-normal">{{ data.price }} $</p>
            </div>
            <div class="flex justify-between items-center mt-4">
                <div class="px-2 py-1 bg-gray-300 text-black font-normal rounded cursor-default">
                    {{ data.type.name }}
                </div>
                <div v-if="props.actions == true"  class="justify-between text-center sm:block">
                        <button @click="emits('edit', data.id)">
                            <EditIcon />
                        </button>
                        <button @click="ToggelModal(data.id)">
                            <DeleteIcon />
                        </button>
                </div>
                <!-- <img class="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block" :src="data.image" alt="avatar"> -->
            </div>
        </div>
        <ConfirmationModal
        v-if="showModal && props.actions == true"
        message="Are you sure you want to delete this product ?? "
        @confirm="remove"
        @cancel="ToggelModal"
        />
    </div>
</template>
