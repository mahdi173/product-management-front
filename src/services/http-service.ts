import axios from 'axios'

const httpService = {
    init() {
        this.setBaseUrl()
        this.setAuthorizationToken()
    },
    setBaseUrl() {
        axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
    },
    setAuthorizationToken() {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + getToken()
    },
    unsetAuthorizationToken() {
        axios.defaults.headers.common = {}
    },
}

export default httpService