import React from 'react';

export default function HomeIndicator() {
  return (
    <div style={{
      width: '100%',
      height: '8px',          /* Space at the bottom */
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
      paddingBottom: '5px'
    }}>
      <div style={{
        width: '120px',
        height: '5px',
        backgroundColor: '#333', /* Match your phone border color */
        borderRadius: '10px',
        opacity: 0.8
      }} />
    </div>
  );
}