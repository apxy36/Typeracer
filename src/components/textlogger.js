import React from "react";

class Char {
  constructor(startingtime, letter) {
    this.time = startingtime; //Date.now() - startingtime;
    this.letter = letter;
  }
}
export default Char;