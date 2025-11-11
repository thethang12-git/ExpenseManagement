"use client";

import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { authService } from "../../service/authService";
import { useState } from "react";

// Kiểu dữ liệu cho form đăng nhập
type LoginFormValues = {
  username: string;
  password: string;
};

// Schema dùng Yup để validate form
const LoginSchema = Yup.object({
  username: Yup.string().required("Bắt buộc"),
  password: Yup.string().required("Bắt buộc"),
});

export default function LoginPage() {
  const router = useRouter();
  // Thông báo lỗi chung (ví dụ: sai tài khoản/mật khẩu)
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(false);

  // Giá trị khởi tạo của Formik
  const initialValues: LoginFormValues = {
    username: "",
    password: "",
  };

  return (
    <div className="min-h-screen bg-[#f7eef9] flex items-center justify-center px-4">
      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] overflow-hidden bg-white">
          {/* Left - Welcome */}
          <div className="bg-[#5d81b1] text-white p-8 md:p-10 flex flex-col items-center justify-center">
            <div className="text-center max-w-xs">
              <h2 className="text-3xl font-semibold">Welcome</h2>
              <p className="mt-2 text-sm text-white/90">
                chào mừng bạn trở lại - hãy đăng nhập
              </p>
              <button
                onClick={() => router.push("/register")}
                className="mt-6 inline-flex items-center justify-center rounded-md bg-white/95 hover:bg-white text-[#000000] px-6 py-2 text-sm font-semibold transition-all duration-200 cursor-pointer hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-white/40 active:scale-95"
              >
                ĐĂNG KÝ
              </button>
            </div>
          </div>

          {/* Right - Sign In Form */}
          <div className="p-8 md:p-10">
            <h1 className="text-2xl font-semibold text-[#5d81b1]">Đăng nhập</h1>
            <div className="mt-6">
      <Formik
        // Gắn giá trị khởi tạo và schema vào Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting }) => {
          // Reset message trước khi submit
          setStatusMessage("");
          // Tìm user trong localStorage bằng authService
          const user = authService.findUser(
            values.username.trim(),
            values.password
          );
          if (!user) {
            // Không tìm thấy -> báo lỗi chung
            setStatusMessage("Sai username hoặc mật khẩu");
            setSubmitting(false);
            return;
          }
          // Lưu user hiện tại và chuyển sang trang chủ
          authService.setCurrentUser(user);
          // Ghi nhớ đăng nhập (minh họa giao diện - không lưu thực)
          if (remember) {
            // Có thể mở rộng: lưu flag remember vào localStorage nếu cần
          }
          router.replace("/");
        }}
      >
        {({ isSubmitting }) => (
          <Form className="grid gap-4 max-w-sm">
            <label className="text-xs font-medium text-gray-500">Email</label>
            <div className="grid gap-1.5">
              <Field
                name="username"
                type="text"
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7a217d] focus:border-[#7a217d] transition"
                placeholder="Email"
              />
              <div className="text-xs text-red-600">
                <ErrorMessage name="username" />
              </div>
            </div>

            <label className="text-xs font-medium text-gray-500">Password</label>
            <div className="grid gap-1.5">
              <Field
                name="password"
                type="password"
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7a217d] focus:border-[#7a217d] transition"
                placeholder="Password"
              />
              <div className="text-xs text-red-600">
                <ErrorMessage name="password" />
              </div>
            </div>

            <div className="mt-1 flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-xs text-gray-600 select-none">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-3.5 w-3.5 rounded border-gray-300 text-[#7a217d] focus:ring-[#7a217d]"
                />
                Remember me
              </label>
              <button
                type="button"
                className="text-xs text-gray-500 hover:text-[#7a217d] underline cursor-pointer"
                onClick={() => alert("Chức năng quên mật khẩu (demo)")} // demo
              >
                Forgot password?
              </button>
            </div>

            {statusMessage && (
              <div className="text-sm text-red-600">{statusMessage}</div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-[#5d81b1] px-4 py-2.5 text-white text-sm font-semibold shadow-sm hover:bg-[#6a729c] focus:outline-none focus:ring-4 focus:ring-[#5d81b1]/30 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer active:scale-95 hover:shadow-lg"
            >
              ĐĂNG NHẬP
            </button>
          </Form>
        )}
      </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


