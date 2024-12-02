<template>
    <div class="w-full h-screen  items-center">
      <div v-if="isLoading">Loading...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else>
        <Table />
      </div>
    </div>
  </template>
  
  <script setup></script>
  