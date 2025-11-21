"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/src/store/hooks";
import { setUser } from "@/src/store/slices/user";
import { usePathname, useRouter } from "next/navigation";
export default function InitUser() {
    const dispatch = useAppDispatch();
    const pathname = usePathname();
    const router = useRouter();
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
