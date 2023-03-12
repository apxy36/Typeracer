function ReplayAgainstSelfbutton(props) {

  function replayself() {
    props.onReplayingSelf();
  }
  function replayagainstself() {
    props.onReplayingAgainstSelf();
  }
  function leaveself() {
    props.onLeaving();
  }
  return (

    <button className=" reset-btn replayself-btn" onClick={replayself} onMouseOver={replayagainstself} onMouseLeave={leaveself}>Against Yourself!</button>

  )
}

export default ReplayAgainstSelfbutton;