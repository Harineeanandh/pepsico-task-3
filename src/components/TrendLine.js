import '../styles/TrendLine.css';

function getTrendDescription(data) {
    if (!Array.isArray(data) || data.length !== 3) {
      return { text: 'Trend data unavailable', color: 'gray' };
    }
  
    const [shipped, forecast, ytd] = data;
    const avg = (shipped + ytd) / 2;
  
    if (forecast > avg * 1.1) {
      return {
        text: '📈 Forecast exceeds trend – Growing',
        color: 'green'
      };
    } else if (forecast < avg * 0.9) {
      return {
        text: '📉 Forecast is lower than trend – Declining',
        color: 'red'
      };
    } else {
      return {
        text: '➖ Forecast in line with trend – Stable',
        color: 'gray'
      };
    }
  }
  
  function TrendLine({ data, showLegend = false }) {
    const trend = getTrendDescription(data);
  
    return (
      <div>
        <span style={{ color: trend.color, fontWeight: 500 }}>
          {trend.text}
        </span>
        {showLegend && (
          <div className="trend-legend">
            <span className="legend-item"><span>📈</span> Growing</span>
            <span className="legend-item"><span>📉</span> Declining</span>
            <span className="legend-item"><span>➖</span> Stable</span>
          </div>
        )}
      </div>
    );
  }
  
  export default TrendLine;
  