"use client"
import React, { useState } from 'react';
import MainTable from '../components/MainTable';
import SalaryLineGraph from '@/components/SalaryLineGraph';
import AggregatedTable from '@/components/AggregatedTable';
import { Layout, Row, Col } from 'antd';

const { Header, Content } = Layout;

const Home: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const handleRowClick = (year: number) => {
    setSelectedYear(year);
  };

  return (
    <Layout>
      <Header>
        <h1 style={{ color: 'white' }}>ML Engineer Salaries</h1>
      </Header>
      <Content style={{ padding: '20px' }}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <MainTable onRowClick={handleRowClick} />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <SalaryLineGraph />
          </Col>
        </Row>
        {selectedYear !== null && (
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <h2>Job Titles for {selectedYear}</h2>
              <AggregatedTable year={selectedYear} />
            </Col>
          </Row>
        )}
      </Content>
    </Layout>
  );
};

export default Home;
