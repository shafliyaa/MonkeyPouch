import React, { useEffect } from 'react';

export default function Verifying({ data, onFinish }) {
  useEffect(() => {
    // Simulate the 2.5 second AI Scan
    const timer = setTimeout(() => {
      // THE DEMO TRIGGER: If ID is SCAM999, it's a scam
      const isSafe = data.id !== "SCAM999"; 
      onFinish(isSafe);
    }, 2500);

    return () => clearTimeout(timer);
  }, [data, onFinish]);

  return (
    <div className="page" style={{ textAlign: 'center', padding: '100px 20px', backgroundColor: '#94b486' }}>
      <div className="loader"></div> {/* Add a CSS spinner here */}
      <h2 style={{ color: 'white' }}>KiKi is scanning...</h2>
      <p style={{ color: '#2d3e26' }}>Checking recipient {data.id} for suspicious patterns</p>
    </div>
  );
}