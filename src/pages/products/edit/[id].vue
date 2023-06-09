<script setup lang="ts">
import { reactive } from "vue";
import { Product } from "~/models/product";

const route = useRoute();
const productStore = useProductStore();
const router = useRouter();
const typeStore= useTypeStore();
const sizeStore= useSizeStore();
const sizes= ref<number[]>([]);
const product = ref<Product>();
const loading = ref(true);


let updatedProduct = reactive({
  name: "",
  description: "",
  price: 0,
  type_id: 0,
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
    if (!updatedProduct.name.length) {
        showNameError.value = true
        nameErrorMsg.value = productErrorMessages.nameRequired

    }else if(updatedProduct.name.length<5){
        showNameError.value = true
        nameErrorMsg.value = productErrorMessages.nameMin
    }
    // Validate price
    let priceRegex =  /^\d*(\.\d+)?$/

   if (!priceRegex.test(String(updatedProduct.price))) {
        showPriceError.value = true
        priceErrorMsg.value = productErrorMessages.priceInvalid
    }

    return !showNameError.value && !showPriceError.value
}

const resetFormInputs = () => {
  updatedProduct.name = "";
  updatedProduct.description = "";
  updatedProduct.price = 0;
  updatedProduct.type_id= 1;
  updatedProduct.sizes= [];
};

function goBack() {
  router.push('products');
}

const updateProduct = async () => {
    if (validateCredentials()) {  
        let success = await productStore.updateProduct(route.params.id, updatedProduct);
        if (success) {
            goBack();
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
   if (route.params.id) {
        product.value = await productStore.getProduct(route.params.id);
        await typeStore.getAllTypes();
        await sizeStore.getAllSizes();
        loading.value = false;
        if (product.value) {
            updatedProduct.name = product.value.name;
            updatedProduct.description = product.value.description;
            updatedProduct.price = product.value.price;
            updatedProduct.type_id = product.value.type.id;

            product.value.sizes.forEach((item)=>{
                sizes.value.push(item.id);
            });
        }
    }
});

</script>

<template>
  <div>
    <div v-if="loading">
        <p>Loading..</p>
    </div>
    <div v-else>
        <!-- Update Product form -->
        <div v-if="product" class="px-6 py-15 mt-10 bg-white shadow-md rounded-lg">
            <form @submit.stop.prevent="updateProduct">
                <div class="grid md:grid-cols-2 md:gap-12 py-6 text-black text-xl">
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                        Product Name
                        </label>
                        <input class="shadow font-light appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                id="name" 
                                type="text" 
                                placeholder="Product Name"
                                v-model="updatedProduct.name"
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
                                v-model="updatedProduct.description"
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
                                v-model="updatedProduct.price"
                                step="0.01"
                        >
                        <div v-show="showPriceError" class="text-red-6 text-sm flex items-center space-x-2 mt-1">
                            <div i="carbon-warning" />
                            <span>{{ priceErrorMsg }}</span>
                        </div>
                    </div>

                    <FormSelect
                        v-model="updatedProduct.type_id"
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
                <button class="btn bg-blue-500 hover:bg-blue-600" type="submit">Edit Product</button>
                </div>
            </form>
        </div>
    </div>
  </div>
</template>


<route lang="yaml">
meta:
  layout: dashboard
</route>