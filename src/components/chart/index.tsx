"use client";
import { RootState } from "@/src/store/store";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector } from "react-redux";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function ChartPopup({ open, onClose }: { open: boolean, onClose: () => void }) {

    if (!open) return null;

    const transactions = useSelector((state: RootState) => state.transactions.list);

    const labels = ['Jan', 'Feb', 'March', 'Apr', 'May', 'June', 'July',
        'Aug', 'Sept', 'Oct', "Nov", "Dec"
    ];

    const data = {
        labels,
        datasets: [
            {
                label: 'Inflow',
                data: transactions.map((item: { money: number; }) => item.money > 0 ? item.money : 0),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Outflow',
                data: transactions.map((item: { money: number; }) => item.money < 0 ? item.money : 0),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    const options = {
        scales: {
            y: {
                min: -1000000,
                max: 1000000,
            }
        },
        responsive: true,
        plugins: {
            legend: { position: 'top' as const},
            title: {
                display: true,
                text: 'Transactions Chart',
            },
        },
    };

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-3xl h-[80vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Statistics</h2>
                    <button
                        className="text-red-500 font-bold text-lg"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>

                {/* Chart */}
                <div className="flex-1">
                    <Bar options={options} data={data} />
                </div>
            </div>
        </div>
    );
}
