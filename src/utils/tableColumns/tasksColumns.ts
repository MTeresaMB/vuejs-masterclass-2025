import type { ColumnDef } from "@tanstack/vue-table";
import type { TasksWithProjects } from "../supaQueries";

export const columns: ColumnDef<TasksWithProjects[0]>[] = [
  {
    accessorKey: "name",
    header: () => h("div", { class: "text-left" }, "Name"),
    cell: ({ row }) => {
      return h(
        RouterLink,
        { to: `/tasks/${row.original.id}`, class: "text-left font-medium" },
        () => row.getValue("name")
      );
    },
  },
  {
    accessorKey: "description",
    header: () => h("div", { class: "text-left" }, "Description"),
    cell: ({ row }) => {
      return h("div", { class: "text-left" }, row.getValue("description"));
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
  {
    accessorKey: "created_at",
    header: () => h("div", { class: "text-left" }, "Created At"),
    cell: ({ row }) => {
      const createdAt = row.getValue("created_at") as string | null;

      if (!createdAt) {
        return h("div", { class: "text-left text-muted" }, "No date provided");
      }

      const date = createdAt?.slice(0, 10) || "";

      return h("div", { class: "text-left" }, date);
    },
  },
  {
    accessorKey: "due_date",
    header: () => h("div", { class: "text-left" }, "Due Date"),
    cell: ({ row }) => {
      return h("div", { class: "text-left" }, row.getValue("due_date"));
    },
  },
  {
    accessorKey: "projects",
    header: () => h("div", { class: "text-left" }, "Projects"),
    cell: ({ row }) => {
      const projects = row.original.projects;

      if (!projects) {
        return h("span", { class: "text-left" }, "No projects");
      }

      return h(
        RouterLink,
        {
          to: `/projects/${projects?.slug ?? ""}`,
          class: "text-left font-medium hover:bg-muted block w-full",
        },
        () => {
          return projects?.name ?? "--";
        }
      );
    },
  },
];
