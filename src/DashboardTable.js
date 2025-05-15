// DistributorTable.js

import React, { useState, useMemo } from 'react';
import DistributorCard from './DashboardCard';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './DashboardTable.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const mockDistributors = [
  { id: 1, name: 'Alpha Distributors', status: 'On Track', sales: 50000, shippedLastMonth: 4800,
    forecastedNextMonth: 5300,ytdAverage: 5100 },
  { id: 2, name: 'Beta Supply Co.', status: 'At Risk', sales: 15000, shippedLastMonth: 9800,
    forecastedNextMonth: 4300,ytdAverage: 6100},
  { id: 3, name: 'Gamma Wholesale', status: 'Overperforming', sales: 90000, shippedLastMonth: 5200,
    forecastedNextMonth: 5200,ytdAverage: 5000 },
  { id: 4, name: 'Delta Traders', status: 'On Track', sales: 30000, shippedLastMonth: 2200,
    forecastedNextMonth: 4900,ytdAverage: 8000},
  { id: 5, name: 'Epsilon Logistics', status: 'At Risk', sales: 10000, shippedLastMonth: 8900,
    forecastedNextMonth: 6200,ytdAverage: 7000 },
  { id: 7, name: 'Eclipse Corp', status: 'Overperforming', sales: 140000, shippedLastMonth: 2300,
    forecastedNextMonth: 5400,ytdAverage: 5500},
  { id: 8, name: 'SolSun Trades Pvt Ltd', status: 'Overperforming', sales: 180000, shippedLastMonth: 2500,
    forecastedNextMonth: 7700,ytdAverage: 7700},
  { id: 9, name: 'SooYoung Distributors', status: 'At Risk', sales: 10000, shippedLastMonth: 4900,
    forecastedNextMonth: 800,ytdAverage: 5600 },
  { id: 10, name: 'Bowl&Quill Global Foods', status: 'On Track', sales: 80000, shippedLastMonth: 9900,
    forecastedNextMonth: 10000,ytdAverage: 7700 },
  { id: 11, name: 'ABC Distributors', status: 'Overperforming', sales: 120000, shippedLastMonth: 5500,
    forecastedNextMonth: 6700,ytdAverage: 9900 },
];

function DistributorTable({ distributors = mockDistributors }) {
  const [statusFilter, setStatusFilter] = useState('All');
  const [minSales, setMinSales] = useState(0);

  const filteredDistributors = useMemo(() => {
    return distributors.filter(d => {
      const statusMatch = statusFilter === 'All' || d.status === statusFilter;
      const salesMatch = d.sales >= minSales;
      return statusMatch && salesMatch;
    });
  }, [distributors, statusFilter, minSales]);

  const statusCounts = useMemo(() => {
    const counts = { 'At Risk': 0, 'On Track': 0, 'Overperforming': 0 };
    distributors.forEach(d => {
      if (counts[d.status] !== undefined) {
        counts[d.status]++;
      }
    });
    return counts;
  }, [distributors]);

  const chartData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: '', // empty to avoid showing in tooltip
        data: Object.values(statusCounts),
        backgroundColor: '#c97d4f',
      }
    ]
  };
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }, // remove legend
      title: { display: true, text: 'Distributors Status Overview' }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Status'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Number of Distributors'
        },
        beginAtZero: true
      }
    }
  };
  

  return (
    <div className="distributor-page">
      {/* === Bar Chart === */}
      <div className="chart-container">
        <Bar data={chartData} options={chartOptions} />
      </div>

      {/* === Filters === */}
      <div className="filter-section">
        <div className="filter-buttons">
          {['All', 'At Risk', 'On Track', 'Overperforming'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`filter-btn ${
                statusFilter === status ? 'active' : ''
              }`}
            >
              {status}
            </button>
          ))}
        </div>
        <div className="sales-filter">
          <label htmlFor="minSales">Min Sales:</label>
          <input
            id="minSales"
            type="range"
            min="0"
            max="200000"
            step="1000"
            value={minSales}
            onChange={(e) => setMinSales(Number(e.target.value))}
          />
          <span>${minSales.toLocaleString()}</span>
        </div>
      </div>

      {/* === Table === */}
      {filteredDistributors.length > 0 ? (
        <div className="table-container">
          <table className="distributor-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Sales ($)</th>
                <th>Shipped Last Month</th>
                <th>Forecasted Next Month</th>
                <th>YearToDate Average</th>
              </tr>
            </thead>
            <tbody>
              {filteredDistributors.map(d => (
                <tr key={d.id}>
                  <td>{d.name}</td>
                  <td>{d.status}</td>
                  <td>{d.sales.toLocaleString()}</td>
                  <td>{d.shippedLastMonth.toLocaleString()}</td>
                  <td>{d.forecastedNextMonth.toLocaleString()}</td>
                  <td>{d.ytdAverage.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-message">
          No distributors match the selected filters.
        </div>
      )}
    </div>
  );
}

export default DistributorTable;
