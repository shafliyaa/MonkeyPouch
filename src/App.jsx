import './App.css'
import { useState } from 'react';
import { mockTransactions } from './data';

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

  const [transactions, setTransactions] = useState(mockTransactions);
  const [page, setPage] = useState('dashboard');
  const [selectedTx, setSelectedTx] = useState(null);
  const [previousPage, setPreviousPage] = useState('dashboard');
  
  // 2. IMPORTANT: Added this missing state to store the ID and Amount
  const [transactionData, setTransactionData] = useState({ id: '', amount: 0 });


  const now = new Date();

  // Generates "16 Mar 2026"
  const formattedDate = now.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  // Generates "March 2026"
  const formattedMonth = now.toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric'
  });

  const getTransactionFrequency = () => {
    // Use 'transactions' (the state) instead of 'mockTransactions'

    const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }); 
    const todaysTransfers = transactions.filter(tx => tx.date.includes(today)).length;

    console.log(`[DEBUG] Frequency check for ${today}: ${todaysTransfers} transfers found.`);
    return todaysTransfers;
  };

  const renderPage = () => {
    switch(page) {
      case 'dashboard': 
        return <Dashboard 
          name={user.name} 
          balance={user.balance} 
          onSend={() => setPage('transfer')} 
          onKiki={() => setPage('intro')} 
          transactions={transactions}
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
              return true;
            } else {
              return false;
            }
          }} />;

      case 'allTransaction':
        return <AllTransactions 
          onBack={() => setPage('dashboard')} 
          transactions={transactions}
          onSelect={(tx) => { 
            setSelectedTx(tx); 
            setPage('transactionsDetails'); 
            setPreviousPage('allTransaction'); 
          }} 
        />;

      case 'verifying':
  return <Verifying 
    data={transactionData} 
    frequency={getTransactionFrequency()}
    onFinish={(isSafe, riskScore, reason) => {
              // Save the AI's reason for the failure screen
        setTransactionData(prev => ({ 
          ...prev, 
          riskScore: riskScore, 
          reason: reason 
        }));

      if (isSafe) {
        const amountNum = parseFloat(transactionData.amount);

        const maxId = transactions.length > 0 
          ? Math.max(...transactions.map(t => parseInt(t.id))) 
          : 130909;
        
        const nextId = (maxId + 1).toString();

        // 1. Update Balance
        setUser(prev => ({ 
          ...prev, 
          balance: prev.balance - amountNum 
        }));

        // 2. Create the new transaction matching your data.js format
        const newTx = {
          id: nextId, // String to match your mock data IDs
          name: transactionData.id || "Transfer", 
          amount: amountNum.toFixed(2), // Keep it as a string "50.00" to match your data
          date: now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          month: now.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }),
          location: "Kuala Lumpur, MY", // You can hardcode this or use GeoLocation if feeling fancy
          references: transactionData.ref || "Money Transfer" // Pull from your Transfer form state
        };

        // 3. Add to the top of the list
        setTransactions([newTx, ...transactions]);

        setTransactionData(prev => ({ ...prev, generatedId: nextId }));

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
          riskScore={transactionData.riskScore} 
          reason={transactionData.reason}
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
            width: '55px', 
            height: '55px', 
            borderRadius: '50%', 
            backgroundColor: '#4CAF50', 
            color: 'white', 
            border: 'none', 
            fontSize: '30px', 
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            cursor: 'pointer',
            zIndex: 1000,      /* Ensures it stays on top of transactions */
            opacity:'85%'
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