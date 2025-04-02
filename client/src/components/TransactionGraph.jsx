import React, { useEffect, useState, useContext } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { AppContext } from '../context/AppContext';
import { toast } from "react-toastify";

Chart.register(...registerables);

const TransactionGraph = () => {
    const [graphs, setGraphs] = useState({});
    const { fetchTransactionCount } = useContext(AppContext);

    useEffect(() => {
        const loadTransactions = async () => {
            try {
                const transactions = await fetchTransactionCount();
                if (!transactions || transactions.length === 0) {
                    toast.warn("No transaction data available");
                    return;
                }

                generateGraphs(transactions);
            } catch (error) {
                console.error("Error fetching transaction data:", error);
                toast.error("Failed to load transaction data");
            }
        };

        loadTransactions();
    }, [fetchTransactionCount]);

    const generateGraphs = (transactions) => {
        if (!transactions.length) return;

        // Transactions Over Time
        const dateCounts = {};
        transactions.forEach(({ date }) => {
            const formattedDate = new Date(date).toLocaleDateString();
            dateCounts[formattedDate] = (dateCounts[formattedDate] || 0) + 1;
        });

        const dateLabels = Object.keys(dateCounts);
        const dateData = Object.values(dateCounts);
        const peakTransactionDate = dateLabels[dateData.indexOf(Math.max(...dateData))];

        // Plan-wise Transactions
        const planCounts = {};
        transactions.forEach(({ plan }) => {
            planCounts[plan] = (planCounts[plan] || 0) + 1;
        });

        const planLabels = Object.keys(planCounts);
        const planData = Object.values(planCounts);
        const mostChosenPlan = planLabels[planData.indexOf(Math.max(...planData))];

        // Payment Status Distribution
        const paymentCounts = {
            Paid: transactions.filter(t => t.payment).length,
            Unpaid: transactions.filter(t => !t.payment).length,
        };

        // Credits vs Amount per Transaction
        const transactionLabels = transactions.map((_, i) => `Transaction ${i + 1}`);
        const amountData = transactions.map(t => t.amount);
        const creditData = transactions.map(t => t.credits);

        setGraphs({
            transactionsOverTime: {
                labels: dateLabels,
                datasets: [{
                    label: "Transactions Over Time",
                    data: dateData,
                    borderColor: "blue",
                    borderWidth: 2,
                    tension: 0.3,
                    fill: false,
                }],
                info: `Peak day: ${peakTransactionDate} (${Math.max(...dateData)} transactions)`
            },
            creditsVsAmount: {
                labels: transactionLabels,
                datasets: [
                    {
                        label: "Amount",
                        data: amountData,
                        backgroundColor: "purple",
                    },
                    {
                        label: "Credits",
                        data: creditData,
                        backgroundColor: "orange",
                    }
                ],
                info: "Comparison between Amount and Credits per transaction"
            },
            planDistribution: {
                labels: planLabels,
                datasets: [{
                    label: "Plans Chosen",
                    data: planData,
                    backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0"],
                }],
                info: `Most popular plan: ${mostChosenPlan}`
            },
            paymentStatus: {
                labels: ["Paid", "Unpaid"],
                datasets: [{
                    label: "Payment Status",
                    data: [paymentCounts.Paid, paymentCounts.Unpaid],
                    backgroundColor: ["green", "red"],
                }],
                info: `Paid: ${paymentCounts.Paid}, Unpaid: ${paymentCounts.Unpaid}`
            }
        });
    };

    return (
        <>
        <h3>Transaction Trends</h3>
        <div>
            <div className="graph-container">
                {Object.keys(graphs).map((key) => (
                    <div className="graph-box" key={key}>
                        <h4>{graphs[key].datasets[0].label}</h4>
                        {key === "planDistribution" || key === "paymentStatus" ? (
                            <Pie data={graphs[key]} height={200} width={400} />
                        ) : key === "creditsVsAmount" ? (
                            <Bar data={graphs[key]} height={200} width={400} />
                        ) : (
                            <Line data={graphs[key]} height={200} width={400} />
                        )}
                        <p>{graphs[key].info}</p>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};

export default TransactionGraph;
