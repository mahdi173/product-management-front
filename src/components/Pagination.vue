<template>
    <div v-if="properties.total">
      <!-- Pagination -->
      <nav
        aria-label="Page navigation example "
        class="flex flex-row justify-around items-center my-4 space-x-4"
      >
        <div class="flex items-center justify-center">
          <!-- Buttons -->
          <ul class="flex text-lg items-center">
            <!-- Pages Range -->
            <li v-for="page in visibleLinks" class="pagination-li">
              <Button
                @click="onClickPage(parseInt(page.label))"
                :class="{
                  ' bg-white text-gray': page.active,
                }"
                class="leading-tight border px-3 py-1 border border-gray-400 shadow text-gray-500 hover:bg-gray-100 hover:text-primary-400"
              >
                {{ page.label }}
              </Button>
            </li>
          </ul>
          <!-- End Buttons -->
          <!-- NUmber of Results : [from]-[to] out of [total]  -->
          <div class="text-sm text-gray ml-3">
            {{
              `${properties.from}-${properties.to} de ${properties.total} résultats`
            }}
          </div>
          <!-- End NUmber of Results : [from]-[to] out of [total]  -->
        </div>
      </nav>
      <!-- End Pagination-->
    </div>
  </template>
  
<script setup lang="ts">
    import { PaginationProperties } from "~/models/pagination";

    const emit = defineEmits(["pagechanged"]);
    const props = defineProps({
        properties: { type: Object as () => PaginationProperties, required: true },
        maxVisibleButtons: {
        type: Number,
        default: 3,
        },
    });


    // Used for "Show lignes" selection :
    const perPage = ref(props.properties.perPage);

    // Computed :

    // Creation range of buttons : << < 1 2 3 > >> , << < 2 3 4 > >> and so on
    // So the design stays clean when you have alot of pages

    const startPage = computed(() => {
        // First page
        if (isInFirstPage.value) {
        return 1;
        }
        // Last page
        if (isInLastPage.value) {
        const start = linksCount.value - (props.maxVisibleButtons - 1);
        if (start === 0) {
            return 1;
        } else {
            return start;
        }
        }
        // Between
        return props.properties.currentPage - 1;
    });

    const visibleLinks = computed(() => {
        // Remove the Prev and Next URLs as they are seperate attrbutes
        // for PaginationProperties
        const links = props.properties.links.slice(
        1,
        props.properties.links.length - 1
        );
        const range = [];
        // Cacl the ending of the visible links range
        let min = Math.min(
        startPage.value + props.maxVisibleButtons - 1,
        linksCount.value
        );

        for (let i = startPage.value; i <= min; i++) {
        range.push(links[i - 1]);
        }
        return range;
    });
    // number of pages ( we remove 2 for the Prev and Next, they have seperate attributes and we dont need them here)
    const linksCount = computed(() => props.properties.links.length - 2);

    const isInFirstPage = computed(() => {
        return props.properties.currentPage === 1;
    });
    const isInLastPage = computed(() => {
        return (
        props.properties.currentPage ===
        getPageFromUrl(props.properties.lastPageUrl)
        );
    });

    // Page :
    function onClickPage(page: number) {
        emit("pagechanged", { page: page, perPage: perPage.value });
    }

    // Laravel send a URL in the response
    // Here we get page number from the URL
    function getPageFromUrl(url: string | null): Number {
        if (url) return Number(url.substring(url.lastIndexOf("page=") + 5));
        return -1;
    }
</script>
  
<style scoped></style>
  