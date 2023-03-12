import React, { useState, useRef, useEffect } from "react";
import Updatecurrentcharacter from "./typingtext";
import Backspaced from "./backspaced";
import Resetbutton from "./resetbutton";
import Wordcounter from "./wordcounter";
import Generatebutton from "./generatequote";
import Racecar from "./racecar.png";
import Racetrack from "./racetrack2.png";
import Char from "./textlogger";
import Replaybutton from "./replaybutton";
import ReplayAgainstSelfbutton from "./replayagainstyourself";
let incorrectcount = 0;   //initialising all variables
let startingtime = 0;
let starttime = null;
let finaltime = 0;
let wpm = 0;
let racecarpos = 0;
let texttimearray = [];
let replaystring = "";



// const teststr = QuotableAPI();
// alert(teststr);
function Typingengine() {
  //const [inputvalue, setinputvalue] = useState("");
  //const nameInput = document.getElementById("name-input"); 
  const [racestatus, setracestatus] = useState(""); //this is to keep track of whether or not you should be typing
  const [quote, setQuote] = useState(""); //this stores the quote that needs to be typed
  const [replaystate, setreplaystate] = useState(false); //this keeps track of whether you are replaying or not
  const [replaybtnstate, setreplaybtnstate] = useState(false); //this keeps track of whether the replay button displays
  const [bestrunstate, setbestrunstate] = useState({timearray: [], str: ""}); //this keeps track of the best run 
  const [replayracestate, setreplayracestate] = useState(false); //this keeps track of whether you are racing against self
  const [inputValue, setInputValue] = useState(""); //this stores the input
  const [fetchQuotestate, setFetchQuoteState] = useState(true);
  const [solereplaystate, setSolereplaystate] = useState(false);
  const [replayinitstate, setreplayinitstate] = useState(false);
  //alert('yes')
  //   useEffect(() => {
  //   fetch("http://api.quotable.io/random")
  //     .then(res => res.json())
  //     .then(
  //       (quote) => {
  //         setQuote(quote.content);  
  //       }
  //     )
  // },[]);
  const [data, setData] = React.useState(null);

  async function fetchNewQuote() {        //this fetches the quote to be typed from the quotable api library
    try {
      const response = await fetch("https://api.quotable.io/random");
      const { statusCode, statusMessage, ...data } = await response.json();
      if (!response.ok) throw new Error(`${statusCode} ${statusMessage}`);
      setData(data);
      setQuote(data.content);
    } catch (error) {
      // If the API request failed, log the error to console and update state
      // so that the error will be reflected in the UI.
      console.error(error);
      setData({ content: "Opps... Something went wrong" });
    }
  }

  useEffect(() => {     //this loads the quote in at appropriate times
    fetchNewQuote();
  }, [fetchQuotestate]);

  // let fetchNewQuote = () => {
  //   fetch("http://api.quotable.io/random")
  //     .then(res => res.json())
  //     .then(
  //       (quote) => {
  //         setQuote(quote.content);  
  //       }
  //     )
  // }
  if (!data) return null; //this makes sure that the UI doesnt load before the quote does
  if (!quote) return null;
  let origstr = quote;
  if (replaystate){
    origstr = bestrunstate.str;
    //alert("ok");
  }


  let completestr = '';
  let currentstr = origstr.at(completestr.length);
  let incompletestr = origstr.slice(1);

  let replaycompletestr = '';
  let replayincompletestr = '';

  let wordcount = 0;



  // http://api.quotable.io/random



  let endingtime = 0;

  let backspacebool = false;
  //var audio = new Audio('sfx.mp3');




  //document.getElementById("test1").innerHTML = "hello";
  // document.getElementById("completed").innerHTML = completestr;    
  // document.getElementById("current").innerHTML = currentstr;
  // document.getElementById("incomplete").innerHTML = incompletestr;

  //<div className = "generaltext"><p style ="color:greenyellow" id="completed"></p><p className="currenttext" id="current"></p><p>id = "incomplete"></p></div>
  const generatetext = () => { //this is the function which is called to generate new quotes after the initial one
  // This function generates a new quote for the user to type.
  fetchNewQuote(); // This function fetches a new quote from an external API.
  resetText(); // This function resets all variables for a new typing run.
  setFetchQuoteState(true); // This sets the state of the quote-fetching process to true.
  if (!data) return null; // If there is no quote data, this function returns null.
  if (!quote) return null; // If there is no quote text, this function returns null.
}

const resetText = () => {         
  // This function resets all variables for a new typing run.
  document.getElementById("completed").innerHTML = ''; // This clears the completed section of the UI.
  document.getElementById("current").innerHTML = origstr.at(0); // This sets the current letter to the first letter of the quote.
  document.getElementById("incompletetext").innerHTML = origstr.slice(1); // This sets the incomplete text to the rest of the quote.
  document.getElementById("name-input").type = "text"; // This sets the input field to accept text.
  if(replaystate){ // If the replay state is active, this clears the replay section of the UI.
    document.getElementById("replaycompleted").innerHTML = '';
    document.getElementById("replayincomplete").innerHTML = '';
  }
  completestr = ''; // This sets the completed string to an empty string.
  setreplaystate(false); // This sets the replay state to false.
  setreplayracestate(false); // This sets the replay race state to false.
  setreplayinitstate(false); // This sets the replay initialization state to false.
  texttimearray = []; // This sets the text time array to an empty array.
  currentstr = origstr.at(0); // This sets the current string to the first letter of the quote.
  incompletestr = origstr.slice(1); // This sets the incomplete string to the rest of the quote.
  setSolereplaystate(false); // This sets the solo replay state to false.
  incorrectcount = 0; // This sets the incorrect count to 0.
  wordcount = 0; // This sets the word count to 0.
  startingtime = 0; // This sets the starting time to 0.
  endingtime = 0; // This sets the ending time to 0.
  finaltime = 0; // This sets the final time to 0.
  wpm = 0; // This sets the words per minute to 0.
  racecarpos = 0; // This sets the race car position to 0.
  document.getElementById("racer").style.marginLeft = 0 + "px"; // This sets the race car position to 0.
  document.getElementById("current").style.backgroundColor = 'yellow'; // This sets the background color of the current letter to yellow.
  handleClearInput(); // This clears the input field.
  setracestatus(""); // This sets the race status to an empty string.
}

const handleClearInput = () => { 
  // This function clears the input field.
  setInputValue(""); // This sets the input value to an empty string.
  document.getElementById("name-input").value = ""; // This sets the input field to an empty string.
};


  const initreplayrace = (origstring = bestrunstate.str) => { 
  // This function prepares the UI for the player to race against themselves.
  // It takes an optional argument origstring which is the string that the player will race against. 
  // If no argument is provided, it uses the string from bestrunstate.

  // Reset the quote displayed on the UI
  document.getElementById("completed").innerHTML = ''; 
  document.getElementById("current").innerHTML = origstring.at(0);
  document.getElementById("incompletetext").innerHTML = origstring.slice(1);
  origstr = origstring;

  // Set the type of the input field to text
  document.getElementById("name-input").type = "text";

  // Reset the variables used to keep track of the race
  completestr = '';
  texttimearray = [];
  currentstr = origstring.at(0);
  incompletestr = origstring.slice(1);
  incorrectcount = 0;
  wordcount = 0;
  startingtime = 0;
  endingtime = 0;
  finaltime = 0;
  wpm = 0;
  racecarpos = 0;

  // Reset the position of the racecar on the UI
  document.getElementById("racer").style.marginLeft = 0 + "px";

  // Change the background color of the first character in the incomplete string to yellow
  document.getElementById("current").style.backgroundColor = 'yellow';

  // Reset the race status, clear the input field and show the race status
  setracestatus("replay");
  handleClearInput();
  openracestatus();
}


function generalreplay(array, origstring) { 
  // This function is the replay function. It takes two arguments - an array of objects that represent the user's typing,
  // and the original string that the user was racing against.

  let time = null;

  // Reset the value of the input field
  document.getElementById("name-input").value = '';

  // Loop through the array of characters that the user typed
  for (let chars = 0; chars < array.length; chars++) {
    let character = array[chars];

    // If time is null, set it to the time of the current character. This is used to calculate the delay between each character.
    if (time === null) {
      time = character.time;
    }

    // Use setTimeout to delay the replay of each character by the appropriate amount of time
    setTimeout(() => {
      // Append the current character to the replay string
      replaystring = replaystring + character.letter;
      replaycompletestr = replaystring;
      replayincompletestr = origstring.slice(replaycompletestr.length);

      // Update the completed and incomplete strings in the UI
      document.getElementById("replaycompleted").innerHTML = replaycompletestr;
      document.getElementById("replayincomplete").innerHTML = replayincompletestr;

    }, character.time - time);
  }
}

  const replaytext = () => { //this is the function called to just replay the text
    setreplaystate(true);
    setSolereplaystate(true);
    document.getElementById("incompletetext").innerHTML = "";
      document.getElementById("current").innerHTML = "";
    //document.getElementById("replaystr").innerHTML = '';
    //let data = JSON.stringify(texttimearray);
    //alert(data);
    //resetText2();
    

    //document.getElementById("name-input").type = "text";
  }

function CountdownTimer() { // Function to countdown before the player replays against themselves
  const [secondsLeft, setSecondsLeft] = useState(3); // Declare state for seconds left and set it to 3 initially
  useEffect(() => {
    // Use an effect to update the seconds left state every second
    const intervalId = setInterval(() => {
      setSecondsLeft((prevSecondsLeft) => prevSecondsLeft - 1); // Subtract 1 from previous seconds left
    }, 1000);

    // Clear the interval when the component unmounts or the state changes
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Use an effect to do something when secondsLeft reaches 0
    if (secondsLeft === 0) {
      // Call the Replaybesttext() function when the timer is finished
      Replaybesttext();
    }
  }, [secondsLeft]);

  return (
    <div>
      <h1>{secondsLeft}</h1> 
    </div>
  );
}


function Replayer(){
  const [replaystate1, setReplaystate1] = useState(false);
  useEffect(() => {
    // Check if the replaystate variable is true
    if (solereplaystate) {
      // Set the whiteSpace property of two elements to "pre-wrap" to preserve spacing
      document.getElementById("replaycompleted").style.whiteSpace = "pre-wrap";
      document.getElementById("replayincomplete").style.whiteSpace = "pre-wrap";
      // Hide the "name-input" element
      document.getElementById("name-input").type = "hidden";
      // Initialize some variables to empty strings
      let replayincompletestr = "";
      let replaycompletestr = "";
      let replaystring = "";
      // Clear the contents of two elements
      document.getElementById("replaycompleted").innerHTML = "";
      document.getElementById("replayincomplete").innerHTML = "";
      document.getElementById("incompletetext").innerHTML = "";
      document.getElementById("current").innerHTML = "";
      // Initialize a variable to track the time delay between characters
      let time = null;
      let string = "";
      for (let chars = 0; chars < texttimearray.length; chars++) {
        let character = texttimearray[chars];
        string = string + character.letter;
      }

      // Loop through each character in the texttimearray array
      for (let chars = 0; chars < texttimearray.length; chars++) {
        let character = texttimearray[chars];
        // If this is the first character, set the time variable to its time
        if (time === null) {
          time = character.time;
        }

        // Create a closure to preserve the values of the character and time variables
        (function (character, time) {
          // Use a setTimeout function to delay the output of each character
          setTimeout(() => {
            // Add the character's letter to the replaystring variable
            replaystring = replaystring + character.letter;
            // Set the replaycompletestr variable to the full replaystring
            replaycompletestr = replaystring;
            // Set the replayincompletestr variable to the remaining characters in the original string
            replayincompletestr = string.slice(replaycompletestr.length);

            // Set the innerHTML of two elements to display the completed and incomplete text
            document.getElementById("replaycompleted").innerHTML = replaycompletestr;
            document.getElementById("replayincomplete").innerHTML = replayincompletestr;
          }, character.time - time); // Delay the output of this character based on its time and the time of the first character
        })(character, time);
      }
      // Set the replaystate variable to false to stop the loop from running again
      setreplaystate(false);
    }
  }, [replaystate1]); // This function runs whenever the replaystate variable changes

  // Return some HTML elements to display the completed and incomplete text
  return(
    <div className="generaltext">
        <span className="replaycomplete" id="replaycompleted" style={{ whiteSpace: "pre-wrap" }}>

        </span><span id="replayincomplete" style={{ whiteSpace: "pre-wrap" }}></span>

      </div>
  );

}


// function Replayagainstself(){        //botched attempt at trying to use useEffect for replaying against self

//   //const replayRef = useRef();
//   useEffect(() => {
//       let replayincompletestr = "";
//       let replaycompletestr = "";
//       let replaystring = "";

//     if (replaystate) {
//       //initreplayrace();
//       document.getElementById("replaycompleted").style.whiteSpace = "pre-wrap";
//       document.getElementById("replayincomplete").style.whiteSpace = "pre-wrap";
//       document.getElementById("name-input").type = "text";
      
//       document.getElementById("replaycompleted").innerHTML = "";
//       document.getElementById("replayincomplete").innerHTML = "";
      
//       let time = null;

//       for (let chars = 0; chars < bestrunstate.timearray.length; chars++) {
//         let character = bestrunstate.timearray[chars];
//         if (time === null) {
//           time = character.time;
//         }

//         (function (character, time) {
//           setTimeout(() => {
//             replaystring = replaystring + character.letter;
//             replaycompletestr = replaystring;
//             replayincompletestr = bestrunstate.str.slice(replaycompletestr.length);

//             document.getElementById("replaycompleted").innerHTML = replaycompletestr;
//             document.getElementById("replayincomplete").innerHTML = replayincompletestr;
//           }, character.time - time);
//         })(character, time);
//       }
//       setreplaystate(false);
//     }
//   }, [replayracestate]);

//   return(
//     <div className="generaltext">
//         <span className="replaycomplete" id="replaycompleted" style={{ whiteSpace: "pre-wrap" }}>

//         </span><span id="replayincomplete" style={{ whiteSpace: "pre-wrap" }}></span>

//       </div>
//   );
// }
const Replaybesttext = () => { //this is the code for replaying against self, it's quite similar to the normal replay function
    // Set replay race state to true
    setreplayracestate(true);
    setreplayinitstate(false);
    // Initialize replay race with the best run state string
    initreplayrace(bestrunstate.str);

    // Set the style of the replay elements
    document.getElementById("replaycompleted").style.whiteSpace = "pre-wrap";
    document.getElementById("replayincomplete").style.whiteSpace = "pre-wrap";

    // Reset the replay strings
    replayincompletestr = '';// 
    replaycompletestr = '';
    replaystring = '';

    // Clear the replay elements
    document.getElementById("replaycompleted").innerHTML = '';
    document.getElementById("replayincomplete").innerHTML = '';

    // Clear the user input field
    document.getElementById("name-input").value = '';

    // Call the general replay function with the best run state time array and string
    generalreplay(bestrunstate.timearray, bestrunstate.str);
}


  const showreplayagainstself = () => { //these are to control whether the replay against self button is displayed
    setreplaybtnstate(true);
  }
  const hidereplayagainstself = () => {
    if(replayracestate || replayinitstate) {return;}
    setreplaybtnstate(false);
  }
  const replayagainstself = () => { //this is the function that clicking the replay against self button calls
    setreplaystate(true);
    origstr = bestrunstate.str;
    handleClearInput();
    //CountdownTimer();
    //alert(bestrunstate);
    setreplayinitstate(true);
    //Replaybesttext(); 
    document.getElementById("name-input").type = "text";
  }



  function openracestatus() {
    startingtime = Date.now(); //gets the starting time of the run
    setracestatus("started");
  }
  function closeracestatus() {
    endingtime = Date.now(); //gets the end time
    finaltime = ((endingtime - startingtime) / 1000).toFixed(2); //calculates time elaspec during the run
    //setreplaystate(false);
    document.getElementById("current").innerHTML = "";
    document.getElementById("incompletetext").innerHTML = "";
    setreplayracestate(false);
    setracestatus("over");
    if(localStorage.getItem("bestrun") !== null){
      setbestrunstate(JSON.parse(localStorage.getItem("bestrun")));
      alert(localStorage.getItem("bestrun"));
    }
if (bestrunstate.timearray.length !== 0){
   //decides whether to store the new run in the array
   //alert(bestrunstate.timearray[bestrunstate.timearray.length - 1].time);
      if (bestrunstate.timearray[bestrunstate.timearray.length - 1].time > finaltime){
        setbestrunstate(() => ({
          timearray: texttimearray,
          str: origstr,
        }));
      }
      localStorage.setItem("bestrun", JSON.stringify(bestrunstate));
    } else {
      setbestrunstate(() => ({
          timearray: texttimearray,
          str: origstr,
        }));
        localStorage.setItem("bestrun", JSON.stringify(bestrunstate));
    }
    
  }
  function Storebestrun(){
    const [storestate, setStorestate] = useState(false);
    useEffect(()=> {
      localStorage.setItem("bestrun", JSON.stringify(bestrunstate)); //should stringify once code is ready
    }, [storestate]);
    
  }
  function addchar(letter) { //logs the time and chararcter whenever a correct letter is entered

    if (starttime === null) { //defines case for first character where the start time may not have been defined yet
      starttime = Date.now();
    }

    let timestamp = Date.now() - starttime; //calculates how many milliseconds have elapsed since the start of the run
    texttimearray.push(new Char(timestamp, letter)); //adds new Char object to texttimearray with the calculated timestamp and letter
  }

  return (
    <div>
      
      {solereplaystate && <Replayer/>}
      {replaystate && <div className="generaltext">
        <span className="replaycomplete" id="replaycompleted">

        </span><span id="replayincomplete"></span>

      </div>}

      <br></br>
      <br></br>
      <div className="generaltext">


        <div><span className="complete" id="completed">

        </span><span className="currenttext" id="current">{currentstr}</span><span id="incompletetext">{incompletestr}</span>

        </div>
      </div>

      <br></br>
      <br></br>
      <br></br>
      <input
        className="input no-outline"
        type="text"

        id="name-input"

        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value)

        }}
        onKeyDown={(e) => {
          //audio.play();
          if (e.key === "Backspace") {
            //alert('Backspace is Pressed!');
            backspacebool = true;

          }
          if (e.key === "Escape") {
            resetText();
          }


        }
        }
        onInput={(e) => {

            // Get the name input element and the current character
            const nameInput = document.getElementById("name-input");
            currentstr = document.getElementById("current").innerHTML;

            // If backspacebool is false (meaning a character was added)...
            if (backspacebool === false) {

              // If the race has not started yet, open the race status
              if (racestatus === "") {
                openracestatus();
              }

              // If the last character entered is not the current character, increment incorrectcount
              if (nameInput.value.at(-1) !== currentstr) {
                incorrectcount += 1;
              } else {
                // If the last character entered is the current character, add it and update the texttimearray
                addchar(nameInput.value.at(-1));
              }

              // Update the current character, completed string, and incomplete string
              [completestr, incompletestr, currentstr] = Updatecurrentcharacter(nameInput.value, currentstr, origstr);

            } else {
              // If backspacebool is true (meaning a character was deleted), update the completed string, incomplete string, and current character
              [completestr, incompletestr, currentstr] = Backspaced(nameInput.value, origstr);
              document.getElementById("current").style.backgroundColor = 'yellow';
              backspacebool = false;
            }

            // Update the completed, current, and incomplete strings on the UI
            if(solereplaystate === false){
              document.getElementById("completed").innerHTML = completestr;
            document.getElementById("current").innerHTML = currentstr;
            document.getElementById("incompletetext").innerHTML = incompletestr;
            }
            

            // If a word has been completed, update the word count
            if (nameInput.value.at(-1) === " ") {
              wordcount = Wordcounter(completestr);
            }

            // If the race is completed, close the race status and update the word count and WPM
            if (completestr.length === origstr.length) {
              closeracestatus();
              wordcount = Wordcounter(origstr) + 1;
              wpm = (((wordcount) / finaltime) * 60).toFixed(0);
            }

            // Update the race car position on the UI
            racecarpos = (completestr.length / origstr.length) * Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) * 0.8;
            document.getElementById("racer").style.marginLeft = racecarpos + "px";

          }

        }
      />
      {racestatus === "started" && <span
        style={{
          left: document.getElementById("current").getBoundingClientRect().left,
          top: document.getElementById("current").getBoundingClientRect().top,
        }}
        className="caret"
      >&nbsp;&#8201;
      </span>}
      <Resetbutton onResetting={resetText} />
      <br></br>
      <br></br>
      <Generatebutton onGenerating={generatetext} />
      {racestatus === "over" && <Replaybutton onReplaying={replaytext} onReplayingAgainstSelf={showreplayagainstself} />}
      {replaybtnstate && <ReplayAgainstSelfbutton onReplayingSelf={replayagainstself} onReplayingAgainstSelf={showreplayagainstself} onLeaving={hidereplayagainstself} />}
      <br></br>
      {racestatus === "over" && <div className="stats">
        {racestatus === "over" && <span>Number of Incorrect characters:</span>}
        {racestatus === "over" && <span id="incorrectcount">{incorrectcount}</span>}
        <br></br>
        {racestatus === "over" && <span>Accuracy:{Math.max((((origstr.length - incorrectcount) / origstr.length) * 100).toFixed(2),0) + '%'}</span>}
        <br></br>
        <div>Time: {finaltime}</div>
        {racestatus === "over" && <span>WPM: {wpm}</span>}
      </div>}
      <br></br>
      <br></br>
      <img src={Racetrack} className="racetrack" id="track" alt=""></img>
      <img src={Racecar} className="racecar" id="racer" alt=""></img>
        <br></br><br></br>

      {replayinitstate && <CountdownTimer />}
      <br></br>
    </div>
  );


}

export default Typingengine;