"use client";

import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { authService, type AuthUser } from "../../service/authService";


type RegisterFormValues = {
  username: string;
  password: string;
  confirmPassword: string;
};


const RegisterSchema = Yup.object({
  username: Yup.string().min(3, "Tối thiểu 3 ký tự").required("Bắt buộc"),
  password: Yup.string().min(6, "Tối thiểu 6 ký tự").required("Bắt buộc"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Mật khẩu không khớp")
    .required("Bắt buộc"),
});

export default function RegisterPage() {
  const router = useRouter();


  const initialValues: RegisterFormValues = {
    username: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <div className="min-h-screen bg-[#f7eef9] flex items-center justify-center px-4">
      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] overflow-hidden bg-white">
          
          <div className="bg-[#5d81b1] text-white p-8 md:p-10 flex flex-col items-center justify-center order-2 md:order-1">
            <div className="text-center max-w-xs">
              <h2 className="text-3xl font-semibold">Welcome</h2>
              <p className="mt-2 text-sm text-white/90">
              chào mừng bạn trở lại - hãy đăng ký tài khoản 
              </p>
              <button
                onClick={() => router.push("/login")}
                className="mt-6 inline-flex items-center justify-center rounded-md bg-white/95 hover:bg-white text-[#000000] px-6 py-2 text-sm font-semibold transition-all duration-200 cursor-pointer hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-white/40 active:scale-95"
              >
                ĐĂNG NHẬP
              </button>
            </div>
          </div>

      
          <div className="p-8 md:p-10 order-1 md:order-2">
            <h1 className="text-2xl font-semibold text-[#5d81b1]">Đăng ký tài khoản</h1>
            <div className="mt-6">
      <Formik
       
        initialValues={initialValues}
        validationSchema={RegisterSchema}
        onSubmit={(values, { setFieldError, setSubmitting }) => {
         
          const users = authService.getUsers();
          
          const isTaken = users.some(
            (u: AuthUser) => u.username.trim() === values.username.trim()
          );
          if (isTaken) {
          
            setFieldError("username", "Username đã tồn tại");
            setSubmitting(false);
            return;
          }
          // Lưu user mới và chuyển sang trang đăng nhập
          authService.saveUser({
            username: values.username.trim(),
            password: values.password,
          });
          router.push("/login");
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

            <label className="text-xs font-medium text-gray-500">
              Confirm Password
            </label>
            <div className="grid gap-1.5">
              <Field
                name="confirmPassword"
                type="password"
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7a217d] focus:border-[#7a217d] transition"
                placeholder="Confirm Password"
              />
              <div className="text-xs text-red-600">
                <ErrorMessage name="confirmPassword" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-[#5d81b1] px-4 py-2.5 text-white text-sm font-semibold shadow-sm hover:bg-[#6a729c] focus:outline-none focus:ring-4 focus:ring-[#5d81b1]/30 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer active:scale-95 hover:shadow-lg"
            >
              ĐĂNG KÝ
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


