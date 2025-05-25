import React, { useState } from 'react';
import DashboardChart from './DashboardChart';
import DashboardFilters from './DashboardFilters';
import DashboardTable from './DashboardTable';
import useDashboardData from '../hooks/useDashboardData';
import '../styles/DashboardPage.css';

// Utility to convert data to CSV
function convertToCSV(data) {
if (!data.length) return '';

const headers = Object.keys(data[0]);
const csvRows = [
headers.join(','), // header row
...data.map(row => headers.map(field => {
const escaped = ('' + row[field]).replace(/"/g, '""');
return "${escaped}";
}).join(','))
];

return csvRows.join('\n');
}

function getTrendType(data) {
if (!Array.isArray(data) || data.length !== 3) return 'Stable';
const [shipped, forecast, ytd] = data;
const avg = (shipped + ytd) / 2;
if (forecast > avg * 1.1) return 'Growing';
if (forecast < avg * 0.9) return 'Declining';
return 'Stable';
}

function DashboardPage() {
const {
dashboards,
statusFilter,
setStatusFilter,
minSales,
setMinSales,
filteredDashboards
} = useDashboardData();

const [trendFilter, setTrendFilter] = useState('All');

// 🔍 Search term state
const [searchTerm, setSearchTerm] = useState('');

const trendByStatus = {};
const distributorNamesByStatus = {};

const finalDashboards = filteredDashboards
.map(d => {
const trend = getTrendType([d.shippedLastMonth, d.forecastedNextMonth, d.ytdAverage]);

if (!trendByStatus[d.status]) {
trendByStatus[d.status] = { Growing: 0, Stable: 0, Declining: 0 };
distributorNamesByStatus[d.status] = { Growing: [], Stable: [], Declining: [] };
}

trendByStatus[d.status][trend]++;
distributorNamesByStatus[d.status][trend].push(d.name);

return { ...d, trend };
})
.filter(d => trendFilter === 'All' || d.trend === trendFilter)
.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase())); // 🔍 Filter by search

// Export CSV function
const handleExportCSV = () => {
const csv = convertToCSV(finalDashboards);
const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
const url = URL.createObjectURL(blob);

const link = document.createElement('a');
link.href = url;
link.setAttribute('download', 'distributor_data.csv');
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
URL.revokeObjectURL(url);
};

return (
<div className="Dashboard-page">
<DashboardChart 
trendByStatus={trendByStatus} 
distributorNamesByStatus={distributorNamesByStatus} 
/>
<DashboardFilters 
statusFilter={statusFilter} 
setStatusFilter={setStatusFilter} 
minSales={minSales} 
setMinSales={setMinSales}
trendFilter={trendFilter}
setTrendFilter={setTrendFilter}
/>

<div className="filter-export-wrapper">
{/* 🔍 Search input */}
<input
type="text"
className="search-input"
placeholder="Search distributor..."
value={searchTerm}
onChange={(e) => setSearchTerm(e.target.value)}
/>

<button className="export-button" onClick={handleExportCSV} title="Export as CSV">
📄 Export table data as CSV
</button>
</div>

<DashboardTable dashboards={finalDashboards} />
</div>
);
}

export default DashboardPage;
