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
function DispatchSeperate({ children }: ProvidersProps) {
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
    }, [dispatch]);
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
            <DispatchSeperate>
                {children}
            </DispatchSeperate>
        </Provider>
        )
}
export default Providers
