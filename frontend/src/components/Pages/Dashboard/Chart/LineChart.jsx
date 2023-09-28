import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import request from '../../../../utils/request';

export default function LineChart() {
    const [dataCount, setDataCount] = useState([]);

    const fetchDataCount = async () => {
        try {
            const response = await axios.get(`${request.defaults.baseURL}count/line-chart`);
            const data = response.data;
            setDataCount(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const initializeChart = () => {
        const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        const datasets = [
            {
                label: 'Accident',
                data: dataCount[0],
                borderColor: 'red',
                backgroundColor: 'red',
            },
            {
                label: 'Maintenance',
                data: dataCount[1],
                borderColor: 'blue',
                backgroundColor: 'blue',
            },
            {
                label: 'Cleaning',
                data: dataCount[2],
                borderColor: 'green',
                backgroundColor: 'green',
            }
        ];

        const data = {
            labels: labels,
            datasets: datasets
        };

        const options = {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'The overall performance of the project'
                }
            },
            scales: {
                y: {
                    suggestedMin: 30,
                    suggestedMax: 50,
                }
            }
        };

        return { data, options };
    };

    useEffect(() => {
        fetchDataCount();
    }, []);

    return (
        <div className='canvas-chart'>
            <Line data={initializeChart().data} options={initializeChart().options} />
        </div>
    );
}
