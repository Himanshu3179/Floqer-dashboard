"use client"

import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import axios from 'axios';

interface SalaryData {
    work_year: number;
    job_title: string;
    salary_in_usd: number;
}

interface DataType {    
    work_year: number;
    total_jobs: number;
    average_salary: number;
}

const MainTable: React.FC<{ onRowClick: (year: number) => void }> = ({ onRowClick }) => {
    const [dataSource, setDataSource] = useState<DataType[]>([]);
    const fetchSalaries = async () => {
        const response = await axios.get<SalaryData[]>('api/salaries');
        const salaries = response.data;
        const summary: { [key: number]: { totalJobs: number, totalSalary: number } } = {};

        salaries.forEach(salary => {
            const year = salary.work_year;
            if (!summary[year]) {
                summary[year] = { totalJobs: 0, totalSalary: 0 };
            }
            summary[year].totalJobs += 1;
            summary[year].totalSalary += parseInt(salary.salary_in_usd.toString())

        });


        const data: DataType[] = Object.keys(summary).map(year => {
            const numericYear = +year;
            return {
                work_year: numericYear,
                total_jobs: summary[numericYear].totalJobs,
                average_salary: summary[numericYear].totalSalary / summary[numericYear].totalJobs
            };
        });
        setDataSource(data);
    };
    useEffect(() => {
        fetchSalaries();

    }, []);

    const columns = [
        { title: 'Year', dataIndex: 'work_year', key: 'year', sorter: (a: DataType, b: DataType) => a.work_year - b.work_year },
        { title: 'Total Jobs', dataIndex: 'total_jobs', key: 'totalJobs', sorter: (a: DataType, b: DataType) => a.total_jobs - b.total_jobs },
        { title: 'Average Salary (USD)', dataIndex: 'average_salary', key: 'averageSalary', sorter: (a: DataType, b: DataType) => a.average_salary - b.average_salary }
    ];

    return (
        <Table
            dataSource={dataSource}
            columns={columns}
            rowKey="work_year"
            onRow={(record) => ({
                onClick: () => { onRowClick(record.work_year); }
            })}
        />
    );
};

export default MainTable;
