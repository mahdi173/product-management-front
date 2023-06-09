<template>
  <button
    @click="goto"
    class="flex float-left items-center  h-10 space-x-4 px-4 py-2 text-white text-sm bg-blue-500 rounded shadow inline-flex  hover:bg-blue-700 hover:scale-105"
  >
    <component :is="iconComponents[icon]" />
    <span>
      {{ title }}
    </span>
  </button>
</template>

<script setup lang="ts">
import AddIcon from "../Icons/AddIcon.vue";

const props = defineProps({
  routeName: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: "AddIcon",
  },
});
const router = useRouter();
const goto = () => {
  router.push({ name: props.routeName });
};

const iconComponents: { [key: string]: any } = {
  AddIcon,
};
</script>

<style scoped></style>
