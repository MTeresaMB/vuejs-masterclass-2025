<script setup lang="ts">
interface LinkProp {
  title: string;
  icon: string;
  to: string;
}

defineProps<{
  links: LinkProp[];
}>();
</script>

<template>
  <RouterLink v-for="link in links" :key="link.title" :to="link.to"
    exact-active-class="bg-primary text-primary-foreground dark:bg-primary/80 dark:text-primary-foreground"
    class="flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary justify-center lg:justify-normal text-muted-foreground">
    <iconify-icon :icon="link.icon"></iconify-icon>
    <span class="hidden lg:block text-nowrap">{{ link.title }}</span>
  </RouterLink>
</template>
