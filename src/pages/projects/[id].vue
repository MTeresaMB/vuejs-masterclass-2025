<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <div>
    <h1>Project {{ route.params.id }}</h1>
    <RouterLink to="/projects">Go to Projects Page</RouterLink>
    <br />
    <RouterLink to="/">Go to Home Page</RouterLink>
  </div>
</template>
