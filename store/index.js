import { defineStore } from "pinia";

export const useStore = defineStore("store", {
  state: () => {
    return {
      isOpen: false,
      selectedItem: [],
    };
  },

  actions: {
    openModal(data) {
      this.selectedItem = data;
      this.isOpen = true;
    },
    closeModal() {
      this.isOpen = false;
      this.selectedItem = [];
    },
  },
});
