<script setup lang="ts">
const links = [
  { title: "Dashboard", icon: "lucide:house", to: "/" },
  { title: "Projects", icon: "lucide:building-2", to: "/projects" },
  { title: "My Tasks", icon: "lucide:badge-check", to: "/tasks" },
];

const accountLinks = [
  { title: "Profile", icon: "lucide:user", to: "/profile" },
  { title: "Settings", icon: "lucide:settings", to: "/settings" },
  { title: "Sign out", icon: "lucide:log-out", to: "/signout" },
];
</script>

<template>
  <aside class="flex flex-col h-screen gap-2 border-r fixed bg-muted/40 lg:w-52 w-16 transition-[width]">
    <div class="flex h-16 items-center border-b px-2 lg:px-4 shrink-0 gap-1 justify-between">
      <BaseButton variant="outline" size="icon" class="w-8 h-8">
        <iconify-icon icon="lucide:menu"></iconify-icon>
      </BaseButton>

      <BaseButton variant="outline" size="icon" class="w-8 h-8">
        <iconify-icon icon="lucide:plus"></iconify-icon>
      </BaseButton>
    </div>

    <nav class="flex flex-col gap-2 justify-between h-full relative">
      <div>
        <SidebarLink :links="links" />
      </div>

      <div class="border-y text-center bg-background py-3">
        <SidebarLink :links="accountLinks" />
      </div>
    </nav>
  </aside>
</template>
