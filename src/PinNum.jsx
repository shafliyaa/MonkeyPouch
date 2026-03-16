import { useState, useEffect } from 'react';

export default function PinPad({ onBack, onComplete }) {
  const [pin, setPin] = useState([]);
  const [error, setError] = useState(false);

  const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "⌫"];

  // 1. ADD THIS FUNCTION BACK IN: This is the "Engine" that makes buttons work
  const handleKeyPress = (key) => {
    if (error) return;

    if (key === "⌫") {
      // Deletes the last number
      setPin(pin.slice(0, -1));
    } else if (typeof key === 'number' && pin.length < 4) {
      // Adds a new number if we have less than 4
      setPin([...pin, key]);
    }
  };

  useEffect(() => {
    if (pin.length === 4) {
      const enteredPin = pin.join(''); 
      
      setTimeout(() => {
        const isCorrect = onComplete(enteredPin); 
        
        if (!isCorrect) {
          setError(true); // Trigger error visuals
          setTimeout(() => {
            setPin([]); // Clear PIN after a delay
            setError(false); // Reset error state
          }, 1000);
        }
      }, 300);
    }
  }, [pin, onComplete]);

  return (
    <div className="page pin-screen" style={{ 
      height: '100%', 
      width: '100%',
      padding: '0',
      boxSizing: 'border-box',
      backgroundColor: '#fff', 
      display: 'flex',
      flexDirection: 'column',
      marginTop: '50px'
    }}>
      <div className="green-card" style={{ 
        backgroundColor: error ? '#fccfcf' : '#94b486', 
        borderRadius: '20px',
        borderTopLeftRadius: '50px',
        borderTopRightRadius: '50px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
      }}>


        <div style={{ padding: '20px 20px 10px 20px', position: 'relative' }}>
          <button 
            onClick={onBack} 
            style={{ 
              position: 'absolute', right: '20px', top: '30px',
              background: 'white', borderRadius: '50%', border: 'none', 
              width: '30px', height: '30px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '14px', fontWeight: 'bold', color: '#555'
            }}
          >
            X
          </button>
          <h2 style={{ textAlign: 'center', paddingTop:'10px', color: '#2d3e26' }}>
            {error ? "Authentication Failed" : "Enter Your Pin Number"}
          </h2>
        </div>

                {/* Error Message */}
        {error && (
          <p style={{ color: '#d32f2f', textAlign: 'center', fontWeight: 'bold', marginTop: '3px' }}>
            Wrong PIN! Please try again.
          </p>
        )}
          
        {/* The 4 Dots */}
        <div className="pin-dots" style={{ display: 'flex', gap: '20px', justifyContent: 'center', margin: '40px 0', animation: error ? 'shake 2s' : 'none' }}>
          {[0, 1, 2, 3].map((index) => (
            <div key={index} style={{
              width: '24px', 
              height: '24px', 
              borderRadius: '50%',
              transition: 'all 0.2s ease',
              backgroundColor: error ? '#d32f2f' : (pin.length > index ? '#2d3e26' : '#fff'),
              border: `2px solid ${error ? '#d32f2f' : '#2d3e26'}`,
              boxShadow: pin.length > index ? '0 0 10px rgba(45, 62, 38, 0.3)' : 'none'
            }} />
          ))}
        </div>

        {/* The Numeric Keypad */}
        <div className="keypad" style={{ 
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', padding: '20px' 
        }}>
          {keys.map((key, i) => (
            <button 
              key={i} 
              onClick={() => handleKeyPress(key)} // This now has a function to call!
              style={{ 
                height: '45px', 
                fontSize: '24px', 
                borderRadius: '15px', 
                border: 'none',
                backgroundColor: key === "" ? "transparent" : "#fff",
                visibility: key === "" ? "hidden" : "visible",
                boxShadow: key === "⌫" ? 'none' : '0 2px 5px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                color: '#2d3e26',
                fontWeight: 'bold'
              }}
              /* Subtle feedback when clicking */
              onMouseDown={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
              onMouseUp={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
            >
              {key}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}