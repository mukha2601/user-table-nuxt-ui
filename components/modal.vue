<script setup>
import { useStore } from "~/store/index";

const store = useStore();
</script>

<template>
  <div class="relative">
    <UModal v-model="store.isOpen">
      <div class="flex justify-end p-2">
        <UButton label="close" @click="store.closeModal" />
      </div>
      <div class="p-4">
        <p>
          <span class="font-extralight text-gray-300">Name: </span>
          {{ store.selectedItem.name }}
        </p>
        <p>
          <span class="font-extralight text-gray-300">Email: </span>
          {{ store.selectedItem.email }}
        </p>
        <p>
          <span class="font-extralight text-gray-300">Phone: </span>
          {{ store.selectedItem.phone }}
        </p>
        <p>
          <span class="font-extralight text-gray-300">Website: </span>
          {{ store.selectedItem.website }}
        </p>
        <p>
          <span class="font-extralight text-gray-300">Company: </span>
          {{ store.selectedItem.company.name }}
        </p>
      </div>
    </UModal>
  </div>
</template>

<style>
#map {
  width: 100%;
  height: 100%;
}
</style>
