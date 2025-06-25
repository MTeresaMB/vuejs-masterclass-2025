<script setup lang="ts">
import { supabase } from "@/lib/supaBaseClient";
import { ref } from "vue";
import type { Tables } from "../../../database/types";

const projects = ref<Tables<"projects">[]>([]);

(async () => {
  const { data, error } = await supabase.from("projects").select("*");
  if (error) {
    console.error("Error fetching projects:", error);
  } else {
    console.log("Projects data:", data);
  }

  projects.value = data || [];
  return data;
})();
</script>

<template>
  <div>
    <h1>Projects Page</h1>
    <RouterLink to="/">Go to Home Page</RouterLink>

    <ul>
      <li v-for="project in projects" :key="project.id">
        {{ project.id }}
        {{ project.name }}
        {{ project.slug }}
        {{ project.status }}
      </li>
    </ul>
  </div>
</template>
