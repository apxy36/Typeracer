function Resetbutton(props){

    function reset(){
        props.onResetting();
    }
    return(
        <div><br></br>
        <button className = "reset-btn" onClick={reset}>Reset Typeracer</button>
    </div>
    )
}

export default Resetbutton;