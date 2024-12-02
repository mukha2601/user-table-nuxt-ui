import axios from "axios";

// API konfiguratsiyasi
const apiClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com", // Asosiy API URL
  timeout: 5000, // Maksimal kutish vaqti (millisekundlarda)
  headers: {
    "Content-Type": "application/json", // So‘rov uchun kontent turi
    Accept: "application/json", // Qabul qilinadigan javob turi
  },
});

export default apiClient;
