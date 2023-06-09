<template>
    <div class="2xl:container 2xl:mx-auto">
        <div class="py-10 px-0">
            <div class="flex float-left mb-4">
                <!-- filters Button (md and plus Screen) -->
                <button @click="showFilters()" class="cursor-pointer dark:bg-white dark:text-gray-800 text-white dark:hover:bg-gray-100 sm:flex hidden hover:bg-gray-700 focus:ring focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-4 px-6 bg-gray-800 flex text-base leading-4 font-normal text-white justify-center items-center">
                    <FilterIcon/>
                    Filters
                </button>
            </div>
        </div>

        <div v-if="showFilter" id="filterSection" class="block relative md:py-10 lg:px-20 md:px-6 py-9 px-4 bg-gray-50 dark:bg-gray-800 w-full mt-9">
            <!-- Close button -->
            <div @click="closeFilter()" class="cursor-pointer text-gray-800 dark:text-white absolute right-0 top-0 md:py-10 lg:px-20 md:px-6 py-9 px-4">
                <FilterCloseIcon />
            </div>

            <!-- Types Section -->
            <div>
                <div class="flex space-x-2 text-gray-800 dark:text-white">
                    <TypeIcon/>
                    <p class="lg:text-2xl text-xl lg:leading-6 leading-5 font-medium">Types</p>
                </div>
                <div  class="md:flex md:space-x-6 mt-8 grid grid-cols-3 gap-y-8 flex-wrap">
                    <div v-for="type in typeStore.types" :key="type.id" class="flex items-center mb-4">
                        <input @click="selectType(type.name)"  :id="type.name" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label name="default-radio" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{ type.name }}</label>
                    </div>
                   
                </div>
            </div>

            <hr class="bg-gray-200 lg:w-6/12 w-full md:my-10 my-8" />

            <!-- Sizes Section -->
            <div>
                <div class="flex space-x-2 text-gray-800 dark:text-white">
                    <SizeIcon/>
                    <p class="lg:text-2xl text-xl lg:leading-6 leading-5 font-medium ">Sizes</p>
                </div>
                <div  class="md:flex md:space-x-6 mt-8 grid grid-cols-3 gap-y-8 flex-wrap">
                    <div v-for="size in sizeStore.sizes" :key="size.id" class="flex md:justify-center md:items-center items-center justify-start">
                        <input @click="addSize(size.id)" class="w-4 h-4 mr-2" type="checkbox" :id="size.name" :name="size.name" />
                        <div class="inline-block">
                            <div class="flex space-x-6 justify-center items-center">
                            <label class="mr-2 text-sm leading-3 font-normal text-gray-600 dark:text-gray-300" :for="size.name">{{ size.name }}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <hr class="bg-gray-200 lg:w-6/12 w-full md:my-10 my-8" />

            <!-- Price Section -->
            <div>
            <div class="flex space-x-2 text-gray-800 dark:text-white ">
                <p class="lg:text-2xl text-xl lg:leading-6 leading-5 font-medium ">Price</p>
            </div>
            <div class="flex mt-8 space-x-8">
                <div class="flex justify-center items-center">
                    <input class="w-20 h-7 mr-2 border-black-500 border-2" type="number" 
                            id="min" name="min" 
                            placeholder="From" 
                            v-model="minPrice"
                    />
                </div>
                <div class="flex justify-center items-center">
                    <input class="w-20 h-7 mr-2 border-black-500 border-2" type="number"
                            id="max" name="max" 
                            placeholder="To"
                            v-model="maxPrice" 
                    />
                </div>
                <div v-show="showPriceError" class="text-red-6 text-sm flex items-center space-x-2 mt-1">
                    <div i="carbon-warning" />
                    <span>{{ priceErrorMsg }}</span>
                </div>
            </div>
            </div>

            <!-- Apply Filter Button (Large Screen) -->

            <div class="hidden md:block absolute right-0 bottom-0 md:py-10 lg:px-20 md:px-6 py-9 px-4">
            <button @click="applyFilters()" class="hover:bg-gray-700 dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:ring focus:ring-offset-2 focus:ring-gray-800 text-base leading-4 font-medium py-4 px-10 text-white bg-gray-800">Apply Filter</button>
            </div>

            <!-- Apply Filter Button (Table or lower Screen) -->

            <div class="block md:hidden w-full mt-10">
            <button @click="applyFilters()" class="w-50 hover:bg-gray-700 dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:ring focus:ring-offset-2 focus:ring-gray-800 text-base leading-4 font-medium py-4 px-10 text-white bg-gray-800">Apply Filter</button>
            </div>
        </div>
    </div>    
</template>

<script setup lang="ts">
    const showFilter= ref(false)
    const minPrice= ref(0)
    const maxPrice= ref(0)
    const sizes= ref<number[]>([]);
    const selectedType= ref("")
    const filters: { [key: string]: any } = reactive({});
    const priceErrorMsg = ref("")
    const showPriceError = ref(false)
    
    const emit = defineEmits(["filters"]);
    const typeStore= useTypeStore();
    const sizeStore= useSizeStore();

    onBeforeMount(async () => {
        await typeStore.getAllTypes();
        await sizeStore.getAllSizes();
    });

    const showFilters= () => {
        showFilter.value= true;
    };

    const selectType= (name :string)=>{
        selectedType.value= name;
    };

    function validatePrice(): boolean{
        resetErrors();
         // Validate price
        let priceRegex =  /^\d+$/

        if (!priceRegex.test(String(minPrice.value)) || !priceRegex.test(String(maxPrice.value))) {
            showPriceError.value = true
            priceErrorMsg.value = productErrorMessages.priceRangeInvalid
        }

        return !showPriceError.value
    }

    function resetErrors() {
        showPriceError.value = false
    }

    const applyFilters= () => {
        if(selectedType.value){
            filters['type']=  selectedType.value;
        }
        console.log(maxPrice.value, minPrice.value);
        if(maxPrice.value && validatePrice()){
            filters['price']=   minPrice.value+','+maxPrice.value;
        }

        if(sizes.value.length){
            filters['sizes']=  JSON.stringify(sizes.value);
        }

        emit("filters", filters);
    };
  
    const closeFilter= ()=> {
        showFilter.value= false;
    };

    const addSize = (id: number)=>{
        if(sizes.value.includes(id)){
            const index = sizes.value.indexOf(id);
            sizes.value.splice(index, 1);
        }else{
            sizes.value.push(id);
        }
    };

</script>