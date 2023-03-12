function Replaybutton(props){

    function replay(){
        props.onReplaying();
    }
  function replayagainstself() {
    props.onReplayingAgainstSelf();
  }
//   function leaveself() {
//     props.Leaving();
//   }
    return(
        
        <button className = " replay-btn reset-btn" onClick={replay} onMouseOver={replayagainstself} >Replay</button>
    
    )
}

export default Replaybutton;