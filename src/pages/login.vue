<script setup lang="ts">

// Stores :
const authStore = useAuthStore()

// Inputs :
const email = ref('')
const password = ref('')

// Refs
const isConnecting = ref(false)
// Error handling
const emailErrorMsg = ref("")
const passwordErrorMsg = ref("")

const showEmailError = ref(false)
const showPasswordError = ref(false)
const showLoginError = ref(false)

// Methods :
function resetErrors() {
    showEmailError.value = false
    showPasswordError.value = false
    showLoginError.value = false
}

function validateCredentials(): boolean {
    resetErrors()
    // Validate Email
    let emailRegex = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")

    if (!email.value.length) {
        showEmailError.value = true
        emailErrorMsg.value = loginInErrorMessages.emailRequired

    } else if (!emailRegex.test(email.value)) {
        showEmailError.value = true
        emailErrorMsg.value = loginInErrorMessages.emailInvalid
    }
    // Validate Password
    if (!password.value.length) {
        showPasswordError.value = true
        passwordErrorMsg.value = loginInErrorMessages.passwordRequired
    }

    return !showEmailError.value && !showPasswordError.value
}

async function login(): Promise<void> {
    isConnecting.value = true
    if (validateCredentials()) {
        showLoginError.value = !await authStore.login(email.value, password.value)
    }
    isConnecting.value = false
}
</script>

<template> 
    <form  @submit.stop.prevent="login" class="lg:w-1/2 w-full px-4 lg:py-6 lg:mt-0">
        <h2 class="text-sm title-font text-center text-gray-500 tracking-widest">
            Enter your Email and Password
        </h2>
        <div v-show="showLoginError" class="text-red-6 text-sm text-left flex items-center gap-2 p-2">
            <div i="carbon-warning" />
            <span>{{ loginInErrorMessages.loginFailed }}</span>
        </div>
        <div class="flex  flex-col border-b-1 border-gray-200 mb-5 mt-5">
            <div class="relative mb-4">
                <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
                <input type="text" id="email" name="email" v-model="email"
                    class="w-full rounded border border-gray-300 hover:border-primary-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                <div v-show="showEmailError" class="text-red-6 text-sm flex items-center space-x-2 mt-1">
                    <div i="carbon-warning" />
                    <span>{{ emailErrorMsg }}</span>
                </div>
            </div>
            <div class="relative mb-4">
                <div class="flex justify-between">
                    <label for="password" class="leading-7 text-sm text-gray-600">
                        Mot de passe
                    </label>
                </div>
                <input type="password" id="password" name="password" v-model="password"
                    class="w-full rounded border border-gray-300 hover:border-primary-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                <div v-show="showPasswordError" class="text-red-6 text-sm flex items-center space-x-2 mt-1">
                    <div i="carbon-warning" />
                    <span>{{ passwordErrorMsg }}</span>
                </div>
            </div>
        </div>
        <button type="submit"
            class="w-full text-center text-lg ml-auto mb-2 text-white bg-blue-500 hover:bg-primary-900 border-0 py-2 px-6 focus:outline-none rounded-full">
            Se Connecter
        </button>
    </form>
</template>

<style scoped></style>

<route lang="yaml">
    name: Login
    meta:
        layout: auth
</route>