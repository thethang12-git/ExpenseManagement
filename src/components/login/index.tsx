"use client";
import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import emailjs from "@emailjs/browser";
import { Button, TextField, Box, Typography } from "@mui/material";
import GoogleButton from "../OathGoogle_button";

function Login() {
  const [toggle, setToggle] = useState(true); 
  const [otpSent, setOtpSent] = useState(false);
  const otp = useRef<number | undefined>(undefined);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      OTP: "",
    },
    onSubmit: (values) => {
      if (toggle) {
        // Gửi OTP
        otp.current = Math.floor(100000 + Math.random() * 900000);
        const templateParams = {
          reply_to: values.email,
          password: values.password,
          passcode: otp.current,
        };

        emailjs
          .send(
            "service_0zq428t",
            "template_a1un4ul",
            templateParams,
            "nlUaqVMyxnXcmXKTk"
          )
          .then(() => {
            alert("OTP đã gửi vào email của bạn!");
            setToggle(false);
            setOtpSent(true);
          })
          .catch(() => alert("Gửi OTP thất bại, kiểm tra lại email!"));
      } else {
        if (Number(values.OTP) === otp.current) {
          alert("Đăng nhập thành công!");
        } else {
          alert("OTP sai, vui lòng thử lại!");
        }
      }
    },
  });

  return (
    <Box
      sx={{
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

        {otpSent && (
          <TextField
            label="OTP"
            name="OTP"
            type="number"
            fullWidth
            margin="normal"
            value={formik.values.OTP}
            onChange={formik.handleChange}
          />
        )}

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
        >
          {toggle ? "Gửi OTP" : "Đăng nhập"}
        </Button>

        <Typography align="center" mt={2} mb={1}>
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
