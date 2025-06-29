<script setup lang="ts">
import { BaseAvatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BaseInput } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
</script>

<template>
  <nav class="h-16 border-b bg-muted/40 flex justify-between px-6 items-center">
    <form class="relative w-full h-fit max-w-96">
      <iconify-icon class="absolute top-[50%] translate-y-[-50%] left-2.5 text-muted-foreground" icon="lucide:search" />
      <BaseInput type="text" placeholder="Search..." class="w-full pl-8 bg-background" />
    </form>
    <DropdownMenu>
      <DropdownMenuTrigger>
        <BaseAvatar>
          <AvatarImage src="https://github.com/unovue.png" />
          <AvatarFallback>AB</AvatarFallback>
        </BaseAvatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </nav>
</template>
