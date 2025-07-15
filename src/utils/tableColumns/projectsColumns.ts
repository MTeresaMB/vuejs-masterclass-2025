import type { ColumnDef } from "@tanstack/vue-table";
import type { Projects } from "../supaQueries";

export const columns: ColumnDef<Projects[0]>[] = [
  {
    accessorKey: "name",
    header: () => h("div", { class: "text-left" }, "Name"),
    cell: ({ row }) => {
      return h(
        RouterLink,
        {
          to: `/projects/${row.original.slug}`,
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
