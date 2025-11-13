"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/src/store/hooks";
import { setUser } from "@/src/store/slices/user";

export default function InitUser() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            dispatch(setUser(JSON.parse(user)));
        }
    }, []);

    return null;
}
