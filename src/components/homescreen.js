import { useState } from 'react';
import Modal from './modal';
import Backdrop from './backdrop';
import Startbutton from './startbutton';
import Typingengine from './textracer';
//import Backdrop2 from './backdrop2';
//import Typingtext from './typingtext';

const Logger = require('./logger');
const logger = new Logger();


function Startingbutton (props) {
    const [confirmationisopen, setconfirmationisopen] = useState(false);
    const [raceisopen, setraceisopen] = useState(false);

    logger.on("start is pressed", () => {
        setconfirmationisopen(true);
    })
    logger.on("cancel start", () => {
        alert('yes');
        setconfirmationisopen(false);
    })
    function closeconfirmationstate (){
        setconfirmationisopen(false);
    }

    function openrace (){
        setraceisopen(true);
        //alert('race is on');
    }
    function closerace (){
        setraceisopen(false);
    }
    function openconfirmationstate (){
        setconfirmationisopen(true);
    }

    function cancellingcompoundfunc (){
        closeconfirmationstate();
        closerace();
    }

    function confirmingcompoundfunc (){
        closeconfirmationstate();
        openrace();
    }
    
return (
    <div>
<div>
      {!raceisopen && < Startbutton onClicking = {openconfirmationstate} />}
      { confirmationisopen && <Modal onCancel = {cancellingcompoundfunc} onConfirm = {confirmingcompoundfunc}/>}
      { confirmationisopen && <Backdrop onCancel = {closeconfirmationstate}/>}
      </div>
      { raceisopen && <Typingengine />}
      
      </div>
);
}

export default Startingbutton;