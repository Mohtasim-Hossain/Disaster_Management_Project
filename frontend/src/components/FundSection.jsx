import React, { useEffect, useState } from 'react';
import { createWebSocket } from '../services/websocket';

const FundSection = () => {
  const [totalDonations, setTotalDonations] = useState(0);

  useEffect(() => {
    const ws = createWebSocket();
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setTotalDonations(data.total_donations);
    };
    return () => ws.close();
  }, []);

  return (
    <div>
      <h2>Total Donated Funds: {totalDonations}</h2>
      {/* Add bar chart component here if needed */}
      <button onClick={() => window.location.href = '/donation'}>Go to Donation Page</button>
    </div>
  );
};

export default FundSection;
