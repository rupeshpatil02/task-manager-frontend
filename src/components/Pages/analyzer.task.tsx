import React, { useState, useEffect } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import Sidebar from '../NavBars/side.navbar';
import TopNavbar from '../NavBars/top.navbar';
import { getAnalysis } from '../../services/analysis';

const options = {
    cutoutPercentage: 80,
    maintainAspectRatio: false,
    legend: {
        display: true,
        position: 'bottom'
    }
};

const Analyzer = () => {
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState(0);
    const [completedTasks, setCompletedTasks] = useState(0);
    const [notCompletedTasks, setNotCompletedTasks] = useState(0);
    const [starredTasks, setStarredTasks] = useState(0);
    const [notStarredTasks, setNotStarredTasks] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleMonthChange = (e: any) => {
        setSelectedMonth(e.target.value);
    };

    const handleYearChange = (e: any) => {
        // setSelectedYear(e.target.value);
       const year = parseInt(e.target.value);
         setSelectedYear(year);
    };

    useEffect(() => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        setSelectedYear(currentYear);

        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const currentMonth = monthNames[currentDate.getMonth()];
        setSelectedMonth(currentMonth);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (selectedMonth && selectedYear) {
                setLoading(true);
                try {
                    const userIdString = localStorage.getItem("user");
                    if (userIdString !== null) {
                        const userId = parseInt(userIdString);
                        const response = await getAnalysis({ userId, month: selectedMonth, year: selectedYear });
                        const data = response.data;
                        if(data.data !==null){
                        setCompletedTasks(data.data.completedTask);
                        setNotCompletedTasks(data.data.pendingTask);
                        setStarredTasks(data.data.starredTask);
                        setNotStarredTasks(data.data.notStarredTask);
                        }else{
                            setCompletedTasks(0);
                            setNotCompletedTasks(0);
                            setStarredTasks(0);
                            setNotStarredTasks(0);   
                        }

                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [selectedMonth, selectedYear]);

    const totalTasks = completedTasks + notCompletedTasks;

    const taskCompletionChartData = {
        labels: ['Complete', 'Not Completed'],
        datasets: [
            {
                data: [completedTasks, notCompletedTasks],
                backgroundColor: [
                    'rgba(7, 1, 192, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                hoverBackgroundColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 0
            }
        ]
    };

    const starredTaskChartData = {
        labels: ['Starred', 'Not Starred'],
        datasets: [
            {
                data: [starredTasks, notStarredTasks],
                backgroundColor: [
                    'rgba(2, 2, 8, 1)',
                    'rgba(5, 200, 200, 1)'
                ],
                hoverBackgroundColor: [
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(54, 162, 235, 0.8)'
                ],
                borderWidth: 0
            }
        ]
    };

    const taskCompletionBarChartData = {
        labels: ['Completed', 'Not Completed', 'Total'],
        datasets: [
            {
                label: 'Tasks',
                backgroundColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 2,
                data: [completedTasks, notCompletedTasks, totalTasks]
            }
        ]
    };

    return (
        <div className="container-fluid" style={{ position: 'relative', height: '100vh', width: '100%' }}>
            <div className="d-flex">
                <Sidebar />
                <div className="flex-grow-1">
                    <TopNavbar onSearch={() => { }} />
                    <div className="position-relative ml-auto mt-3">
                        <select value={selectedMonth} onChange={handleMonthChange}>
                            <option value="">Select Month</option>
                            <option value="January">January</option>
                            <option value="February">February</option>
                            <option value="March">March</option>
                            <option value="April">April</option>
                            {/* Add other months */}
                        </select>
                        <select value={selectedYear} onChange={handleYearChange} style={{ marginLeft: "20px" }}>
                            <option value="">Select Year</option>
                            {Array.from({ length: new Date().getFullYear() - 2022 }, (_, i) => 2023 + i).map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                    {loading && <p>Loading...</p>}
                    {!loading && selectedMonth && selectedYear && (
                        <>
                            <div style={{ margin: "3%" }}>
                                <div style={{ width: '200px', height: '200px', marginLeft: "150px", display: 'inline-block' }}>
                                    <Doughnut data={taskCompletionChartData} options={options} />
                                </div>
                                <div style={{ width: '200px', height: '200px', display: 'inline-block', marginLeft: "100px" }}>
                                    <Doughnut data={starredTaskChartData} options={options} />
                                </div>
                            </div>
                            <div style={{ height: "250px", width: "400px", marginLeft: "230px" }}>
                                <Bar data={taskCompletionBarChartData} />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Analyzer;
