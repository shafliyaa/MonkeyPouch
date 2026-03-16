import './App.css'
import { useState } from 'react';

import Dashboard from './Dashboard';
import KikiIntro from './KikiIntro';
import Transfer from './Transfer';
import PinNum from './PinNum';
import AllTransactions from './AllTransactions';
import ResultScreen from './ResultScreen';
import Verifying from './Verifying';
import TransactionDetails from './TransactionDetails';
import StatusBar from './StatusBar';
import HomeIndicator from './HomeIndicator';

function App() {
  // 1. Added 'pin' to the user object so the PIN screen can check it
  const [user, setUser] = useState({
    name: "Ahmad",
    balance: 1250.00,
    currency: "RM",
    pin: "1234" 
  });

  const [page, setPage] = useState('dashboard');
  const [selectedTx, setSelectedTx] = useState(null);
  const [previousPage, setPreviousPage] = useState('dashboard');
  
  // 2. IMPORTANT: Added this missing state to store the ID and Amount
  const [transactionData, setTransactionData] = useState({ id: '', amount: 0 });

  const renderPage = () => {
    switch(page) {
      case 'dashboard': 
        return <Dashboard 
          name={user.name} 
          balance={user.balance} 
          onSend={() => setPage('transfer')} 
          onKiki={() => setPage('intro')} 
          onAllTransaction={() => setPage('allTransaction')}
          onSelect={(tx) => { 
            setSelectedTx(tx); 
            setPage('transactionsDetails'); 
            setPreviousPage('dashboard');
          }} />;

      case 'intro': 
        return <KikiIntro onBack={() => setPage('dashboard')} />;

      case 'transfer': 
        return <Transfer 
          balance={user.balance}
          onBack={() => setPage('dashboard')} 
          onNext={(data) => { 
            setTransactionData(data); // Now this works!
            setPage('pin'); 
          }} />;

      case 'pin': 
        return <PinNum 
          onBack={() => setPage('transfer')} 
          onComplete={(enteredPin) => {
            // Checks the pin against the user object
            if(enteredPin === user.pin) {
              setPage('verifying');
            } else {
              alert("Wrong PIN!");
            }
          }} />;

      case 'allTransaction':
        return <AllTransactions 
          onBack={() => setPage('dashboard')} 
          onSelect={(tx) => { 
            setSelectedTx(tx); 
            setPage('transactionsDetails'); 
            setPreviousPage('allTransaction'); 
          }} 
        />;

      case 'verifying':
        return <Verifying 
          data={transactionData} 
          onFinish={(isSafe) => {
            if (isSafe) {
              // Updates the state so the Dashboard and ResultScreen are in sync
              setUser(prev => ({ 
                ...prev, 
                balance: prev.balance - parseFloat(transactionData.amount) 
              }));
              setPage('success');
            } else {
              setPage('unsuccess');
            }
          }} />;

      case 'success':
      case 'unsuccess':
        return <ResultScreen 
          status={page} 
          amount={transactionData.amount}
          newBalance={user.balance}
          onDone={() => setPage('dashboard')} />;

      case 'transactionsDetails':
        return <TransactionDetails 
          transaction={selectedTx} 
          onBack={() => setPage(previousPage)} />;

      default: 
        return <Dashboard name={user.name} balance={user.balance} />;
    }
  };

  return (
    
    <div className='app-container'>
      <StatusBar />

      <div className="main-content" style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        overflow: 'hidden' // Default is NO SCROLL
      }}>
        {renderPage()}
      </div>

      {page === 'dashboard' && (
        <button 
          onClick={() => setPage('transfer')}
          style={{ 
            position: 'absolute', 
            bottom: '45px',   /* Sits above the Home Indicator */
            right: '25px',
            width: '60px', 
            height: '60px', 
            borderRadius: '50%', 
            backgroundColor: '#4CAF50', 
            color: 'white', 
            border: 'none', 
            fontSize: '30px', 
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            cursor: 'pointer',
            zIndex: 1000      /* Ensures it stays on top of transactions */
          }}
        >
          +
        </button>
      )}

      <HomeIndicator />
    </div>
  )
}

export default App;