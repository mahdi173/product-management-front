<template>
    <div class="bg-white shadow space-x-2 p-2 flex justify-between">
      <div class="flex flex-col justify-left">
        <p class="text-xl font-bold	">Products Store</p>
      </div>
      <div class="flex flex-col justify-center">
        <p class="text-lg font-normal text-gray-500">Your Products</p>
        </div>
      <div v-if="userStore.user" class="flex justify-end items-center space-x-4">
        <div class="flex flex-col text-sm text-left">
          <span class="text-md">
            {{ userStore.user.name}}
          </span>
          <span class="text-gray-500 hover:text-red">
            <Button @click="authStore.logout()">Logout </Button>
          </span>
        </div>
        <div
          class="rounded-full h-10 w-10 flex items-center justify-center text-white bg-blue-500 cursor-pointer"
        >
          <!-- Used to show first letter of the  name -->
          <!-- Example : User name "Frodo Baggins" -->
          <!-- Results : Show a circle containing the letter: F -->
          {{
            userStore.user.name.substring(0, 1) 
          }}
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  
  const authStore = useAuthStore();
  const userStore = useUserStore();
  
  onBeforeMount(() => {
    userStore.loadUser();
  });
  </script>
  