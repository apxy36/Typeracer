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
let incorrectcount = 0;
let startingtime = 0;
let starttime = null;
let finaltime = 0;
let wpm = 0;
let racecarpos = 0;
let texttimearray = [];
let replaystring = "";
let countdown;


// const teststr = QuotableAPI();
// alert(teststr);
function Typingengine() {
  //const [inputvalue, setinputvalue] = useState("");
  //const nameInput = document.getElementById("name-input"); 
  const [racestatus, setracestatus] = useState("");
  const [quote, setQuote] = useState("");
  const [initial, setInitial] = useState(true);
  const [replaystate, setreplaystate] = useState(false);
  const [replaybtnstate, setreplaybtnstate] = useState(false);
  const [bestrunstate, setbestrunstate] = useState({timearray: [], str: ""});
  const [replayracestate, setreplayracestate] = useState(false);
  const [inputValue, setInputValue] = useState("");
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

  async function fetchNewQuote() {
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

  useEffect(() => {
    if(replayracestate === false){
      fetchNewQuote();
      //alert("found");
    }
    
    setInitial(true);
  }, []);

  // let fetchNewQuote = () => {
  //   fetch("http://api.quotable.io/random")
  //     .then(res => res.json())
  //     .then(
  //       (quote) => {
  //         setQuote(quote.content);  
  //       }
  //     )
  // }
  if (!data) return null;
  if (!quote) return null;
  let origstr = quote;


  let completestr = '';
  let currentstr = origstr.at(completestr.length);
  let incompletestr = origstr.slice(1);

  let replaycompletestr = '';
  let replayincompletestr = '';

  let wordcount = 0;
  let accuracy;



  // http://api.quotable.io/random



  let endingtime = 0;

  let backspacebool = false;
  const d = new Date();
  const d2 = new Date();
  //var audio = new Audio('sfx.mp3');




  //document.getElementById("test1").innerHTML = "hello";
  // document.getElementById("completed").innerHTML = completestr;    
  // document.getElementById("current").innerHTML = currentstr;
  // document.getElementById("incomplete").innerHTML = incompletestr;

  //<div className = "generaltext"><p style ="color:greenyellow" id="completed"></p><p className="currenttext" id="current"></p><p>id = "incomplete"></p></div>
  const generatetext = () => {
    fetchNewQuote();
    resetText();
    if (!data) return null;
    if (!quote) return null;
  }

  const resetText = () => {
    document.getElementById("name-input").value = '';
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
    texttimearray = [];
    currentstr = origstr.at(0);
    incompletestr = origstr.slice(1);
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
    setracestatus("");
  }

  const handleClearClick = () => {
    setInputValue("");
    document.getElementById("name-input").value = "";
  };


  const initreplayrace = (origstring) => {
    //document.getElementById("name-input").value = '';
    origstr = origstring;
    document.getElementById("completed").innerHTML = '';
    document.getElementById("current").innerHTML = origstring.at(0);
    document.getElementById("incompletetext").innerHTML = origstring.slice(1);
    document.getElementById("name-input").type = "text";
    //document.getElementById("replaystr").innerHTML = '';
    setreplayracestate(false);
    if(replaystate){
      document.getElementById("replaycompleted").innerHTML = '';
    document.getElementById("replayincomplete").innerHTML = '';
    }
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
    handleClearClick();
    openracestatus();
  }



function generalreplay(array, origstring){
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
  const replaytext = () => {
    setreplaystate(true);
    document.getElementById("replaycompleted").style.whiteSpace = "pre-wrap";
    document.getElementById("replayincomplete").style.whiteSpace = "pre-wrap";
    document.getElementById("name-input").type = "hidden";
    replayincompletestr = '';
    replaycompletestr = '';
    replaystring = '';
    document.getElementById("replaycompleted").innerHTML = '';
    document.getElementById("replayincomplete").innerHTML = '';
    generalreplay(texttimearray, origstr);
    //document.getElementById("replaystr").innerHTML = '';
    //let data = JSON.stringify(texttimearray);
    //alert(data);
    //resetText2();
    

    //document.getElementById("name-input").type = "text";
  }

function CountdownTimer() {
  const [secondsLeft, setSecondsLeft] = useState(3);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setSecondsLeft((prevSecondsLeft) => prevSecondsLeft - 1);
      countdown = secondsLeft;
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

function callback(){
  alert("Timer finished!");
}
const Replaybesttext = () => {
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

  const showreplayagainstself = () => {
    setreplaybtnstate(true);
  }
  const hidereplayagainstself = () => {
    if(replayracestate) {return;}
    setreplaybtnstate(false);
  }
  const replayagainstself = () => {
    setreplaystate(true);
    //CountdownTimer();
    //alert(bestrunstate);
    setreplayracestate(true);
    //Replaybesttext(); 
    document.getElementById("name-input").type = "text";
  }



  function openracestatus() {
    startingtime = Date.now();
    setracestatus("started");
    if (initial === false) {

    }
  }
  function closeracestatus() {
    setInitial(false);
    endingtime = Date.now();
    finaltime = ((endingtime - startingtime) / 1000).toFixed(2);
    
    setracestatus("over");
    alert(bestrunstate);
if (bestrunstate.timearray.length !== 0){
      if (bestrunstate.timearray[bestrunstate.timearray.length - 2].time < finaltime){
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

  function addchar(letter) {

    if (starttime === null) {
      starttime = Date.now();
    }

    let timestamp = Date.now() - starttime;
    texttimearray.push(new Char(timestamp, letter));
  }

  return (
    <div>

      {replaystate === true && <div className="generaltext">
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

            accuracy = Math.max(((origstr.length - incorrectcount) / origstr.length * 100).toFixed(1), 0);
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
        {racestatus === "over" && <span>Accuracy:{(((origstr.length - incorrectcount) / origstr.length) * 100).toFixed(2) + '%'}</span>}
        <br></br>
        <div>Time: {finaltime}</div>
        {racestatus === "over" && <span>WPM: {wpm}</span>}
      </div>}
      <br></br>
      <br></br>
      <img src={Racetrack} className="racetrack" id="track" alt=""></img>
      <img src={Racecar} className="racecar" id="racer" alt=""></img>
        <br></br><br></br>

      {replayracestate && <CountdownTimer />}
      <br></br>
    </div>
  );


}

export default Typingengine;