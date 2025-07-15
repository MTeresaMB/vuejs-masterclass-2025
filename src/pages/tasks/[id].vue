<script setup lang="ts">
import { taskQuery, type Task } from '@/utils/supaQueries';


const route = useRoute("/tasks/[id]");
const task = ref<Task | null>(null);

watch(
  () => task.value?.name,
  () => {
    if (task.value) {
      usePageStore().pageData.title = `Task - ${task.value.name}`;
    } else {
      usePageStore().pageData.title = "Task";
    }
  }
);

const getTask = async () => {
  try {
    const { data, error } = await taskQuery(Number(route.params.id));
    if (error) {
      console.error("Error fetching task:", error);
      return;
    }
    task.value = data;
  } catch (err) {
    console.error("Unexpected error:", err);
  }
};

await getTask();
</script>

<template>
  <Table v-if="task">
    <TableRow>
      <TableHead> Name </TableHead>
      <TableCell> {{ task.name }} </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Description </TableHead>
      <TableCell>
        {{ task.description }}
        nihil, ab reprehenderit dolorem sunt veritatis perferendis? Repudiandae quis velit
        quasi ab natus quia ratione voluptas deserunt labore sed distinctio nam fuga fugit
        vero voluptates placeat aperiam, saepe excepturi eos harum consectetur doloremque
        perspiciatis nesciunt! Incidunt, modi.
      </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Assignee </TableHead>
      <TableCell> Lorem ipsum dolor </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Project </TableHead>
      <TableCell> {{ task.projects?.name }} </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Status </TableHead>
      <TableCell>{{ task.status }}</TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Collaborators </TableHead>
      <TableCell>
        <div class="flex">
          <BaseAvatar
            class="-mr-4 border border-primary hover:scale-110 transition-transform"
            v-for="collab in task.collaborators"
            :key="collab"
          >
            <RouterLink class="w-full h-full flex items-center justify-center" to="">
              <AvatarImage src="" alt="" />
              <AvatarFallback> </AvatarFallback>
            </RouterLink>
          </BaseAvatar>
        </div>
      </TableCell>
    </TableRow>
    <TableRow class="hover:bg-transparent">
      <TableHead class="align-top pt-4"> Comments </TableHead>

      <TableCell>
        Comments cards goes in here..

        <div class="flex flex-col justify-between p-3 bg-muted my-2 rounded-md">
          <textarea
            placeholder="Add your comment.."
            class="w-full max-w-full overflow-y-auto prose-sm prose border rounded dark:prose-invert hover:border-muted bg-background border-muted p-3"
          >
          </textarea>
          <div class="flex justify-between mt-3">
            <BaseButton> Comment </BaseButton>
            <div class="flex gap-4">
              <BaseButton variant="ghost" @click.prevent>
                <iconify-icon icon="lucide:paperclip"></iconify-icon>
                <span class="sr-only">Attach file</span>
              </BaseButton>
              <BaseButton variant="ghost" @click.prevent>
                <iconify-icon icon="lucide:image-up"></iconify-icon>

                <span class="sr-only">Upload image</span>
              </BaseButton>
            </div>
          </div>
        </div>
      </TableCell>
    </TableRow>
  </Table>
</template>
