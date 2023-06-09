<script setup lang="ts">
const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  confirmBtn: {
    type: Object,
    default: () => ({
      bgColor: {
        base: "bg-red-600",
        hover: "hover:bg-red-700",
      },
      text: {
        value: "Delete",
        baseColor: "text-white",
        size: "text-sm",
      },
    }),
  },
  cancelBtn: {
    type: Object,
    default: () => ({
      bgColor: {
        base: "bg-white",
        hover: "hover:bg-gray-100",
      },
      text: {
        value: "Cancel",
        baseColor: "text-gray-900",
        size: "text-sm",
      },
      border: {
        color: "border-gray-200",
      },
    }),
  },
  icon: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["cancel", "confirm"]);
const cancel = () => emit("cancel");
const confirm = () => emit("confirm");
</script>

<template>
  <div
    class="flex justify-center items-center fixed top-0 left-0 right-0 bg-gray-900/20 z-50 p-4 overflow-x-hidden overflow-y-auto h-full"
    @click="cancel()"
  >
    <div class="w-500 h-full max-w-xl md:h-auto">
      <div class="relative bg-white rounded shadow dark:bg-gray-700 z-40">
        <button
          type="button"
          class="absolute top-3 right-2.5 focus:outline-none focus:ring-2 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          @click="cancel"
        >
          <close-icon />
        </button>
        <div class="p-6 text-center">
          <!-- Icon -->
          <div class="flex justify-center mb-3">
            <div
              i="carbon-warning-filled "
              class="w-10 h-10"
              :class="[
                props.icon == true ? 'text-blue rotate-180' : 'text-red',
              ]"
            ></div>
          </div>
          <!-- END : Icon -->
          <!-- Message -->
          <h3 class="mb-6 text-lg font-normal text-gray-500 dark:text-gray-400">
            <pre>{{ props.message }}</pre>
          </h3>
          <!-- END : Message -->
          <!-- Buttons -->
          <div class="flex justify-between px-26">
            <div class="w-24 h-9">
              <button
                type="button"
                :class="`${props.confirmBtn.bgColor.base} ${props.confirmBtn.bgColor.hover} ${props.confirmBtn.text.baseColor} ${props.confirmBtn.text.size}`"
                class="p-2 rounded"
                @click="confirm"
              >
                {{ props.confirmBtn.text.value }}
              </button>
            </div>
            <div class="w-20 h-9">
              <button
                type="button"
                :class="`${props.cancelBtn.bgColor.base} ${props.cancelBtn.bgColor.hover} ${props.cancelBtn.text.baseColor} ${props.cancelBtn.text.size} ${props.cancelBtn.border.color}`"
                class="p-2 rounded border"
                @click="cancel"
              >
                {{ props.cancelBtn.text.value }}
              </button>
            </div>
          </div>
          <!-- END : Buttons -->
        </div>
      </div>
    </div>
  </div>
</template>
