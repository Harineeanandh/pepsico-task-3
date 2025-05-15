// DistributorCard.js
import React from 'react';

function DistributorCard({ distributor }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 space-y-2">
      <h3 className="text-lg font-semibold text-gray-800">{distributor.name}</h3>
      <div className="text-sm text-gray-600">
        <p>Status: <span className="font-medium">{distributor.status}</span></p>
        <p>Shipped Last Month: <span className="font-medium">{distributor.shippedLastMonth.toLocaleString()}</span></p>
        <p>Forecast Next Month: <span className="font-medium">{distributor.forecastedNextMonth.toLocaleString()}</span></p>
        <p>YTD Monthly Avg: <span className="font-medium">{distributor.ytdAverage.toLocaleString()}</span></p>
      </div>
    </div>
  );
}

export default DistributorCard;
