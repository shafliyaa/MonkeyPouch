import { useState } from 'react';

export default function Dashboard({ name, transactions, balance, onSend, onKiki, onAllTransaction, onSelect }) {
  
  // FIX: Use the 'transactions' prop instead of 'mockTransactions'
  // This ensures the list updates when you send money!
  const recentTransactions = transactions.slice(0, 5);

  return (
    <div style={{ 
      padding: '20px', 
      display: 'flex', 
      position: 'relative',
      flexDirection: 'column', 
      minHeight: '100%' 
    }}>
      <div style={{
        flex: 1, 
        overflowY: 'auto', 
        paddingBottom: '100px' 
      }}>
        <p style={{fontSize:'17px', marginTop: '15px', color: '#333333', marginBottom: '0'}}>Welcome, {name}</p>
        <p style={{ 
    fontSize: '12px', 
    color: '#888', 
    margin: '0px 0 15px 0' 
  }}>
    {new Date().toLocaleDateString('en-GB', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    })}
  </p>
        
        <div className='balance-card'>
          <h3 style={{ marginTop: '5px', marginBottom: '5px',color: '#383838' ,fontSize:'15px' }}>Balance:</h3>
          <div className="balance-text">
            RM {parseFloat(balance).toFixed(2)}
          </div>
        </div>

        <section onClick={onKiki} style={{ fontSize:'14px', background: '#e8f5e9', padding: '10px', borderRadius: '10px', cursor: 'pointer', marginBottom: '10px' }}>
          <p>🛡️ Kiki is protecting your wallet</p>
        </section>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
          <h3 style={{fontSize: '16px'}}>Recent Transactions:</h3>
        </div>

        {recentTransactions.map((tx) => (
          <div 
            key={tx.id} 
            onClick={() => onSelect(tx)} 
            style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0', borderBottom: '1px solid #eee', cursor: 'pointer' }}
          >
            <div>
              <strong>{tx.name}</strong><br/>
              <small style={{color: '#888'}}>{tx.date}</small>
            </div>
            <strong style={{color: '#b80000'}}>RM {tx.amount}</strong>
          </div>
        ))}

        {/* Improved "See All" Button */}
        <button 
          onClick={onAllTransaction} 
          style={{
            display: 'block',
            width: '100%', // Makes it easier to tap
            marginTop: '20px', 
            borderRadius: '8px', 
            backgroundColor: 'transparent', // Ghost style looks cleaner
            cursor: 'pointer', 
            color: '#4CAF50', 
            padding: '12px', 
            border: '1px solid #4CAF50',
            fontWeight: 'bold'
          }}
        >
          See All Activity
        </button>
      </div>
    </div>
  );
}