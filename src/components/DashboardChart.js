import React from 'react';
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
import '../styles/DashboardChart.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function DashboardChart({ trendByStatus, distributorNamesByStatus }) {
  const statuses = Object.keys(trendByStatus);

  const chartData = {
    labels: statuses,
    datasets: [
      {
        label: 'Growing',
        data: statuses.map(status => trendByStatus[status]?.Growing || 0),
        backgroundColor: 'green',
        stack: 'trend',
        barThickness: 45 // reduced bar width
      },
      {
        label: 'Stable',
        data: statuses.map(status => trendByStatus[status]?.Stable || 0),
        backgroundColor: 'gray',
        stack: 'trend',
        barThickness: 45
      },
      {
        label: 'Declining',
        data: statuses.map(status => trendByStatus[status]?.Declining || 0),
        backgroundColor: 'red',
        stack: 'trend',
        barThickness: 45
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
      title: { display: true, text: 'Distributor Status + Trend Forecast' },
      tooltip: {
        callbacks: {
          afterBody: (tooltipItems) => {
            const item = tooltipItems[0];
            const status = item.label;
            const trend = item.dataset.label;
            const names = distributorNamesByStatus?.[status]?.[trend] || [];
            return names.length > 0
  ? ['Distributors:', ...names.map(n => `• ${n}`)]
  : [];

          }
        }
      }
    },
    scales: {
      x: {
        stacked: true,
        title: { display: true, text: 'Status' }
      },
      y: {
        stacked: true,
        title: { display: true, text: 'Count' },
        beginAtZero: true
      }
    }
  };

  return (
    <div className="chart-container" style={{ height: '300px' }}>
      <Bar data={chartData} options={chartOptions} />
      <div className="chart-legend">
        <span className="legend-item">
          <span className="legend-color-box" style={{ backgroundColor: 'green' }}></span> Growing
        </span>
        <span className="legend-item">
          <span className="legend-color-box" style={{ backgroundColor: 'gray' }}></span> Stable
        </span>
        <span className="legend-item">
          <span className="legend-color-box" style={{ backgroundColor: 'red' }}></span> Declining
        </span>
      </div>
    </div>
  );
}

export default DashboardChart; 