<template>
    <div class="relative flex min-h-screen bg-gray-100">
      <div class="flex-1 text-primary">
        <Header />
        <!-- Main content -->
        <div class="container mx-auto">
          <div class="p-4 font-bold">
            <RouterView />
          </div>
        </div>
      </div>
    </div>
</template>
  