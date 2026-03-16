export default function StatusBar() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
     
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
      <div style={{ display: 'flex', right: 0}}>
        <img src={"/public/status.png"}/>
      </div>
    </div>
  );
}