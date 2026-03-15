export default function ResultScreen({ status, onDone }) {
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
        style={{ backgroundColor: current.color, marginTop: 'auto' }}
      >
        Back to Home
      </button>
    </div>
  );
}