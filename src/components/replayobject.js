class Replay {
  constructor(replayarray, originalstring) {
    this.timearray = replayarray; //Date.now() - startingtime;
    this.str = originalstring;
  }
}
export default Replay;