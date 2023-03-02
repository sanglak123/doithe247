import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

function DashboardSystems(props) {
    const [activeMaintance, setActiveMaintance] = useState(false);
    const [theme, setTheme] = useState("Light");

    Chart.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend,
        ArcElement
    );

    Chart.defaults.color = 'black';

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',               
            },
            title: {
                display: true,
                text: "Thống Kê Năm 2023",              
                font: {
                    size: 30,
                },
            },

        },
    };

    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

    const data = {
        labels,       
        datasets: [
            {
                label: 'Change Cards',
                data: [65, 59, 80, 81, 56, 55, 100],
                color:"black",
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Buy Cards',              
                data: [15, 27, 33, 90, 66, 50, 80],
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    const data2 = {
        labels: ['Change Cards', 'Buy Cards'],     
        datasets: [
            {
                label: '# of Votes',
                data: [500, 102],               
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ]
    };
  
     return (
        <div id='dashboard_system'>
            <div className='system_content'>

                <div className='sytem_maintance bgr_white mt-2'>
                    <div className='hearder_hag'>
                        <h1>Bảo Trì Website</h1>
                    </div>
                    <Form.Check
                        type="switch"
                        checked={activeMaintance}
                        onChange={() => setActiveMaintance(!activeMaintance)}
                        id="custom-switch"
                        label={activeMaintance ? "Active" : "Disable"}
                    />
                </div>
                <div className='system_theme bgr_white mt-2'>
                    <div className='hearder_hag'>
                        <h1>Themes</h1>
                    </div>
                    <div className='themes_item'>
                        <Form.Check
                            type="switch"
                            checked={theme === "Light"}
                            onChange={() => setTheme("Dark")}
                            id="custom-switch"
                            label="Light"
                        />
                        <Form.Check
                            type="switch"
                            checked={theme === "Dark"}
                            onChange={() => setTheme("Light")}
                            id="custom-switch"
                            label="Dark"
                        />
                    </div>


                </div>
                <div className='system_chart bgr_white mt-2'>
                    <div className='hearder_hag'>
                        <h1>Thống Kê</h1>
                    </div>
                    <div className='chart_item'>
                        <div className='chart_month'>
                            <Bar options={options} data={data} />
                        </div>

                        <div className='chart_year'>
                            <Doughnut data={data2} />
                        </div>


                    </div>

                </div>

            </div>
        </div>
    );
}

export default DashboardSystems;