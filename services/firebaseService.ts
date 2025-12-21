
// Standard modular Firebase imports for web SDK v9+
// Fix: Re-asserting the named export 'initializeApp' from the standard 'firebase/app' package.
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { MenuItem, Category } from '../types';

/**
 * ИНСТРУКЦИЯ:
 * 1. Создайте проект на https://console.firebase.google.com/
 * 2. Включите Realtime Database (в режиме Test Mode)
 * 3. Скопируйте конфиг из настроек проекта и замените данные ниже
 */
const firebaseConfig = {
  apiKey: "AIzaSyC--HfMxrpkZ4RKxtHpS8CljLYj9W-fUcM",
  authDomain: "na-ta-ya-menu.firebaseapp.com",
  databaseURL: "https://na-ta-ya-menu-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "na-ta-ya-menu",
  storageBucket: "na-ta-ya-menu.firebasestorage.app",
  messagingSenderId: "873896315582",
  appId: "1:873896315582:web:3ddeb0fff36fcbcef8ecef",
  measurementId: "G-JE2FTT49CT"
};

let db: any = null;
try {
  // Инициализация будет работать только если конфиг верный
  if (firebaseConfig.apiKey && firebaseConfig.apiKey !== "AIzaSyC--HfMxrpkZ4RKxtHpS8CljLYj9W-fUcM") {
    const app = initializeApp(firebaseConfig);
    db = getDatabase(app);
  } else {
    console.warn("Firebase credentials not set. Cloud sync disabled.");
  }
} catch (e) {
  console.error("Firebase init failed:", e);
}

export const syncDataWithCloud = async (menuItems: MenuItem[], categories: Category[]) => {
  if (!db) {
    alert("Firebase не настроен! Проверьте ключи в services/firebaseService.ts");
    return false;
  }
  try {
    await set(ref(db, 'menu'), {
      items: menuItems,
      categories: categories,
      updatedAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error("Cloud Sync Error:", error);
    return false;
  }
};

export const subscribeToMenuUpdates = (callback: (data: { items: MenuItem[], categories: Category[] }) => void) => {
  if (!db) return () => {};
  const menuRef = ref(db, 'menu');
  return onValue(menuRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      callback({
        items: data.items || [],
        categories: data.categories || []
      });
    }
  });
};
