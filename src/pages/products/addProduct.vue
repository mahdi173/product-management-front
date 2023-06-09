<script setup lang="ts">
import { reactive } from "vue";

const router = useRouter();
const productStore = useProductStore();
const typeStore= useTypeStore();
const sizeStore= useSizeStore();
const sizes= ref<number[]>([]);

const createdProduct = reactive({
  name: "",
  description: "",
  price: 0,
  type_id: 1,
  sizes: sizes.value
});

// Error handling
const nameErrorMsg = ref("")
const priceErrorMsg = ref("")

const showNameError = ref(false)
const showPriceError = ref(false)

// Methods :
function resetErrors() {
    showNameError.value = false
    showPriceError.value = false
}

function validateCredentials(): boolean {
    resetErrors()
    // Validate name
    if (!createdProduct.name.length) {
        showNameError.value = true
        nameErrorMsg.value = productErrorMessages.nameRequired

    }else if(createdProduct.name.length<5){
        showNameError.value = true
        nameErrorMsg.value = productErrorMessages.nameMin
    }
    // Validate price
    let priceRegex =  /^\d*(\.\d+)?$/

   if (!priceRegex.test(String(createdProduct.price))) {
        showPriceError.value = true
        priceErrorMsg.value = productErrorMessages.priceInvalid
    }

    return !showNameError.value && !showPriceError.value
}

const resetFormInputs = () => {
  createdProduct.name = "";
  createdProduct.description = "";
  createdProduct.price = 0;
  createdProduct.type_id= 1;
  createdProduct.sizes= [];
};

const saveProduct = async () => {
    if (validateCredentials()) {  
        let success = await productStore.createProduct(createdProduct);
        if (success) {
            resetFormInputs();
            router.push(`/products`);
        }
    }
};

const addSize = (id: number)=>{

    if(sizes.value.includes(id)){
        const index = sizes.value.indexOf(id);
        sizes.value.splice(index, 1);
    }else{
        sizes.value.push(id);
    }
};

onBeforeMount(async () => {
  await typeStore.getAllTypes();
  await sizeStore.getAllSizes();
});

</script>

<template>
  <div>
    <!-- Add Product form -->
    <div class="px-6 py-15 mt-10 bg-white shadow-md rounded-lg">
      <form @submit.stop.prevent="saveProduct">
        <div class="grid md:grid-cols-2 md:gap-12 py-6 text-black text-xl">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                   Product Name
                </label>
                <input class="shadow font-light appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="name" 
                        type="text" 
                        placeholder="Product Name"
                        v-model="createdProduct.name"
                >
                <div v-show="showNameError" class="text-red-6 text-sm flex items-center space-x-2 mt-1">
                    <div i="carbon-warning" />
                    <span>{{ nameErrorMsg }}</span>
                </div>
            </div>

            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
                   Product Description
                </label>
                <textarea class="shadow font-light appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="description" 
                        type="text" 
                        placeholder="Product Description"
                        v-model="createdProduct.description"
                >
                </textarea>
            </div>

            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="price">
                   Product Price
                </label>
                <input class="shadow font-light appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="price" 
                        type="number" 
                        placeholder="111.99"
                        v-model="createdProduct.price"
                        step="0.01"
                >
                <div v-show="showPriceError" class="text-red-6 text-sm flex items-center space-x-2 mt-1">
                    <div i="carbon-warning" />
                    <span>{{ priceErrorMsg }}</span>
                </div>
            </div>

            <FormSelect
                v-model="createdProduct.type_id"
                label="Select Type"
                :data="typeStore.types"
            />

            <div>
                <label class="block text-gray-700 text-sm font-bold mb-2" for="sizes">
                    Sizes
                </label>
                <ul class="flex text-lg items-center">
                    <!--  Sizes -->
                    <li v-for="size in sizeStore.sizes" :key="size.id" class="pagination-li">
                    <Button
                        type="button"
                        @click="addSize(size.id)"
                        :class="{'bg-blue-500 border-blue-500 text-white': sizes.includes(size.id) }" 
                        class="ml-5 leading-tight border px-3 py-1 border-1 border-black shadow text-black-500 hover:bg-blue-500 hover:border-blue-500 hover:text-white"
                    >
                        {{ size.name }}
                    </Button>
                    </li>
                </ul>
            </div>
        </div>
        
        <div class="flex justify-between mt-8">
          <button class="btn bg-gray-400 hover:bg-gray-600" type="button">
            <RouterLink to="/products">Cancel</RouterLink>
          </button>
          <button class="btn bg-blue-500 hover:bg-blue-600" type="submit">Add Product</button>
        </div>
      </form>
    </div>
  </div>
</template>

<route lang="yaml">
name: addProduct
meta:
  layout: dashboard
</route>
