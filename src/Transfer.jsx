import { useState } from "react";

export default function Transfer({balance, onBack, onNext}){
    const [formData, setFormData] = useState({ id: '', amount: '', ref: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const hasEnoughBalance = parseFloat(formData.amount) <= balance;

  const isFormComplete = 
    formData.id.trim() !== "" && 
    formData.amount.trim() !== "" && 
    parseFloat(formData.amount) > 0 &&
    formData.ref.trim() !== "";

    const canProceed = isFormComplete && hasEnoughBalance;

    return(
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
          <h2 style={{ textAlign: 'center', margin: '10px 0 20px 0', color: '#2d3e26' }}>Transfer</h2>
        </div>
        <div style={{padding: '0 20px 30px 20px'}}> 
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div className="input-group">
            <label style={{ display: 'block', marginBottom: '10px' }}>MonkeyPouch ID/Name:</label>
            <input 
              name="id" value={formData.id} onChange={handleChange}
              style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '2px solid #2d3e26', outline: 'none', fontSize: '1.1rem' }} 
            />
          </div>

          <div className="input-group">
            <label style={{ display: 'block', marginBottom: '10px' }}>Amount:</label>
            <input 
              name="amount" type="number" value={formData.amount} onChange={handleChange}
              style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '2px solid #2d3e26', outline: 'none', fontSize: '1.1rem' }} 
            />
          </div>

          <div className="input-group">
            <label style={{ display: 'block', marginBottom: '10px' }}>References:</label>
            <input 
              name="ref" value={formData.ref} onChange={handleChange}
              style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '2px solid #2d3e26', outline: 'none', fontSize: '1.1rem' }} 
            />
          </div>
        </div>
        <div style={{ padding: '0 2px' }}>
        {/* 3. SHOW ERROR MESSAGE: If amount > balance, warn them in red */}
        {!hasEnoughBalance && formData.amount !== "" && (
          <p style={{ color: '#8b0000', fontSize: '14px', marginBottom: '10px', fontWeight: 'bold' }}>
            ⚠️ Insufficient balance! Your current balance is RM {balance.toFixed(2)}
          </p>
        )}

<button 
      onClick={() => onNext(formData)}
      disabled={!canProceed}// 2. Disable button if form is incomplete
      className="btn-primary" 
      style={{ 
        marginTop: '20px', 
        backgroundColor: canProceed ? '#2d3e26' : '#6e6e6e', // 3. Change color to gray when disabled
        color: 'white', 
        padding: '15px', 
        borderRadius: '12px', 
        border: 'none', 
        fontWeight: 'bold',
        cursor: canProceed ? 'pointer' : 'not-allowed',
        transition: 'background-color 0.3s ease'
      }}
    >
      {hasEnoughBalance ? "Proceed" : "Check Balance"}
    </button>
        </div>
            </div>
        </div>
  </div>
  )
}