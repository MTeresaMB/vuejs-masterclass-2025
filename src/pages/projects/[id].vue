<script setup lang="ts">
const route = useRoute("/projects/[id]");
const projectId = route.params.id;
</script>

<template>
  <div>
    <h1>Project {{ projectId }}</h1>
    <RouterLink to="/projects">Go to Projects Page</RouterLink>
    <br />
    <RouterLink to="/">Go to Home Page</RouterLink>
  </div>
</template>
