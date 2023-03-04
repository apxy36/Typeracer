function Replaybutton(props){

    function replay(){
        props.onReplaying();
    }
    return(
        
        <button className = " reset-btn" onClick={replay}>Replay</button>
    
    )
}

export default Replaybutton;