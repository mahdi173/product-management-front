import { acceptHMRUpdate, defineStore } from 'pinia'
import httpService from '~/services/http-service'
import { Product, CreateProduct } from '~/models/product'
import { QueryParams} from '~/models/queryParams'
import { setPaginationProperties, PaginationProperties } from '~/models/pagination'
import axios from 'axios'
import { useToast } from "vue-toastification";


export const useProductStore = defineStore('product', () => {
    httpService.init()
    const toast = useToast();

    const products = ref<Product[]>([])
    const product = ref<Product>()
    const productPageProps = ref<PaginationProperties>()
    const productCount = computed(() => products.value.length)

    let params: QueryParams = reactive({
        filters: {},
        paginate: 10,
        page: 1
    })

    // CRUD Functions :
    const getAllProducts = async () => {
        await axios.get("products", { params: params })
            .then((res) => {
                products.value = (res.data.data)
                productPageProps.value = setPaginationProperties(res.data)
            })
            .catch((error) => {
                toast.error(error.response.data.message)
            })
    }

    const getProduct = async (id: number): Promise<Product> => {
        let product
        await axios.get('products/' + id)
            .then((res) => {
                product = res.data
            })
            .catch((error) => {
                toast.error(error.response.data.message)
            })

        return product
    }

    const createProduct = async (product: CreateProduct): Promise<boolean> => {
        let success = false
        if (!product) success = false
    
        await axios.post('products', product)
          .then(async (res) => {
            success = true
            toast.success(productSuccessMessages.creation);
            getAllProducts();
          })
          .catch((error) => {
            success = false
            toast.error(error.response.data.message)
          })
        return success
    }
    
    const updateProduct = async (id: number, product: CreateProduct): Promise<boolean> => {
        let success = false
        if (!id || !product)
            success = false
        await axios.put('products/' + id, product)
            .then(async (res) => {
            success = true
            getAllProducts();
            toast.success(productSuccessMessages.update);
            }).catch((error) => {
            success = false
            toast.error(error.response.data.message)
            })
        return success
    }

    const deleteProduct = async (id: number): Promise<boolean> => {
        let success = false
        if (!id)
            success = false

        await axios.delete('products/' + id)
            .then(async (res) => {
                success = true
                toast.success(productSuccessMessages.deletion);
                getAllProducts();
            })
            .catch((error) => {
                toast.error(error.response.data.message)
                success = false
            })

        return success
    }

  return {
    product, products, params, productPageProps, productCount, getAllProducts, getProduct, updateProduct, deleteProduct, createProduct
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))