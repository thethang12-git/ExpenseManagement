'use client';

import { Provider } from 'react-redux';
import { store } from './store';
import React, {useEffect} from "react";
import {usePathname, useRouter} from "next/navigation";
import UserService from "@/src/service/dataService";
import {setTransactions} from "@/src/store/slices/transactions";
import {useAppDispatch} from "@/src/store/hooks";

interface ProvidersProps {
    children: React.ReactNode;
}
function ValidateUser({children}:ProvidersProps) {
    const router = useRouter();
    const pathname = usePathname();
    const isLoginPage = pathname === '/login' || (pathname === '/register');
    useEffect(() => {
        const getId = JSON.parse(localStorage.getItem("userId") || "null");
        const getUser = JSON.parse(localStorage.getItem("user") || "null");
        const getEmail = JSON.parse(localStorage.getItem("email") || "null");
        UserService.validateUser(getEmail)
            .then((result) => {
                const validationResult = result.id == getId && result.name == getUser && result.username == getEmail;
                if(!isLoginPage) {
                    if (validationResult) {return}
                    else {
                        setTimeout(() => {
                            localStorage.clear();
                            router.push('/login');
                        },1000)
                        alert('sai thông tin,đăng nhập lại!')
                    }
                }
            })
            .catch((error) => {console.log(error)});
    }, [pathname, router]);
    return children;
}
function DispatchSeperate({ children }: ProvidersProps) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    useEffect(() => {
        const user = localStorage.getItem("userId");
        if (!user) return;
        const userTrueId = JSON.parse(user);
        UserService.getTransactions(userTrueId)
            .then((result) => {
                dispatch(setTransactions(result.data))
            })
            .catch((error) => {console.log(error)});
    }, [dispatch,router]);
    return children;
}
function Providers({ children }: ProvidersProps) {
    const router = useRouter();
    const pathname = usePathname();
    const isLoginPage = pathname === '/login' || (pathname === '/register');
    useEffect(() => {
        if (isLoginPage) return
        const currentUser = localStorage.getItem('email');
        if(currentUser) {
            console.log('xin chào' + ' ' + currentUser);
        }
        else {
            alert('không tìm thấy dữ liệu người dùng, chuyển trang đăng nhập ....')
            router.push('/login');
        }
    }, [isLoginPage, router]);

    return (
        <Provider store={store}>
            <ValidateUser>
                <DispatchSeperate>
                    {children}
                </DispatchSeperate>
            </ValidateUser>
        </Provider>
        )
}
export default Providers
