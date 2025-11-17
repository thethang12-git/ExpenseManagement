"use client";
import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import { Button, TextField, Box, Typography, Link } from "@mui/material";
import GoogleButton from "../OathGoogle_button";
import UserService from "@/src/service/dataService";
import {useRouter} from "next/navigation";

function Login() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
        const user = await UserService.validateUser(values.email, values.password)
          if (user) {
            localStorage.setItem("email", JSON.stringify(values.email));
            localStorage.setItem("user", JSON.stringify(user.name ));
            localStorage.setItem("userId", JSON.stringify(user.id));
            console.log(user);
            alert("Đăng nhập thành công,chuyển trang!!");
            await router.push("/home");
          }
          else {
              alert('Mật khẩu hoặc tên đăng nhập sai, thử lại!')
              return
          }
    },
  });

  return (
    <Box
      sx={{
        // backgroundImage: "url('loginBackground.jpg')",
        // backgroundSize:'cover',
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          maxWidth: 400,
          width: "100%",
          p: 4,
          border: "1px solid #ccc",
          borderRadius: 2,
          boxShadow: 2,
          bgcolor: "rgba(255, 255, 255, 0)",
          backdropFilter: "blur(8px)",
        }}
      >
        <Typography variant="h5" align="center" mb={3}>
          Đăng nhập
        </Typography>

        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          margin="normal"
          value={formik.values.email}
          onChange={formik.handleChange}
          required
        />

        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          value={formik.values.password}
          onChange={formik.handleChange}
          required
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
        >
          Đăng nhập
        </Button>
          <div style={{textAlign: "right"}}>
              <Link
                  component="button"
                  variant="body2"
                  onClick={() => router.push("/register")}
              >
                  Đăng ký
              </Link>
          </div>
        <Typography align="center" mt={0.5} >
          OR
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <GoogleButton />
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
