<script setup lang="ts">
usePageStore().pageData.title = "Home Page";
</script>

<template>
  <div>
    <h1>Home Page</h1>
    <RouterLink to="/projects">Go to Projects Page</RouterLink>
    <br />
  </div>
</template>
