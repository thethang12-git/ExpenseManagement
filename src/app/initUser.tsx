"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/src/store/hooks";
import { setUser } from "@/src/store/slices/user";
import { usePathname, useRouter } from "next/navigation";
import UserService from "../service/dataService";
import { setTransactions } from "../store/slices/transactions";
export default function InitUser() {
    const dispatch = useAppDispatch();
    const pathname = usePathname();
    const router = useRouter();
    useEffect(() => {
        const user = localStorage.getItem("userId");
        if (!user) return;
        const userTrueId = JSON.parse(user);
        UserService.getTransactions(userTrueId)
            .then((result) => {
                dispatch(setTransactions(result.data))
            })
            .catch((error) => {console.log(error)});
    }, [dispatch,pathname]);
    useEffect(() => {
        const user = localStorage.getItem("user");
        console.log(user);
        if (user) {
            dispatch(setUser(JSON.parse(user)));
            if(pathname == '/login' || pathname == '/register') {
                alert('Đã đăng nhập rồi, chuyển trang');
                router.push("/");
            }
        }
    }, [dispatch, pathname, router]);
    return null;
}
