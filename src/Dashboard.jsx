import { mockTransactions } from './data'; // Import your data
import { useState } from 'react';

export default function Dashboard({ name, balance, onSend, onKiki, onAllTransaction, onSelect }) {
  
  // 1. Take only the first 10 items from the array
  const recentTransactions = mockTransactions.slice(0, 5);

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
        <p style={{fontSize:'17px', marginTop: '15px', color: '#333333' }}>Welcome, {name}</p>

        <div className='balance-card'>
          <h3 style={{ marginTop: '5px', marginBottom: '5px',color: '#383838' ,fontSize:'15px' }}>Balance:</h3>
          
          {/* --- ADD THE CLASS HERE --- */}
          <div className="balance-text">
            RM {parseFloat(balance).toFixed(2)}
          </div>
        </div>

        <section onClick={onKiki} style={{ fontSize:'14px', background: '#e8f5e9', padding: '10px', borderRadius: '10px', cursor: 'pointer' }}>
          <p>🛡️ Kiki is protecting your wallet</p>
        </section>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
          <h3>Recent Transactions:</h3>
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
        <button onClick={onAllTransaction} style={{fontSize:'13px', margin:'10px 80px', borderRadius:'10px', backgroundColor:'#7ba368', cursor:'pointer', color:'#1e2a1a', padding:'8px 16px', borderColor:'#2d3e26'}}>See All</button>
      </div>
    </div>
  );
}