import React from 'react';

function DashboardFilters({
  statusFilter, setStatusFilter,
  minSales, setMinSales,
  trendFilter, setTrendFilter
}) {
  return (
    <div className="filter-section">
      <div className="filter-buttons">
        {['All', 'At Risk', 'On Track', 'Overperforming'].map(status => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`filter-btn ${statusFilter === status ? 'active' : ''}`}
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

      <div className="trend-filter">
        <label htmlFor="trendFilter">Trend:</label>
        <select
          id="trendFilter"
          value={trendFilter}
          onChange={(e) => setTrendFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Growing">Growing</option>
          <option value="Stable">Stable</option>
          <option value="Declining">Declining</option>
        </select>
      </div>
    </div>
  );
}

export default DashboardFilters;
