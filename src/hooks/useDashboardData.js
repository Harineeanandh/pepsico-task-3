import { useState, useMemo } from 'react';
import mockDashboards from '../mockdata/mockDashboards';

function useDashboardData() {
  const [statusFilter, setStatusFilter] = useState('All');
  const [minSales, setMinSales] = useState(0);

  const filteredDashboards = useMemo(() => {
    return mockDashboards.filter(d => {
      const statusMatch = statusFilter === 'All' || d.status === statusFilter;
      const salesMatch = d.sales >= minSales;
      return statusMatch && salesMatch;
    });
  }, [statusFilter, minSales]);

  const statusCounts = useMemo(() => {
    const counts = { 'At Risk': 0, 'On Track': 0, 'Overperforming': 0 };
    mockDashboards.forEach(d => {
      if (counts[d.status] !== undefined) {
        counts[d.status]++;
      }
    });
    return counts;
  }, []);

  return {
    dashboards: mockDashboards,
    statusFilter,
    setStatusFilter,
    minSales,
    setMinSales,
    filteredDashboards,
    statusCounts
  };
}

export default useDashboardData;
