'use client'

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, ScatterChart, Scatter, TooltipProps } from 'recharts';
import { useChartData } from '../../hooks/useChartData';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

//structuring the candlestick data
interface CandlestickDataPoint {
  x: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

//Creating CustomToolTip component to help with candlestick chart
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: CandlestickDataPoint;
  }>;
  label?: string;
}


const Dashboard: React.FC = () => {
  const { lineData, barData, pieData, candlestickData } = useChartData();

  console.log('Dashboard data:', { lineData, barData, pieData, candlestickData });

  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length > 0) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border border-gray-300 p-2 shadow-md" role="tooltip">
          <p className="font-bold">{`Date: ${data.x}`}</p>
          <p>{`Open: ${data.open}`}</p>
          <p>{`High: ${data.high}`}</p>
          <p>{`Low: ${data.low}`}</p>
          <p>{`Close: ${data.close}`}</p>
        </div>
      );
    }
    return null;
  };

  //Creation of dashboard UI
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Chart Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/*Line Chart*/}
        <section className="bg-white p-4 rounded-lg shadow" aria-labelledby="line-chart-title">
          <h2 id="line-chart-title" className="text-xl font-semibold mb-4 text-gray-700">Line Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </section>

        {/*Bar Chart*/}
        <section className="bg-white p-4 rounded-lg shadow" aria-labelledby="bar-chart-title">
          <h2 id="bar-chart-title" className="text-xl font-semibold mb-4 text-gray-700">Bar Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </section>

        {/*Pie Chart*/}
        <section className="bg-white p-4 rounded-lg shadow" aria-labelledby="pie-chart-title">
          <h2 id="pie-chart-title" className="text-xl font-semibold mb-4 text-gray-700">Pie Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData.data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </section>

        {/*Candlestick Chart
        I was not able to get the candlestick chart to work and began to run low on time so I had to skip it, 
        this is a jumble of different code snippets I found that I was attempting to use */}
        <section className="bg-white p-4 rounded-lg shadow" aria-labelledby="candlestick-chart-title">
          <h2 id="candlestick-chart-title" className="text-xl font-semibold mb-4 text-gray-700">Candlestick Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid />
              <XAxis dataKey="x" name="Date" />
              <YAxis type="number" domain={['auto', 'auto']} name="Price" />
              <Tooltip content={<CustomTooltip />} />
              <Scatter name="Stock" data={candlestickData.data} fill="#8884d8">
                {candlestickData.data.map((entry, index) => (
                  <rect
                    key={`rect-${index}`}
                    x={index * 40}
                    y={Math.min(entry.open, entry.close)}
                    width={30}
                    height={Math.abs(entry.open - entry.close)}
                    fill={entry.open > entry.close ? "#c23531" : "#06982d"}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;