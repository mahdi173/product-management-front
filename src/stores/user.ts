import { acceptHMRUpdate, defineStore } from 'pinia'
import httpService from '~/services/http-service'
import { getUser as loadUserData } from '~/composables/storage'
import { User} from '~/models/user'

export const useUserStore = defineStore('user', () => {
  httpService.init()

  const user = ref<User>()

  const loadUser = async () => {
    const userData = loadUserData()
    if (userData !== null) {
      user.value = userData
    }
  }

  return {
    user, loadUser
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))