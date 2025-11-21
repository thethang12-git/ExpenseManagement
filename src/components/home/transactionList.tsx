import React, { useEffect, useRef, useState } from "react";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import { useScroll } from "@/src/app/scrollProvider";

export default function TransactionList({ transactions }: any) {
    const refs = useRef<Record<string, React.RefObject<HTMLDivElement>>>({});  // Lưu trữ các refs cho các giao dịch
    const { registerRef } = useScroll();  // Lấy hàm registerRef từ ScrollProvider
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 600);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        transactions.forEach((itm: any) => {
            if (!refs.current[itm.id]) {
                refs.current[itm.id] = React.createRef();
            }
            registerRef(`transaction-${itm.id}`, refs.current[itm.id]);
        });
    }, [transactions, registerRef]);

    if (loading || !transactions) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 2 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <div className="mt-8 w-full">
            <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
            <div className="space-y-4">
                {transactions.slice().reverse().map((itm: any) => {
                    const money = parseFloat(itm.money);
                    // Đảm bảo rằng mỗi giao dịch có một ref duy nhất
                    if (!refs.current[itm.id]) {
                        refs.current[itm.id] = React.createRef();
                    }
                    return (
                        <div
                            key={itm.id}
                            ref={refs.current[itm.id]}  // Gán ref cho phần tử
                            className="bg-white p-5 mb-4 rounded-lg shadow-md flex items-center justify-between hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-linear-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                                    🍔
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-lg font-semibold text-gray-800">{itm.name}</span>
                                    <span className="text-sm text-gray-500">{itm.note}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className={`font-bold ${money < 0 ? "text-red-500" : "text-green-500"}`}>
                                    {itm.money.toLocaleString('de-DE')} {itm.currency}
                                </span>
                                <div className="text-sm text-gray-400">{itm.date}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
