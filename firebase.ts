
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// --- CẤU HÌNH FIREBASE CỦA BẠN ---
// Bạn cần tạo project tại https://console.firebase.google.com/
// Bật Authentication > Sign-in method > Google
// Copy config vào bên dưới:

const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Khởi tạo Firebase
// Lưu ý: Nếu chưa thay config thật, app sẽ không lỗi ngay lập tức nhưng chức năng đăng nhập sẽ không hoạt động.
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
