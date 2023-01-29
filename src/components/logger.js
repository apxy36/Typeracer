console.log(__filename);
console.log(__dirname);

const EventEmitter = require('events'); 
//const emitter = new EventEmitter();

let url = "http://mylogger.io/log";


class Logger extends EventEmitter {
    log(message) {
        console.log(message);
    
        this.emit('messagelogged', { id: 1, url: 'http://' , message: message});
    }
    logincorrectchar(){
        
        //alert('incorrect');
        this.emit('incorrect char typed');
        
    }
    startbuttonpressed(){
        this.emit('start is pressed');
        //alert('clicked');
    }
    cancelconfirmationofstart(){
        this.emit('cancel start');
    }
}


//module.exports.log = log; //exporting function log
//module.exports = log; //exporting log as a function
//module.exports.endpoint = url; //exporting var url with the name endpoints


//node does not execute code from other modules directly, instead it wraps it in a func
//function(exports, require, module, __filename, __dirname)
module.exports = Logger;
//exports.addition = addnumbers;