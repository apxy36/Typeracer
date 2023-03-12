function Replaybutton(props){

    function replay(){
        props.onReplaying();
    }
  function replayagainstself() {
    props.onReplayingAgainstSelf();
  }
  function leaveself() {
    props.onLeaving();
  }
    return(
        
        <button className = " replay-btn reset-btn" onClick={replay} onMouseOver={replayagainstself} onMouseLeave={leaveself}>Replay</button>
    
    )
}

export default Replaybutton;