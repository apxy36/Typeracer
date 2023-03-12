/**

This function takes in two parameters: input and originalstring
@param {string} input - The current input string
@param {string} originalstring - The original string to be typed
The function returns an array of three strings:
resultinput: The portion of the originalstring that has been typed so far
incompleteinput: The portion of the originalstring that is yet to be typed
currentoutput: The next character to be typed
*/

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