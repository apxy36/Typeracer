import React, { useState, useRef, useEffect} from "react";
import Updatecurrentcharacter from "./typingtext";
import Backspaced from "./backspaced";
import Resetbutton from "./resetbutton";
import Wordcounter from "./wordcounter";
import Generatebutton from "./generatequote";
import Racecar from "./racecar.png";
import Racetrack from "./racetrack2.png";
let incorrectcount = 0;
let startingtime = 0;
let finaltime = 0;
let wpm = 0;
let racecarpos = 0;

// const teststr = QuotableAPI();
// alert(teststr);
function Typingengine (){
    const [inputvalue, setinputvalue] = useState("");
    const nameInput = document.getElementById("name-input"); 
    const [racestatus, setracestatus] = useState("");
    const [quote, setQuote] = useState("");
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

  React.useEffect(() => {
    fetchNewQuote();
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
  const origstr = quote;


    let completestr = '';
    let currentstr = origstr.at(completestr.length);
    let incompletestr = origstr.slice(1);
    
    let wordcount = 0;
    let accuracy;

    
    
  // http://api.quotable.io/random

  
    
    
    let endingtime = 0;
    
    let backspacebool = false;
    const d = new Date();
    
    
    //document.getElementById("test1").innerHTML = "hello";
    // document.getElementById("completed").innerHTML = completestr;    
    // document.getElementById("current").innerHTML = currentstr;
    // document.getElementById("incomplete").innerHTML = incompletestr;

//<div className = "generaltext"><p style ="color:greenyellow" id="completed"></p><p className="currenttext" id="current"></p><p>id = "incomplete"></p></div>
    const generatetext = () => {
        fetchNewQuote();
        if(!data) return null;
        if (!quote) return null;

    }
   
    const resetText = () => {
        document.getElementById("completed").innerHTML = '';
            document.getElementById("current").innerHTML = origstr.at(0);
            document.getElementById("incompletetext").innerHTML = origstr.slice(1);
            document.getElementById("name-input").value = '';
            completestr = '';
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
            //document.getElementById("Wordcounter").innerHTML = 0;
            setracestatus("");
    }

    function resetText2(){
        document.getElementById("completed").innerHTML = '';
            document.getElementById("current").innerHTML = origstr.at(0);
            document.getElementById("incompletetext").innerHTML = origstr.slice(1);
            document.getElementById("name-input").value = '';
            completestr = '';
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
            //document.getElementById("Wordcounter").innerHTML = 0;
            setracestatus("");
    }
    
    function openracestatus(){
        startingtime = d.getTime();
        setracestatus("started");
    }
    function closeracestatus(){
        endingtime = d.getTime();
        finaltime = (Math.max((endingtime - startingtime) / 1000, 0)).toFixed(2);
        setracestatus("over");
        
        
    }
    
    return(
<div>
    <br></br>
    <br></br>
    <div className = "generaltext">
        

    <div><span className="complete" id="completed">
        
        </span><span className="currenttext" id="current">{currentstr}</span><span id = "incompletetext">{incompletestr}</span>
        
        </div>
        </div>
        
        <br></br>
        <br></br>
        <br></br>
        <input
        className="input"
        type="text"
        id="name-input"
        value={inputvalue}
        onChange={(e) => {
            setinputvalue(e.target.value)
            
        }} 
        onKeyDown={(e) => {
            if (e.key === "Backspace") {
                //alert('Backspace is Pressed!');
                backspacebool = true;
                
            }
            if (e.key === "Escape"){
                resetText2();
            }
        }
        }
        onInput={(e) => {
            
            
            const nameInput = document.getElementById("name-input"); 
            currentstr = document.getElementById("current").innerHTML;
            //alert(currentstr + '1')
            if(backspacebool === false){
              if (racestatus === ""){
                openracestatus();
            }
            //currentstr = document.getElementById("current");
            if (nameInput.value.at(-1) !== currentstr){
                incorrectcount += 1;
            }
            [completestr, incompletestr, currentstr] = Updatecurrentcharacter(nameInput.value, currentstr, origstr);
            //alert(currentstr + '2')

            } else {
            [completestr, incompletestr, currentstr] = Backspaced(nameInput.value, origstr);
              backspacebool = false;
            }
            
            document.getElementById("completed").innerHTML = completestr;
            document.getElementById("current").innerHTML = currentstr;
            //alert(currentstr + '3')
             //(typeof currentstr !== 'undefined') ? (document.getElementById("current").innerHTML = currentstr) : (currentstr = '');
            document.getElementById("incompletetext").innerHTML = incompletestr;
            

            if (nameInput.value.at(-1) === " "){
              wordcount = Wordcounter(completestr);
              //document.getElementById("Wordcounter").innerHTML = wordcount;
            }
            if (completestr.length === origstr.length){
                closeracestatus();
                //document.getElementById("incorrectcount").innerHTML = incorrectcount;
                wordcount = Wordcounter(origstr) + 1;
                wpm = (((wordcount) / finaltime) * 60).toFixed(0);
                
                accuracy = Math.max(((origstr.length - incorrectcount) / origstr.length * 100).toFixed(1),0);
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
            left:document.getElementById("current").getBoundingClientRect().left,
            top:document.getElementById("current").getBoundingClientRect().top,
        }}
        className="caret"
        >&nbsp;&#8201;
        </span>}
      <Resetbutton onResetting={resetText}/>
      <br></br>
      <Generatebutton onGenerating={generatetext}/>
      <br></br>
      {racestatus=== "over" && <div className="stats">
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
       <img src={Racecar} className="racecar" id="racer" alt = ""></img>
</div>
    );

    
}

export default Typingengine;