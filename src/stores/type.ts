import { acceptHMRUpdate, defineStore } from 'pinia'
import httpService from '~/services/http-service'
import { Type } from '~/models/type'
import axios from 'axios'
import { useToast } from "vue-toastification";

export const useTypeStore = defineStore('type', () => {
    httpService.init()

    const toast = useToast();
    const types = ref<Type[]>([])

    // Get All Function :
    const getAllTypes = async () => {
        await axios.get("types")
            .then((res) => {
                types.value = (res.data)
            })
            .catch((error) => {
                toast.error(error.response.data.message)
            })
    }

  return {
    types, getAllTypes
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))