import React from 'react';
import TrendLine from './TrendLine';
import '../styles/DashboardTable.css';

function DashboardTable({ dashboards }) {
  return dashboards.length > 0 ? (
    <div className="table-container">
      <table className="Dashboard-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Sales ($)</th>
            <th>Shipped Last Month</th>
            <th>Forecasted Next Month</th>
            <th>YearToDate Average</th>
            <th>Trend</th>
          </tr>
        </thead>
        <tbody>
          {dashboards.map(d => (
            <tr key={d.id} className={d.status === 'At Risk' ? 'alert-row' : ''}>
              <td>{d.name}</td>
              <td><span className={`badge ${d.status.replace(/ /g, '').toLowerCase()}`}>{d.status}</span></td>
              <td>{d.sales.toLocaleString()}</td>
              <td>{d.shippedLastMonth.toLocaleString()}</td>
              <td>{d.forecastedNextMonth.toLocaleString()}</td>
              <td>{d.ytdAverage.toLocaleString()}</td>
              <td>
                {d.trend === 'Growing' && '📈 Forecast exceeds trend – Growing'}
                {d.trend === 'Declining' && '📉 Forecast is lower than trend – Declining'}
                {d.trend === 'Stable' && '➖ Forecast in line with trend – Stable'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="empty-message">No Distributors match the selected filters.</div>
  );
}

export default DashboardTable;
