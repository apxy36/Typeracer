function Generatebutton(props){

    function generate(){
        props.onGenerating();
    }
    return(
        <div><br></br>
        <button className = "reset-btn generate-btn" onClick={generate}>Generate New Quote</button>
    </div>
    )
}

export default Generatebutton;