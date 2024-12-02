<template>
  <Modal />
  <div class="border-2 rounded-xl p-6">
    <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
      <UInput v-model="q" placeholder="Filter people..." />
    </div>

    <div>
      <div v-if="isLoading">Loading...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else>
        <UTable :rows="rows" :columns="columns">
          <template #name-data="{ row }">
            <span class="cursor-pointer p-4 hover:text-red-500" @click="store.openModal(row)">{{
              row.name
            }}</span>
          </template>
        </UTable>
      </div>

      <div
        class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
      >
        <UPagination
          v-model="page"
          :page-count="pageCount"
          :total="filteredRows.length"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "~/store/index";
const store = useStore();
import { ref, computed } from "vue";
import { getUsers } from "@/services/userService";
const users = ref([]);
const isLoading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    users.value = await getUsers(); // Foydalanuvchilarni yuklash
  } catch (err) {
    error.value = "Foydalanuvchilarni yuklashda xatolik yuz berdi";
  } finally {
    isLoading.value = false;
  }
});

// Tabel ustunlari
const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
];

// Foydalanuvchilarni filtrlash
const q = ref("");
const filteredRows = computed(() => {
  if (!q.value) {
    return users.value;
  }

  return users.value.filter((user) => {
    return Object.values(user).some((value) =>
      String(value).toLowerCase().includes(q.value.toLowerCase())
    );
  });
});

// Pagination
const page = ref(1);
const pageCount = 5;
const rows = computed(() => {
  const start = (page.value - 1) * pageCount;
  const end = page.value * pageCount;
  return filteredRows.value.slice(start, end);
});
</script>
