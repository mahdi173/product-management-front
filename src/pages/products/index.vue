<script setup lang="ts">

// Store:
const productStore = useProductStore();

const router = useRouter();
const isLoading = ref(true);

onBeforeMount(async () => {
  if (!productStore.productCount) {
    await productStore.getAllProducts();
  }
  isLoading.value = false;
});

// Methodes
function gotoPath(path: string) {
  router.push(path);
}

const getData = async () => {
  await productStore.getAllProducts();
};

async function resetFilters() {
  productStore.params.page = 1;
  productStore.params.filters = [];

  await productStore.getAllProducts();
};

function edit(id: number) {
  gotoPath(`products/edit/${id}`);
}

const deletebyid = async (id: any) => {
  await productStore.deleteProduct(id);
};

async function search(filters: any) {
  productStore.params.page = 1;
  productStore.params.filters = filters;

  await productStore.getAllProducts();
}

async function filter(filters: any) {
  productStore.params.page = 1;
  productStore.params.filters = filters;

  await productStore.getAllProducts();
}

async function onPageChange(params: any) {
  const { perPage, page } = params;
  productStore.params.paginate = perPage;
  productStore.params.page = page;

  await productStore.getAllProducts();
}

</script>

<template>
  <div>
    <div class="flex justify-between items-center">
      <!-- Add product button -->
      <LinkButton route-name="addProduct" title="Add Product" />
        <!-- End add product button -->
        <!-- Filters -->
    </div>
    <Filters
          @filters="filter"
          @reset="resetFilters"
    />
    <div v-if="isLoading" class="pt-16">
      <p>Loading...</p>
    </div>
    <div v-else class="pt-16">
      <Product
        v-if="productStore"
        :actions="true"
        :data="productStore.products"
        @edit="(id: number) => edit(id)"
        @delete="(id: number) => deletebyid(id)"
        @filters="search"
        @getdata="getData()"
      />
      <Pagination
        v-if="productStore.productPageProps"
        :properties="productStore.productPageProps"
        @pagechanged="onPageChange"
      />
    </div>
  </div>
</template>

<route lang="yaml">
name: products
meta:
  layout: dashboard
</route>
