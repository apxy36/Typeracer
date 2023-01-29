

// function Typingtext(input, origstr, backspacebool = false){


//     let resultinput = "",
//       currentoutput = "",
//       incompleteinput = "";
//       let correctchar = origstr.at(input.length)

//   if (input.at(-1) == correctchar) {
//     const currentstring = document.getElementById("current");
//     document.getElementById("completed").innerHTML = origstr.slice(0,input.length); //try to change this? resultinput = origtext.something? based on currentstr.index
//     if (resultinput.length !== origstr.length) {
//       currentoutput = origstr.at(resultinput.length);
//       document.getElementById("current").style.backgroundColor = 'yellow';
//     } else {
//       currentoutput = "";
//     }
    
//     incompleteinput = origstr.slice(resultinput.length + 1);
//     return [resultinput, incompleteinput, currentoutput];
//   } else {
//     //document.getElementById("print3").innerHTML = incorrectchars;
//     document.getElementById("current").style.backgroundColor = 'red';
    
//     document.getElementById("name-input").value = document.getElementById("name-input").value.slice(0,-1);
//     document.getElementById("completed").innerHTML = input.slice(0,-1);
//     incompleteinput = origstr.slice(resultinput.length + 1);
//     currentoutput = correctchar;

//     return(
//         <div>
//         <div><span class="generaltext" style ="color:greenyellow" id="completed"></span><span class="currenttext generaltext" id="current"></span><span class="generaltext" id = "incompletetext"></span></div>
//         </div>
//     )
// }
// }


function Updatecurrentcharacter(input, correctchar, originalstring) {
  //const incorrects = useContext(Incorrectcontext);
    let resultinput = "",
      currentoutput = "",
      incompleteinput = "";

  if (input.at(-1) === correctchar) {
    //alert(input.at(-1))
    resultinput = originalstring.slice(0,input.length); //try to change this? resultinput = origtext.something? based on currentstr.index
    if (resultinput.length !== originalstring.length) {
      currentoutput = originalstring.at(resultinput.length);
      document.getElementById("current").style.backgroundColor = 'yellow';
    } else {
      currentoutput = "";
    }
    
    incompleteinput = originalstring.slice(resultinput.length + 1);
    return [resultinput, incompleteinput, currentoutput];
  } else {
    //const charisincorrect = incorrects.addIncorrect()
    //document.getElementById("print3").innerHTML = incorrectchars;
    document.getElementById("current").style.backgroundColor = 'red';
    document.getElementById("name-input").value = document.getElementById("name-input").value.slice(0,-1);
    resultinput = input.slice(0,-1);
    incompleteinput = originalstring.slice(resultinput.length + 1);
    currentoutput = correctchar;
    
    // if (resultinput.length !== originalstring.length) {
    //     document.getElementById("current").style.backgroundColor = 'red';
    //   } else {
    //     currentoutput = "";
    //   }
    //   incompleteinput = originalstring.slice(resultinput.length)
    // return [resultinput, incompleteinput, currentoutput];
    return [resultinput, incompleteinput, currentoutput];
  }
}
export default Updatecurrentcharacter;