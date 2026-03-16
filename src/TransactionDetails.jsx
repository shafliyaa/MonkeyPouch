export default function TransactionDetails({ transaction, onBack }) {
  if (!transaction) return null;

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
      <div  className="green-card" style={{ 
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
          <h2 style={{ fontSize:'20px',textAlign: 'center', margin: '10px 0 10px 0', color: '#2d3e26' }}>Transaction Details</h2>
        </div>
        <div style={{padding: '0 20px 30px 20px'}}>
          <div style={{ textAlign: 'center', margin: '15px 0' }}>
            <p style={{ color: '#555' }}>Amount:</p>
            <h1 style={{ fontSize: '2rem' }}>MYR {transaction.amount}</h1>
          </div>

          <div style={{ lineHeight: '1.5' }}>
            <p><strong>Name</strong><br/> {transaction.name}</p>
            <p><strong>Date</strong><br/> {transaction.date}</p>
            <p><strong>Reference Number</strong><br/> {transaction.id}</p>
            <p><strong>Location</strong><br/> {transaction.location}</p>
            <p><strong>References</strong><br/> {transaction.references}</p>
          </div>
        </div>
      </div>
    </div>
  );
}