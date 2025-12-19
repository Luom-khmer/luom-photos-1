import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// --- CẤU HÌNH FIREBASE CHÍNH THỨC ---
const firebaseConfig = {
  apiKey: "AIzaSyDdk8nZCyJUi5yYnk2IlUqGc0nmf65Fmvk",
  authDomain: "gen-lang-client-0082195972.firebaseapp.com",
  projectId: "gen-lang-client-0082195972",
  storageBucket: "gen-lang-client-0082195972.firebasestorage.app",
  messagingSenderId: "389932945616",
  appId: "1:389932945616:web:2a6a0d4752e03f225a4ed5",
  measurementId: "G-DKC1KELKR9"
};

// Khởi tạo Firebase (Singleton pattern để tránh lỗi duplicate app khi hot reload)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Khởi tạo Analytics (chỉ chạy ở phía client browser)
if (typeof window !== 'undefined') {
  try {
    getAnalytics(app);
  } catch (e) {
    console.warn("Firebase Analytics warning:", e);
  }
}

// Xuất Auth để sử dụng trong Header và các nơi khác
export const auth = getAuth(app);

// Hàm kiểm tra cấu hình luôn trả về true vì đã hardcode config đúng
export const isFirebaseConfigured = () => {
  return true;
};
