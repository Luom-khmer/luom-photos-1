import React, { useState } from 'react';
import { Settings, X, Save, HelpCircle, CheckCircle, AlertCircle } from 'lucide-react';

interface FirebaseConfigModalProps {
  onClose: () => void;
}

export const FirebaseConfigModal: React.FC<FirebaseConfigModalProps> = ({ onClose }) => {
  const [configJson, setConfigJson] = useState('');
  const [error, setError] = useState('');

  const handleSave = () => {
    try {
      // 1. Cố gắng parse JSON
      // Người dùng có thể paste cả đoạn "const firebaseConfig = { ... };" hoặc chỉ "{ ... }"
      let jsonString = configJson;
      
      // Xử lý đơn giản nếu người dùng paste cả biến JS
      if (jsonString.includes('=')) {
        jsonString = jsonString.substring(jsonString.indexOf('=') + 1);
        if (jsonString.trim().endsWith(';')) {
           jsonString = jsonString.trim().slice(0, -1);
        }
      }

      // Sửa lỗi cú pháp JS object keys không có quote (thường gặp khi copy từ docs)
      // Đây là regex cơ bản, tốt nhất nên yêu cầu paste JSON chuẩn
      const validJson = jsonString.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ');
      
      const parsed = JSON.parse(validJson);
      
      if (!parsed.apiKey || !parsed.authDomain) {
        throw new Error("Thiếu apiKey hoặc authDomain trong cấu hình.");
      }

      localStorage.setItem('firebase_app_config', JSON.stringify(parsed));
      alert("Đã lưu cấu hình! Trang sẽ tải lại để áp dụng.");
      window.location.reload();
      
    } catch (err: any) {
      console.error(err);
      setError("Định dạng không hợp lệ. Vui lòng chỉ copy phần nội dung trong dấu ngoặc nhọn { ... } từ Firebase Console.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-amber-600 text-white p-4 flex justify-between items-center">
          <h3 className="font-bold flex items-center text-lg">
            <Settings className="w-5 h-5 mr-2"/> Cấu hình Đăng Nhập (Firebase)
          </h3>
          <button onClick={onClose} className="hover:bg-amber-700 p-1 rounded transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-gray-700">
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start">
             <AlertCircle className="w-5 h-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
             <p className="text-sm text-amber-800">
               Tính năng Đăng nhập yêu cầu backend. Bạn cần cung cấp cấu hình <strong>Firebase Project</strong> của riêng bạn để hoạt động.
             </p>
          </div>

          <div className="space-y-3">
             <h4 className="font-bold text-gray-900 flex items-center">
                <HelpCircle className="w-4 h-4 mr-1 text-blue-600"/> Hướng dẫn lấy cấu hình:
             </h4>
             <ol className="list-decimal pl-5 text-sm space-y-2 marker:font-bold text-gray-600">
                <li>Truy cập <a href="https://console.firebase.google.com/" target="_blank" className="text-blue-600 underline hover:text-blue-800">Firebase Console</a> và tạo một Project mới.</li>
                <li>Vào mục <strong>Authentication</strong> &gt; thẻ <strong>Sign-in method</strong> &gt; Bật <strong>Google</strong>.</li>
                <li>Vào <strong>Project Settings</strong> (biểu tượng bánh răng) &gt; kéo xuống phần <strong>Your apps</strong>.</li>
                <li>Chọn icon Web <code>&lt;/&gt;</code> để tạo app, sau đó copy toàn bộ nội dung trong <code>firebaseConfig</code>.</li>
             </ol>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-900">
              Dán đoạn mã config vào đây (JSON object):
            </label>
            <textarea
              rows={8}
              className="w-full p-3 border border-gray-300 rounded-md font-mono text-xs bg-gray-50 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              placeholder={`{
  "apiKey": "AIzaSy...",
  "authDomain": "your-project.firebaseapp.com",
  "projectId": "your-project",
  "storageBucket": "...",
  "messagingSenderId": "...",
  "appId": "..."
}`}
              value={configJson}
              onChange={(e) => { setConfigJson(e.target.value); setError(''); }}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100"
          >
            Hủy bỏ
          </button>
          <button 
            onClick={handleSave}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm font-medium flex items-center shadow-sm"
          >
            <Save className="w-4 h-4 mr-2" />
            Lưu & Tải lại
          </button>
        </div>

      </div>
    </div>
  );
};
