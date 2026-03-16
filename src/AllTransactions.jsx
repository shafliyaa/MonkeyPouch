 
import { mockTransactions } from './data';

export default function AllTransactions({ onBack, onSelect }) {
  
  // 1. Group the transactions by month first
  const grouped = mockTransactions.reduce((acc, tx) => {
    if (!acc[tx.month]) {
      acc[tx.month] = [];
    }
    acc[tx.month].push(tx);
    return acc;
  }, {});

  // 2. Get the list of months (e.g., ["March 2026", "February 2026"])
  const months = Object.keys(grouped);

 return (
    <div className="page-wrapper" style={{ 
      height: '100%', 
      width: '100%',
      padding: '0px',           /* This creates the even white "frame" around the green */
      boxSizing: 'border-box',
      backgroundColor: '#fff',   /* Matches the phone's interior */
      display: 'flex',
      flexDirection: 'column',
      marginTop: '30px'
    }}>
      
      <div className="green-card" style={{ 
        backgroundColor: '#94b486', 
        borderRadius: '20px',    /* Smooth rounded corners */
        borderTopLeftRadius: '50px',
        borderTopRightRadius: '50px',
        flex: 1,                 /* Fills the height exactly */
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',      /* Keeps the scrollbar inside the green area */
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)' /* Optional: subtle shadow for depth */
      }}>
        
        {/* Header - Stays Fixed at the top of the green box */}
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
          <h2 style={{ fontSize:'20px', textAlign: 'center', margin: '10px 0 20px 0', color: '#2d3e26' }}>All Transactions</h2>
        </div>

        {/* Scrollable List Area */}
        <div className="scroll-content" style={{ 
          flex: 1, 
          overflowY: 'auto', 
          padding: '0 20px 80px 20px',
          /* Custom scrollbar style for "beautiful" look */
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none'
        }}>
          {months.map((monthName) => (
            <div key={monthName}>
              <div style={{ marginTop: '10px' }}>
                <h3 style={{ marginBottom: '8px', color: '#2d3e26' }}>{monthName}</h3>
                <div style={{ borderBottom: '1px dashed rgba(0,0,0,0.2)', marginBottom: '20px' }}></div>
              </div>

              {grouped[monthName].map((tx) => (
                <div 
                  key={tx.id}
                  onClick={() => onSelect(tx)} 
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '25px', 
                    cursor: 'pointer' 
                  }}
                >
                  <div>
                    <strong style={{ fontSize: '1.05rem' }}>{tx.name}</strong><br/>
                    <small style={{ color: '#555' }}>{tx.date}</small>
                  </div>
                  <strong style={{ fontSize: '1.1rem' }}>RM {tx.amount}</strong>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}