
// Standard modular Firebase imports for web SDK v9+
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { MenuItem, Category } from '../types';

/**
 * Firebase configuration for Na-Ta-Ya Menu
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
  // Проверяем, что ключ установлен и это не стандартная заглушка
  const isKeySet = firebaseConfig.apiKey && 
                   firebaseConfig.apiKey !== "ВАШ_API_KEY" && 
                   firebaseConfig.apiKey.length > 10;

  if (isKeySet) {
    const app = initializeApp(firebaseConfig);
    db = getDatabase(app);
    console.log("Firebase initialized successfully");
  } else {
    console.warn("Firebase credentials not properly set. Cloud sync disabled.");
  }
} catch (e) {
  console.error("Firebase init failed:", e);
}

export const syncDataWithCloud = async (menuItems: MenuItem[], categories: Category[]) => {
  if (!db) {
    alert("Firebase не настроен! Проверьте ключи в services/firebaseService.ts. Убедитесь, что apiKey заполнен верно.");
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