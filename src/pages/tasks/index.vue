<script setup lang="ts">
import { tasksWithProjectsQuery } from "@/utils/supaQueries";
import type { TasksWithProjects } from "@/utils/supaQueries";
import { columns } from "@/utils/tableColumns/tasksColumns";

usePageStore().pageData.title = "My Tasks";

const tasks = ref<TasksWithProjects | null>(null);

const getTasks = async () => {
  const { data, error } = await tasksWithProjectsQuery;
  if (error) console.error("Error fetching tasks:", error);

  tasks.value = data || [];
  return data;
};

await getTasks();
</script>

<template>
  <div>
    <DataTable v-if="tasks" :columns="columns" :data="tasks" />
  </div>
</template>
