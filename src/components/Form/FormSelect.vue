<script setup lang="ts">
const props = defineProps({
  modelValue: {
    required: true,
  },
  data: {
    required: true,
    type: <any>[],
  },
  label: {
    type: String,
    default: "Select",
  },
  type: {
    type: String,
    default: "text",
  },
});
const emit = defineEmits(["update:modelValue"]);
const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>

<template>
  <div class="relative mb-4">
    <label
      :for="label"
      class="block text-gray-700 text-sm font-bold mb-2"
      >{{ label }}</label
    >
    <select
      :name="label"
      v-model="value"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      <option v-for="item in data" :value="item.id" :key="item.id">
        {{ item.name }}
      </option>
    </select>
  </div>
</template>
