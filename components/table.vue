<template>
    <Modal v-if="store.isOpen" />
    <div class="p-4 overflow-hidden">
      <!-- Foydalanuvchi ismi bo‘yicha filtr -->
      <div class="my-4">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by name..."
          class="border px-4 py-2 rounded w-full"
        />
      </div>
  
      <!-- Jadval -->
      <div class="overflow-x-auto h-auto">
        <table class="w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr >
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
              >
                ID
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
              >
                Name
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
              >
                Email
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
              >
                Phone
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
              >
                Website
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
              >
                Company
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
              >
                Address
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              :key="user?.id"
              v-for="user in paginatedUsers"
              class="hover:bg-gray-300 cursor-pointer"
              @click="store.openModal(user)"
            >
              <td class="px-6 py-4 text-sm text-gray-500">{{ user?.id }}</td>
              <td class="px-6 py-4 text-sm text-gray-900">{{ user?.name }}</td>
              <td class="px-6 py-4 text-sm text-gray-500">{{ user?.email }}</td>
              <td class="px-6 py-4 text-sm text-gray-500">{{ user?.phone }}</td>
              <td class="px-6 py-4 text-sm text-blue-500">
                <a :href="`http://${user?.website}`" target="_blank">{{
                  user?.website
                }}</a>
              </td>
              <td class="px-6 py-4 text-sm text-gray-500">
                {{ user?.company.name }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-500">
                {{ user?.address.street }}, {{ user?.address.suite }},
                {{ user?.address.city }}, {{ user?.address.zipcode }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <div class="flex justify-center mt-4">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-4 py-2 bg-gray-200 text-gray-700 rounded-l"
        >
          Previous
        </button>
        <span class="px-4 py-2 bg-gray-100 text-gray-700">
          Page {{ currentPage }} of {{ totalPages }}
        </span>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 bg-gray-200 text-gray-700 rounded-r"
        >
          Next
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { getUsers } from "@/services/userService";
  import { useStore } from "~/store/index";
  const store = useStore();
  
  const users = ref([]);
  const isLoading = ref(true);
  const error = ref(null);
  
  onMounted(async () => {
    try {
      users.value = await getUsers();
    } catch (err) {
      error.value = "Foydalanuvchilarni yuklashda xatolik yuz berdi";
    } finally {
      isLoading.value = false;
    }
  });
  
  const searchQuery = ref("");
  
  const currentPage = ref(1);
  const itemsPerPage = 5;
  
  const filteredUsers = computed(() => {
    if (!searchQuery.value) {
      return users.value;
    }
    return users.value.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
  
  const totalPages = computed(() =>
    Math.ceil(filteredUsers.value.length / itemsPerPage)
  );
  
  const paginatedUsers = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredUsers.value.slice(start, end);
  });
  
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
    }
  };
  
  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  };
  </script>
  