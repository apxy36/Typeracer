function Backspaced (input, originalstring){ //the function resets the strings to their previous position
  let resultinput = "",
      currentoutput = "",
      incompleteinput = "";
  
  resultinput = originalstring.slice(0,input.length);
    currentoutput = originalstring.at(resultinput.length);
    incompleteinput = originalstring.slice(resultinput.length + 1);

    return [resultinput, incompleteinput, currentoutput];
}
export default Backspaced;