function ReplayAgainstSelfbutton(props){

    function replayself(){
        props.onReplayingSelf();
    }
    return(
        
        <button className = "replayself-btn" onClick={replayself}>Against Yourself!</button>
    
    )
}

export default ReplayAgainstSelfbutton;