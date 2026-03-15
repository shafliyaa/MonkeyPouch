export default function StatusBar() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 25px 5px 25px', // Top, Right, Bottom, Left
      width: '100%',
      boxSizing: 'border-box',
      backgroundColor: 'transparent',
      fontSize: '14px',
      fontWeight: '600',
      color: '#333',
      zIndex: 100 // Ensures it stays on top of content
    }}>
      {/* Time - You can make this dynamic if you want! */}
      <div>9:41</div>

      {/* Icons - Using emojis for speed, but you can use Lucide icons later */}
      <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
        <span>📶</span> 
        <span>📶</span>
        <div style={{ 
          width: '22px', 
          height: '11px', 
          border: '1px solid #333', 
          borderRadius: '3px', 
          position: 'relative',
          padding: '1px'
        }}>
          <div style={{ backgroundColor: '#333', width: '70%', height: '100%', borderRadius: '1px' }}></div>
          {/* Small battery tip */}
          <div style={{ position: 'absolute', right: '-3px', top: '3px', width: '2px', height: '4px', backgroundColor: '#333', borderRadius: '0 1px 1px 0' }}></div>
        </div>
      </div>
    </div>
  );
}