<script setup lang="ts">
import TopNavbar from "./components/ui/layout/TopNavbar.vue";
import AsideBar from "./components/ui/layout/AsideBar.vue";
</script>

<template>
  <AsideBar />
  <div class="flex flex-col lg:ml-52 ml-16 transition-[margin]">
    <TopNavbar />
    <main>
      <RouterView />
    </main>
  </div>
</template>
