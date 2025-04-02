    import React, { useEffect, useState, useContext } from "react";
    import { Line } from "react-chartjs-2";
    import { Chart, registerables } from "chart.js";
    import { AppContext } from '../context/AppContext';
    import { toast } from "react-toastify";

    Chart.register(...registerables);

    const UserGraph = () => {
        const [userData, setUserData] = useState({ labels: [], datasets: [] });
        const [registrationTimes, setRegistrationTimes] = useState([]);
        const { fetchUserCount } = useContext(AppContext);

        useEffect(() => {
            const loadUsers = async () => {
                try {
                    const data = await fetchUserCount();
                    if (!data || data.userCount === undefined) {
                        toast.warn("No user data available");
                        return;
                    }

                    setRegistrationTimes(data.registrationTimes || []);
                    createGraphs(data.userCount, data.registrationTimes);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    toast.error("Failed to load user data");
                }
            };

            loadUsers();
        }, [fetchUserCount]);

        const createGraphs = (userCount, registrationTimes) => {
            const dateCounts = {};
            registrationTimes.forEach(time => {
                const date = new Date(time).toLocaleDateString();
                dateCounts[date] = (dateCounts[date] || 0) + 1;
            });
            
            const dailyLabels = Object.keys(dateCounts);
            const dailyData = dailyLabels.map(date => dateCounts[date]);
            
            setUserData({
                totalUsersGraph: {
                    labels: ["Total Users"],
                    datasets: [{ label: "Users Registered", data: [userCount], borderColor: "blue", borderWidth: 2 }],
                    info: `Total registered users: ${userCount}`
                },
                registrationGraph: {
                    labels: registrationTimes.map(time => new Date(time).toLocaleDateString()),
                    datasets: [{ label: "User Registrations Over Time", data: registrationTimes.map(() => 1), borderColor: "green", borderWidth: 2 }],
                    info: `Users registered over different dates.`
                },
                dailyUsersGraph: {
                    labels: dailyLabels,
                    datasets: [{ label: "Users Entered on Date", data: dailyData, borderColor: "purple", borderWidth: 2 }],
                    info: `Peak registration day: ${dailyLabels[dailyData.indexOf(Math.max(...dailyData))]} with ${Math.max(...dailyData)} users`
                },
                comparisonGraph: {
                    labels: ["Total Users", ...dailyLabels],
                    datasets: [
                        { label: "Total Users", data: [userCount, ...dailyData], borderColor: "blue", borderWidth: 2 },
                        { label: "Users Registered Over Time", data: [0, ...dailyData], borderColor: "red", borderWidth: 2 }
                    ],
                    info: "Comparison of total users vs daily registrations"
                }
            });
        };

        return (
            <>
            <h3>User Registration Trends</h3>
            <div className="graph-container">
                {["totalUsersGraph", "registrationGraph", "dailyUsersGraph", "comparisonGraph"].map((key) => (
                    userData[key] && userData[key].labels.length > 0 && (
                        <div className="graph-box" key={key}>
                            <h4>{userData[key].datasets[0].label}</h4>
                            <Line data={userData[key]} height={200} width={400} />
                            <p>{userData[key].info}</p>
                        </div>
                    )
                ))}
            </div>
            </>
        );
    };

    export default UserGraph;