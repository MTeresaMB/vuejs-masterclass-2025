<script setup lang="ts">
import { columns } from "@/utils/tableColumns/projectsColumns";
import { projectsQuery } from "@/utils/supaQueries";
import type { Projects } from "@/utils/supaQueries";

usePageStore().pageData.title = "Projects";

const projects = ref<Projects | null>(null);

const getProjects = async () => {
  const { data, error } = await projectsQuery;
  if (error) console.error("Error fetching projects:", error);

  projects.value = data || [];
  return data;
};

await getProjects();
</script>

<template>
  <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>
