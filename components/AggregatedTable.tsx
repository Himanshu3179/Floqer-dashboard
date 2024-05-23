"use client"
// components/AggregatedTable.tsx
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import axios from 'axios';


interface SalaryData {
    work_year: number;
    job_title: string;
}

interface AggregatedData {
    job_title: string;
    count: number;
}

const AggregatedTable: React.FC<{ year: number }> = ({ year }) => {
    const [dataSource, setDataSource] = useState<AggregatedData[]>([]);

    const fetchSalaries = async () => {
        const response = await axios.get<SalaryData[]>('api/salaries');
        const salaries = response.data;

        const filteredSalaries = salaries.filter(salary => parseInt(salary.work_year.toString()) === parseInt(year.toString()));

        const jobSummary: { [key: string]: number } = {};
        filteredSalaries.forEach(salary => {
            const title = salary.job_title;
            if (!jobSummary[title]) {
                jobSummary[title] = 0;

            }
            jobSummary[title] += 1;
        });

        const data: AggregatedData[] = Object.keys(jobSummary).map(title => ({
            job_title: title,
            count: jobSummary[title]
        }));

        console.log("data", data);
        setDataSource(data);
    };

    useEffect(() => {
        fetchSalaries();
    }, [year]);

    const columns = [
        { title: 'Job Title', dataIndex: 'job_title', key: 'jobTitle' },
        { title: 'Count', dataIndex: 'count', key: 'count' }
    ];

    return (
        <Table
            dataSource={dataSource}
            columns={columns}
            rowKey="job_title"
            pagination={false}
        />
    );
};

export default AggregatedTable;