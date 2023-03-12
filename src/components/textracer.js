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
    fetchNewQuote();
    resetText();
    setFetchQuoteState(true);
    if (!data) return null;
    if (!quote) return null;
  }

  const resetText = () => {         //this resets all variables for a new run
    document.getElementById("completed").innerHTML = '';
    document.getElementById("current").innerHTML = origstr.at(0);
    document.getElementById("incompletetext").innerHTML = origstr.slice(1);
    document.getElementById("name-input").type = "text";
    //document.getElementById("replaystr").innerHTML = '';
    if(replaystate){
      document.getElementById("replaycompleted").innerHTML = '';
    document.getElementById("replayincomplete").innerHTML = '';
    }
    
    completestr = '';
    setreplaystate(false);
    setreplayracestate(false);
    setreplayinitstate(false);
    texttimearray = [];
    currentstr = origstr.at(0);
    incompletestr = origstr.slice(1);
    setSolereplaystate(false);
    incorrectcount = 0;
    wordcount = 0;
    startingtime = 0;
    endingtime = 0;
    finaltime = 0;
    wpm = 0;
    racecarpos = 0;
    document.getElementById("racer").style.marginLeft = 0 + "px";
    document.getElementById("current").style.backgroundColor = 'yellow';
    //document.getElementById("Wordcounter").innerHTML = 0;
    handleClearInput();
    setracestatus("");
  }

  const handleClearInput = () => { //this is to clear the input field
    setInputValue("");
    document.getElementById("name-input").value = "";
  };


  const initreplayrace = (origstring = bestrunstate.str) => { //this prepares the UI to let the player race against themself
    //document.getElementById("name-input").value = '';
    origstr = origstring;
    document.getElementById("completed").innerHTML = ''; //these 3 lines of code reset the quote displayed
    document.getElementById("current").innerHTML = origstring.at(0);
    document.getElementById("incompletetext").innerHTML = origstring.slice(1);
    document.getElementById("name-input").type = "text";
    //document.getElementById("replaystr").innerHTML = '';
    setreplayinitstate(true);
    setreplayracestate(false);
    setreplaystate(true);
    setreplaybtnstate(true);
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
    document.getElementById("racer").style.marginLeft = 0 + "px";
    document.getElementById("current").style.backgroundColor = 'yellow';
    //document.getElementById("Wordcounter").innerHTML = 0;
    setracestatus("replay");
    handleClearInput();
    openracestatus();
  }



function generalreplay(array, origstring){ //this is the replay function
let time = null;
document.getElementById("name-input").value = '';
    // let test = new KeyboardEvent("keydown", {key: "H"});
    // document.dispatchEvent(test);
    for (let chars = 0; chars < array.length; chars++) {

      let character = array[chars];
      if (time === null) {
        time = character.time;
      } //else if (chars >= 1) {
      //   time = texttimearray[chars - 1].time;
      // }
      //alert(time);
      //time = null ? time = character.timestamp : time = texttimearray[chars - 1].timestamp;
      //alert(chars);
      //alert(JSON.stringify(character), character.timestamp - time);
      setTimeout(
        () => {
          //alert(character.timestamp - time);

          //  let event = new KeyboardEvent("keydown", {key: character.letter});
          //  //alert("yes")
          //  document.dispatchEvent(event);
          replaystring = replaystring + character.letter;
          replaycompletestr = replaystring;
          replayincompletestr = origstring.slice(replaycompletestr.length);

          //alert(character.letter);
          document.getElementById("replaycompleted").innerHTML = replaycompletestr;
          document.getElementById("replayincomplete").innerHTML = replayincompletestr;
          //alert()

        }, character.time - time
      );

    }
}
  const replaytext = () => { //this is the function called to just replay the text
    setreplaystate(true);
    setSolereplaystate(true);
    //document.getElementById("replaystr").innerHTML = '';
    //let data = JSON.stringify(texttimearray);
    //alert(data);
    //resetText2();
    

    //document.getElementById("name-input").type = "text";
  }

function CountdownTimer() { //this is the function to countdown before the player replays against themself
  const [secondsLeft, setSecondsLeft] = useState(3);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setSecondsLeft((prevSecondsLeft) => prevSecondsLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (secondsLeft === 0) {
      // Do something here after the timer is finished
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
  useEffect(() => {
    if (replaystate) {
      document.getElementById("replaycompleted").style.whiteSpace = "pre-wrap";
      document.getElementById("replayincomplete").style.whiteSpace = "pre-wrap";
      document.getElementById("name-input").type = "hidden";
      let replayincompletestr = "";
      let replaycompletestr = "";
      let replaystring = "";
      document.getElementById("replaycompleted").innerHTML = "";
      document.getElementById("replayincomplete").innerHTML = "";

      let time = null;

      for (let chars = 0; chars < texttimearray.length; chars++) {
        let character = texttimearray[chars];
        if (time === null) {
          time = character.time;
        }

        (function (character, time) {
          setTimeout(() => {
            replaystring = replaystring + character.letter;
            replaycompletestr = replaystring;
            replayincompletestr = origstr.slice(replaycompletestr.length);

            document.getElementById("replaycompleted").innerHTML = replaycompletestr;
            document.getElementById("replayincomplete").innerHTML = replayincompletestr;
          }, character.time - time);
        })(character, time);
      }
      setreplaystate(false);
    }
  }, [replaystate]);

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
    //sCountdownTimer();

   setreplayracestate(true);
   initreplayrace(bestrunstate.str);
    document.getElementById("replaycompleted").style.whiteSpace = "pre-wrap";
    document.getElementById("replayincomplete").style.whiteSpace = "pre-wrap";
    //document.getElementById("name-input").type = "hidden";
    replayincompletestr = '';
    replaycompletestr = '';
    replaystring = '';
    document.getElementById("replaycompleted").innerHTML = '';
    document.getElementById("replayincomplete").innerHTML = '';

    document.getElementById("name-input").value = '';
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
    
    setracestatus("over");
if (bestrunstate.timearray.length !== 0){ //decides whether to store the new run in the array
      if (bestrunstate.timearray[bestrunstate.timearray.length - 1].time < finaltime){
        setbestrunstate(() => ({
          timearray: texttimearray,
          str: origstr,
        }));
      }
    } else {
      setbestrunstate(() => ({
          timearray: texttimearray,
          str: origstr,
        }));
    }
  }

  function addchar(letter) { //logs the time and chararcter whenever a correct letter is entered

    if (starttime === null) {
      starttime = Date.now();
    }

    let timestamp = Date.now() - starttime;
    texttimearray.push(new Char(timestamp, letter));
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


          const nameInput = document.getElementById("name-input");
          currentstr = document.getElementById("current").innerHTML;
          //alert(currentstr + '1')
          if (backspacebool === false) {
            if (racestatus === "") {
              openracestatus();
            }
            //currentstr = document.getElementById("current");
            if (nameInput.value.at(-1) !== currentstr) {
              incorrectcount += 1;
            } else {
              addchar(nameInput.value.at(-1));
              //texttimearray.append
            }
            [completestr, incompletestr, currentstr] = Updatecurrentcharacter(nameInput.value, currentstr, origstr);
            //alert(currentstr + '2')

          } else {
            [completestr, incompletestr, currentstr] = Backspaced(nameInput.value, origstr);
            document.getElementById("current").style.backgroundColor = 'yellow';
            backspacebool = false;
          }

          document.getElementById("completed").innerHTML = completestr;
          document.getElementById("current").innerHTML = currentstr;
          //alert(currentstr + '3')
          //(typeof currentstr !== 'undefined') ? (document.getElementById("current").innerHTML = currentstr) : (currentstr = '');
          document.getElementById("incompletetext").innerHTML = incompletestr;


          if (nameInput.value.at(-1) === " ") {
            wordcount = Wordcounter(completestr);
            //document.getElementById("Wordcounter").innerHTML = wordcount;
          }
          if (completestr.length === origstr.length) {
            closeracestatus();
            //document.getElementById("incorrectcount").innerHTML = incorrectcount;
            wordcount = Wordcounter(origstr) + 1;
            wpm = (((wordcount) / finaltime) * 60).toFixed(0);

            //accuracy = Math.max(((origstr.length - incorrectcount) / origstr.length * 100).toFixed(1), 0);
            //document.getElementById("wordsperminute").innerHTML = wpm;

            //alert(((origstr.length - incorrectcount) / origstr.length) * 100 + '%');

          }
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