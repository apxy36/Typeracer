

function Startbutton (props){
function pressstart(){
    props.onClicking();
}

return (
    <div className="startbtndiv">
      <button className = 'startbtn' onClick={pressstart}>Start game</button>
      </div>
)
}
export default Startbutton;