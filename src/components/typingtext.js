

function Updatecurrentcharacter(input, correctchar, originalstring) {
  // The function takes three parameters: 
  // input: the string input from the user
  // correctchar: the correct character to be typed
  // originalstring: the original string to be typed

  let resultinput = "",
      currentoutput = "",
      incompleteinput = "";
  // Three empty strings are initialized for later use

  if (input.at(-1) === correctchar) { // if the input matches the correct character
    resultinput = originalstring.slice(0,input.length); // set the resultinput to the original string up to the current input
    if (resultinput.length !== originalstring.length) { // if the result input doesn't match the original string length, then set the currentoutput to the next character in the original string
      currentoutput = originalstring.at(resultinput.length);
      document.getElementById("current").style.backgroundColor = 'yellow'; // set background color of input to yellow
    } else {
      currentoutput = ""; // if the result input matches the original string length, then set the currentoutput to an empty string
    }
    
    incompleteinput = originalstring.slice(resultinput.length + 1); // set the incompleteinput to the remaining original string after the resultinput
    return [resultinput, incompleteinput, currentoutput]; // return an array of three values
  } else { // if the input doesn't match the correct character
    document.getElementById("current").style.backgroundColor = 'red'; // set the background color of the input to red
    document.getElementById("name-input").value = document.getElementById("name-input").value.slice(0,-1); // remove the last character of the input
    resultinput = input.slice(0,-1); // set the resultinput to the input without the last character
    incompleteinput = originalstring.slice(resultinput.length + 1); // set the incompleteinput to the remaining original string after the resultinput
    currentoutput = correctchar; // set the currentoutput to the correct character
    
    return [resultinput, incompleteinput, currentoutput]; // return an array of three values
  }
}

export default Updatecurrentcharacter;
// This function is exported to be used in other parts of the program.
