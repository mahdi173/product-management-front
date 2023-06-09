import { acceptHMRUpdate, defineStore } from 'pinia'
import httpService from '~/services/http-service'
import { Size } from '~/models/size'
import axios from 'axios'
import { useToast } from "vue-toastification";

export const useSizeStore = defineStore('size', () => {
    httpService.init()
    const toast = useToast();

    const sizes = ref<Size[]>([])

    // Get All Function :
    const getAllSizes = async () => {
        await axios.get("sizes")
            .then((res) => {
                sizes.value = (res.data)
            })
            .catch((error) => {
                toast.error(error.response.data.message)
            })
    }

  return {
    sizes, getAllSizes
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))