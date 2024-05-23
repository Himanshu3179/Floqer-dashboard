"use client"
import React, { useState } from 'react';
import MainTable from '../components/MainTable';
import SalaryLineGraph from '@/components/SalaryLineGraph';
import AggregatedTable from '@/components/AggregatedTable';
import { Layout, Row, Col } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;

const Home: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const handleRowClick = (year: number) => {
    setSelectedYear(year);
  };
  const handleClose = () => {
    setSelectedYear(null);
  };

  return (
    <Layout className="min-h-screen bg-gray-100">
      <Header className="bg-blue-950 text-white text-center text-2xl
        flex items-center justify-center font-mono
      ">
        ML Engineer Salaries
      </Header>
      <Content className="p-4">
        <div className="flex flex-col lg:flex-row lg:space-x-4">
          <div className="lg:w-2/3 w-full mb-4 lg:mb-0">
            <MainTable onRowClick={handleRowClick} />
            <SalaryLineGraph />
          </div>
          {selectedYear !== null && (
            <div className="relative lg:w-1/3 w-full lg:h-[500px] h-auto overflow-y-auto bg-white shadow-lg p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Job Titles for {selectedYear}</h2>
                <CloseOutlined onClick={handleClose} className="cursor-pointer text-lg text-gray-500 hover:text-gray-800" />
              </div>
              <AggregatedTable year={selectedYear} />
            </div>
          )}
          {
            selectedYear === null && (
              <div className='mt-5'>
                <p className='bg-neutral-200 h-fit w-fit px-5 py-2 rounded-full italic '>
                  click on a row to see the job titles for that year</p>
              </div>
            )
          }
        </div>
      </Content>
    </Layout>
  );
};

export default Home;
