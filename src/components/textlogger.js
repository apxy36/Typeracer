import React from "react";

class Char { //defines the class for characters which will be used in the logging array in textracer.js
  constructor(startingtime, letter) {
    this.time = startingtime; //Date.now() - startingtime;
    this.letter = letter;
  }
}
export default Char;