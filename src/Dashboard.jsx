import { mockTransactions } from './data'; // Import your data
import { useState } from 'react';

export default function Dashboard({ name, balance, onSend, onKiki, onAllTransaction, onSelect }) {
  
  // 1. Take only the first 10 items from the array
  const recentTransactions = mockTransactions.slice(0, 10);

  return (
    <div style={{ 
      padding: '20px', 
      display: 'flex', 
      position: 'relative',
      flexDirection: 'column', 
      minHeight: '100%' 
    }}>
      {/* 1. This div contains everything that SHOULD scroll */}
      <div style={{flex: 1,           /* Takes up all available space */
        overflowY: 'auto',  /* Makes only this part scrollable! */
        paddingBottom: '100px' /* Space for the button so it doesn't block the last item */}}>
        <p style={{ marginTop: '10px', color: '#666' }}>Welcome, {name}</p>
        <h3 style={{ marginTop: '30px', marginBottom: '5px' }}>Balance:</h3>
        
        {/* --- ADD THE CLASS HERE --- */}
        <div className="balance-text">
          RM {parseFloat(balance).toFixed(2)}
        </div>

        <section onClick={onKiki} style={{ background: '#e8f5e9', padding: '10px', borderRadius: '10px', cursor: 'pointer' }}>
          <p>🛡️ KiKi is protecting your wallet</p>
        </section>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
          <h3>Recent Transactions:</h3>
          <button onClick={onAllTransaction}>See All</button>
        </div>

        {recentTransactions.map((tx) => (
          <div key={tx.id} onClick={() => onSelect(tx)} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0', borderBottom: '1px solid #eee' }}>
            <div>
              <strong>{tx.name}</strong><br/>
              <small>{tx.date}</small>
            </div>
            <strong>RM {tx.amount}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}