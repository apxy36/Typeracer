const { EventEmitter } = require('events');
const { execArgv, listenerCount } = require('process');
//resolve.fallback: { "process": require.resolve("process/browser") }

class Character {
    constructor(character, position, typed = 'no', initialcorrectness, finalcorrectness){
        this.character = character;
        this.position = position;
        //this.typed = typed;
        this.initialcorrectness = initialcorrectness;
        //this.finalcorrectness = finalcorrectness;
    }
}
//currentpos is the index of the input character
const Splittext = (text, currentpos, input) => { //incorrectpositions is an array, result is an array of objects
        let lengthoftext = text.length, textarray = [];
        for (let i = 0; i < lengthoftext; i++){
            textarray[i] = new Character(text.at(i), i);
        }

        for (let a = 0; a <= currentpos; a++){
            //textarray[a].typed = 'yes';
            textarray[a].initialcorrectness = 'yes';
        }
        if (currentpos !== text.length) {
        if(input ==  textarray[currentpos].character){
            textarray[currentpos].initialcorrectness = 'yes'
        } else {textarray.initialcorrectness = 'no'}}
        
        return textarray;
    }

export default Splittext;