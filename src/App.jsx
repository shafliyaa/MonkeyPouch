import './App.css'
import { useState } from 'react';

import Dashboard from './dashboard';
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

<div className="content-scroll-area" style={{ flex: 1, overflowY: 'auto' }}>
        {renderPage()}
      </div>
      <HomeIndicator />
    </div>
  )
}

export default App;