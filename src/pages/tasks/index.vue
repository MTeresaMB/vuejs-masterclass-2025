<script setup lang="ts">
import { supabase } from "@/lib/supaBaseClient";
import { ref } from "vue";
import type { Tables } from "../../../database/types";

const tasks = ref<Tables<"tasks">[]>([]);

(async () => {
  const { data, error } = await supabase.from("tasks").select("*");
  if (error) {
    console.error("Error fetching tasks:", error);
  } else {
    console.log("Tasks data:", data);
  }

  tasks.value = data || [];
  return data;
})();
</script>

<template>
  <div>
    <h1>Tasks Page</h1>
    <RouterLink to="/">Go to Home Page</RouterLink>

    <ul>
      <li v-for="task in tasks" :key="task.id">
        {{ task.id }}
        {{ task.name }}
      </li>
    </ul>
  </div>
</template>
