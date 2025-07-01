<script setup lang="ts">
import { supabase } from "@/lib/supaBaseClient";
import type { Tables } from "../../../database/types";
import type { ColumnDef } from "@tanstack/vue-table";
import DataTable from "@/components/ui/data-table/DataTable.vue";

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

const columns: ColumnDef<Tables<"projects">>[] = [
  {
    accessorKey: "name",
    header: () => h("div", { class: "text-left" }, "Name"),
    cell: ({ row }) => {
      return h(
        RouterLink,
        {
          to: `/projects/${row.original.id}`,
          class: "text-left font-medium hover:bg-muted block w-full",
        },
        () => row.getValue("name")
      );
    },
  },
  {
    accessorKey: "slug",
    header: () => h("div", { class: "text-left" }, "Slug"),
    cell: ({ row }) => {
      return h("div", { class: "text-left" }, row.getValue("slug"));
    },
  },
  {
    accessorKey: "status",
    header: () => h("div", { class: "text-left" }, "Status"),
    cell: ({ row }) => {
      return h("div", { class: "text-left" }, row.getValue("status"));
    },
  },
  {
    accessorKey: "collaborators",
    header: () => h("div", { class: "text-left" }, "Collaborators"),
    cell: ({ row }) => {
      return h(
        "div",
        { class: "text-left" },
        JSON.stringify(row.getValue("collaborators"))
      );
    },
  },
];
</script>

<template>
  <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>
