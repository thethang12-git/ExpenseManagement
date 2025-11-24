"use client"
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

export default function Test() {

    const transactions = useSelector((state: RootState) => state.transactions.list);

    const labels = [
        'Jan', 'Feb', 'March', 'Apr', 'May', 'June', 'July',
        'Aug', 'Sept', 'Oct', "Nov", "Dec"
    ];

    const data = {
        labels,
        datasets: [
            {
                label: 'Inflow',
                data: transactions.map((item: { money: any; }) => item.money > 0 ? item.money : 0),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Outflow',
                data: transactions.map((item: { money: any; }) => item.money < 0 ? item.money : 0),
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
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Transaction Chart',
            },
        },
    };

    return (
        <div style={{ width:'100%',height:'100vh' }}>
            <Bar style={{height:'80vh'}} options={options} data={data} />
        </div>
    )
}
