<script setup lang="ts">
import { projectQuery } from "@/utils/supaQueries";
import type { Project } from "@/utils/supaQueries";

const route = useRoute("/projects/[slug]");
const project = ref<Project | null>(null);

watch(
  () => project.value?.name,
  () => {
    if (project.value) {
      usePageStore().pageData.title = `Project - ${project.value.name}`;
    } else {
      usePageStore().pageData.title = "Project";
    }
  }
);

const getProjects = async () => {
  try {
    const { data, error } = await projectQuery(route.params.slug);
    if (error) {
      console.error("Error fetching project:", error);
      return;
    }
    project.value = data;
  } catch (err) {
    console.error("Unexpected error:", err);
  }
};

await getProjects();
</script>

<template>
  <Table v-if="project">
    <TableRow>
      <TableHead> Name </TableHead>
      <TableCell> {{ project.name }} </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Description </TableHead>
      <TableCell>
        {{ project.description || "No description provided." }}
      </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Status </TableHead>
      <TableCell> {{ project?.status || "Unknown" }}</TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Collaborators </TableHead>
      <TableCell>
        <div class="flex">
          <BaseAvatar
            class="-mr-4 border border-primary hover:scale-110 transition-transform"
            v-for="collab in project?.collaborators"
            :key="collab"
          >
            <RouterLink class="w-full h-full flex items-center justify-center" to="">
              <AvatarImage src="" alt="" />
              <AvatarFallback></AvatarFallback>
            </RouterLink>
          </BaseAvatar>
        </div>
      </TableCell>
    </TableRow>
  </Table>

  <section
    v-if="project"
    class="mt-10 flex flex-col md:flex-row gap-5 justify-between grow"
  >
    <div class="flex-1">
      <h2>Tasks</h2>
      <div class="table-container">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead> Name </TableHead>
              <TableHead> Status </TableHead>
              <TableHead> Due Date </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="tasks in project.tasks" :key="tasks.id">
              <TableCell> {{ tasks.name }} </TableCell>
              <TableCell> {{ tasks.status }} </TableCell>
              <TableCell> {{ tasks.due_date }} </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
    <div class="flex-1">
      <h2>Documents</h2>
      <div class="table-container">
        <p class="text-muted-foreground text-sm font-semibold px-4 py-3">
          This project doesn't have documents yet...
        </p>
        <!-- <Table>
          <TableHeader>
            <TableRow>
              <TableHead> Name </TableHead>
              <TableHead> Visibility </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell> Lorem ipsum dolor sit amet. </TableCell>
              <TableCell> Private </TableCell>
            </TableRow>
          </TableBody>
        </Table> -->
      </div>
    </div>
  </section>
</template>

<style>
th {
  width: 100px;
}

h2 {
  margin-bottom: 1rem;
  font-size: 1.125rem;
  font-weight: 600;
  width: fit-content;
}

.table-container {
  overflow: hidden;
  overflow-y: auto;
  border-radius: 0.375rem;
  /* rounded-md */
  background-color: #0f172a;
  /* bg-slate-900 */
  height: 20rem;
  /* h-80 */
}
</style>
