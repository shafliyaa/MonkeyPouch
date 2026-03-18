export default function KikiIntro({onBack}){
    return(
        <div style={{flex: 1,           /* Takes up all available space */
        overflowY: 'auto',  /* Makes only this part scrollable! */
        paddingBottom: '100px',
        padding: '0 20px 30px 20px'}}>
            <button onClick={onBack} style={{background:'none', border: 'none', fontSize: '30px', marginTop:"15px"}}>↩</button>
            <h1>KiKi - Your AI Partner</h1>
            <img style={{width:'250px',height:'300px'}}src={"/public/Kiki.png"}/>
            <p>"Hi! I’m Kiki, your personal money guard. I stay awake 24/7 to watch your wallet. 
            If I see someone who isn't you trying to take your money, I’ll step in to stop them. 
            You don't have to do anything—I’ve got your back!"</p>
            <p>I Get to Know You:</p>
            <p>1)I learn the places you usually visit and how you usually spend so I can spot anything "weird".</p>
            <p>2)I Check Every Move: Every time you send money, I double-check the details in a split second to make sure it's safe.</p>
            <p>3)I Stop the Bad Guys: If a stranger tries to use your account from a new phone or a faraway city, I’ll block it instantly.</p>
        </div>
    );
}
