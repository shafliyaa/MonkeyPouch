/*export default function ResultScreen({ status, onDone }) {
  // Define different styles/text for each state
  const isSuccess = status === 'success';
  
  const content = {
    success: {
      title: "Transfer Successful!",
      backgroundColor: "#B8EEC0",
      color: "#000000", 
      icon: "✅",
      message: "Kiki has moved your money safely."
    },
    unsuccess: {
      title: "Transfer Blocked",
      backgroundColor: "#F2A7A9",
      color: "#000000", 
      icon: "🛡️",
      message: "Kiki stopped this for your safety. Unusual activity detected."
    }
  };

  const current = content[status] || content.success;

  return (
    <div className="page" style={{ backgroundColor: current.backgroundColor , textAlign: 'center', padding: '50px 20px' }}>
      <div style={{ fontSize: '80px', marginBottom: '20px' }}>{current.icon}</div>
      
      <h1 style={{ color: current.color }}>{current.title}</h1>
      <p style={{ fontSize: '18px', margin: '20px 0', color: '#666' }}>
        {current.message}
      </p>

      <button 
        className="btn-primary" 
        onClick={onDone}
        style={{ backgroundColor: current.color, marginTop: '80px' }}
      >
        Back to Home
      </button>
    </div>
  );
}*/

export default function ResultScreen({ status, amount, newBalance, riskScore, reason, onDone }) {
  const isScam = status === 'unsuccess';

  return (
    <div className="page" style={{ 
      textAlign: 'center', 
      padding: '80px 20px', 
      backgroundColor: isScam ? '#F2A7A9' : '#B8EEC0', // Red for scam, Green for success
      height: '100%' 
    }}>
      {console.log(riskScore)}
      <div style={{ fontSize: '60px', marginBottom: '20px' }}>
        {isScam ? '🛡️' : '✅'}
      </div>

      <h1 style={{ color: '#2d3e26', marginBottom: '10px' }}>
        {isScam ? "Transfer Blocked" : "Transfer Successful"}
      </h1>

      {isScam ? (
        // --- KIKI'S SECURITY REPORT ---
        <div style={{ 
          background: 'rgba(255,255,255,0.6)', 
          padding: '20px', 
          borderRadius: '15px', 
          marginTop: '30px',
          textAlign: 'left'
        }}>
          <h3 style={{ color: '#d32f2f', marginTop: 0 }}>KiKi Shield Analysis:</h3>
          {console.log(riskScore)}
          <p><strong>Risk Probability:</strong> {((riskScore || 0) * 100).toFixed(0)}%</p>
          <p><strong>Detected Threat:</strong> {reason || "Unusual behavioral pattern"}</p>
          <hr style={{ border: '0.5px solid rgba(0,0,0,0.1)' }} />
          <p style={{ fontSize: '0.85rem', color: '#555' }}>
            MonkeyPouch AI blocked this to protect your <strong>RM {newBalance}</strong> balance.
          </p>
        </div>
      ) : (
        <div style={{ marginTop: '30px' }}>
          <p style={{ fontSize: '1.2rem' }}>RM {amount} sent successfully!</p>
          <p style={{ opacity: 0.7 }}>New Balance: RM {newBalance}</p>
        </div>
      )}

      <button 
        onClick={onDone}
        style={{
          marginTop: '40px',
          padding: '15px 40px',
          borderRadius: '25px',
          border: 'none',
          backgroundColor: '#2d3e26',
          color: 'white',
          fontWeight: 'bold',
          width: '100%'
        }}
      >
        Back to Dashboard
      </button>
    </div>
  );
}