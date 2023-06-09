import { acceptHMRUpdate, defineStore } from 'pinia'
import { removeToken, removeUser, saveToken, saveUser } from '~/composables/storage'
import { useToast } from "vue-toastification";
import httpService from '~/services/http-service'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
    httpService.init()

    const router = useRouter()
    const toast = useToast();

    const login = async (email: string, password: string): Promise<boolean> => {
        const canLogin = ref(false)
        await axios.post("/login", { email: email, password: password })
            .then((response) => {
                saveToken(response.data.token)
                saveUser(response.data.user)
                httpService.setAuthorizationToken()
                canLogin.value = true
                router.push("/products")
            })
            .catch((error) => {
                canLogin.value = false
                toast.error(error.response.data.message)
            })

        return canLogin.value

    }

    const logout = () => {
        router.push("/login")
        axios.post("/logout")
            .then(() => {
                httpService.unsetAuthorizationToken()
                removeToken()
                removeUser()
            }).catch((error) => {
                toast.error(error.response.data.message)
            })
    }

    return {
        login, logout
    }
})

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))