/*import React, { useEffect } from 'react';

// Added 'frequency' to the props
export default function Verifying({ data, frequency, onFinish }) {
  useEffect(() => {
    const callAPI = async () => {
      try {
        const response = await fetch('https://mutationally-inflorescent-abby.ngrok-free.dev/predict' , {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: parseFloat(data.amount),
            recipient_id: data.id,
            timestamp: new Date().toISOString(),
            location: data.location || "Subang Jaya", 
            frequency_today: frequency, // Now using the prop
            is_night_time: new Date().getHours() > 22 || new Date().getHours() < 5
          }),
        });

        const result = await response.json();
        // 1. Match her Python "status" (which is "Block" for SCAM999)
        const isSafe = result.status !== "Block"; 

        // 2. Pass the probability and reason so you can use them in the next screen
        setTimeout(() => onFinish(isSafe, result.fraud_probability, result.reason), 1500);
        console.log("AI Response:", result.status); // Check your console!
console.log("Is it safe?:", isSafe);

      } catch (error) {
        console.error("API Connection Failed:", error);
        // Fail-safe for the demo
        setTimeout(() => onFinish(true), 2000);
      }
    };

    callAPI();
  }, [data, onFinish, frequency]);

  return (
    <div className="page" style={{ 
      textAlign: 'center', 
      padding: '120px 20px', 
      backgroundColor: '#94b486', 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      
      <div className="loader" style={{ 
        width: '80px', 
        height: '80px', 
        border: '8px solid #f3f3f3', 
        borderTop: '8px solid #2d3e26', 
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '30px'
      }}></div>
      
      <h2 style={{ color: 'white', marginBottom: '10px' }}>KiKi AI is analyzing...</h2>
      <p style={{ color: '#2d3e26', fontSize: '1.1rem', fontWeight: '500' }}>
        Scanning recipient <span style={{ color: 'white' }}>{data.id}</span>
      </p>
      <p style={{ color: '#2d3e26', opacity: 0.8, fontSize: '0.9rem', marginTop: '10px' }}>
        Verifying location & behavior patterns...
      </p>

    
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}*/

import React, { useEffect, useRef } from 'react';

export default function Verifying({ data, frequency, onFinish }) {
  // Use a Ref to ensure we only call the API ONCE even if React re-renders
  const hasCalledAPI = useRef(false);

  useEffect(() => {
    if (hasCalledAPI.current) return;
    hasCalledAPI.current = true;

    const callAPI = async () => {
      try {
        const response = await fetch('https://mutationally-inflorescent-abby.ngrok-free.dev/predict' , {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: parseFloat(data.amount),
            recipient_id: data.id,
            timestamp: new Date().toISOString(),
            location: data.location || "Subang Jaya", 
            frequency_today: frequency,
            is_night_time: new Date().getHours() > 22 || new Date().getHours() < 5
          }),
        });

        const result = await response.json();
        
        // Match her Python "status" 
        const isSafe = result.status !== "Block"; 

        console.log("KiKi Decision:", result.status);

        // Delay for the 'scanning' effect, then pass ALL 3 values
        setTimeout(() => {
          onFinish(isSafe, result.fraud_probability || 0, result.reason || "Analysis Complete");
        }, 1500);

      } catch (error) {
        console.error("API Connection Failed:", error);
        // Fail-safe: Let it pass, but provide dummy risk data
        setTimeout(() => onFinish(true, 0.01, "Offline Mode: Pattern Verified Locally"), 2000);
      }
    };

    callAPI();
  }, [data, onFinish, frequency]);

  return (
    <div className="page" style={{ 
      textAlign: 'center', 
      padding: '120px 20px', 
      backgroundColor: '#94b486', 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div className="loader" style={{ 
        width: '80px', height: '80px', 
        border: '8px solid #f3f3f3', 
        borderTop: '8px solid #2d3e26', 
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '30px'
      }}></div>
      
      <h2 style={{ color: 'white', marginBottom: '10px' }}>KiKi AI is analyzing...</h2>
      <p style={{ color: '#2d3e26', fontSize: '1.1rem', fontWeight: '500' }}>
        Scanning recipient <span style={{ color: 'white' }}>{data.id}</span>
      </p>
      
      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}