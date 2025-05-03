import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const App = () => {
  const [marketData, setMarketData] = useState(null);

  useEffect(() => {
    // Fetch live market data from the backend
    fetch('/api/market-data')
      .then((response) => response.json())
      .then((data) => {
        setMarketData(data);
        renderChart(data); // Render chart after fetching data
      })
      .catch((error) => console.error('Error fetching market data:', error));
  }, []);

  const renderChart = (data) => {
    const ctx = document.getElementById('marketChart').getContext('2d');
    const timeSeries = data['Time Series (1min)'];
    const labels = Object.keys(timeSeries).reverse(); // Reverse for chronological order
    const prices = labels.map((time) => timeSeries[time]['1. open']);

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Market Price',
            data: prices,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
          },
        ],
      },
    });
  };

  return (
    <div>
      <h1>Mivan - Live Market Data</h1>
      <canvas id="marketChart" width="400" height="200"></canvas>
    </div>
  );
};

export default App;