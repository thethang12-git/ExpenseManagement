import React from "react";

// Component danh sách giao dịch
export default function TransactionList({transactions}:any) {
    return (
        <div className="mt-8 w-full">
            <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
            <div className="space-y-4">
                <div className="bg-white p-5 mb-4 rounded-lg shadow-md flex items-center justify-between hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                            🍔
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-semibold text-gray-800">Food</span>
                            <span className="text-sm text-gray-500">transaction description</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="font-bold text-red-500">-100,000 ₫</span>
                        <div className="text-sm text-gray-400">2025-11-14</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
