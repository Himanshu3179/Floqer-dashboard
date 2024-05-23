// components/SalaryLineGraph.tsx
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

interface DataPoint {
    year: number;
    average_salary: number;
}

interface SalaryData {
    work_year: number;
    salary_in_usd: number;
}

const SalaryLineGraph: React.FC = () => {
    const [data, setData] = useState<DataPoint[]>([]);

    const fetchSalaries = async () => {
        const response = await axios.get<SalaryData[]>('api/salaries');
        const salaries = response.data;

        const summary: { [key: number]: { totalSalary: number, count: number } } = {};

        salaries.forEach(salary => {
            const year = salary.work_year;
            if (!summary[year]) {
                summary[year] = { totalSalary: 0, count: 0 };
            }
            summary[year].totalSalary += parseInt(salary.salary_in_usd.toString());
            summary[year].count += 1;
        });

        const data: DataPoint[] = Object.keys(summary).map((year: string) => {
            const numericYear = parseInt(year);
            return {
                year: numericYear,
                average_salary: summary[numericYear].totalSalary / summary[numericYear].count
            };
        });

        setData(data);
    };

    useEffect(() => {
        fetchSalaries();
    }, []);

    return (
        <LineChart width={600} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="average_salary" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
    );
};

export default SalaryLineGraph;
