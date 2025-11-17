"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import UserService from "@/src/service/dataService";

interface Transaction {
  id: number;
  userId: number;
  money: number;
  date: string;
}

export default function TestTransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const userId = 1; // Thay userId cần test
  const month = "11"; // Tháng cần test (MM)
  const year = "2025"; // Năm cần test (YYYY)

  useEffect(() => {
    UserService.getTransactionsByMonth(userId,month,year).then(res =>
        setTransactions(res.data)
    ).catch(err => console.log(err))
    },[]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Transactions tháng {month}/{year}
      </h1>
      <table className="border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-3 py-1">ID</th>
            <th className="border border-gray-300 px-3 py-1">Date</th>
            <th className="border border-gray-300 px-3 py-1">Money</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td className="border border-gray-300 px-3 py-1">{t.id}</td>
              <td className="border border-gray-300 px-3 py-1">{t.date}</td>
              <td className="border border-gray-300 px-3 py-1">{t.money}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
