import apiClient from './api';

// Foydalanuvchilar ro‘yxatini olish funksiyasi
export const getUsers = async () => {
  try {
    const response = await apiClient.get('/users');
    return response.data; // Javobdagi foydalanuvchilar ma’lumotlari
  } catch (error) {
    console.error('Foydalanuvchilarni olishda xatolik:', error);
    throw error; // Xatoni qaytarish
  }
};

// Foydalanuvchi tafsilotlarini olish funksiyasi
export const getUserById = async (id) => {
  try {
    const response = await apiClient.get(`/users/${id}`);
    return response.data; // Javobdagi tanlangan foydalanuvchi ma’lumotlari
  } catch (error) {
    console.error(`Foydalanuvchi ma’lumotlarini olishda xatolik (ID: ${id}):`, error);
    throw error;
  }
};
