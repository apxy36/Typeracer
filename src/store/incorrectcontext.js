import { createContext, useState } from "react";

const Incorrectcontext  = createContext({
    incorrectindexes: [],
    totalIncorrect: 0,
    addIncorrect: () => {}
});

export function Incorrectcontextprovider (props){
    const [incorrectchars, setincorrectchars] = useState([]);
    function addIncorrectchar (incorrectchar){
        setincorrectchars((previncorretchars) => {
            return previncorretchars.concat(incorrectchar);
        });
    }
    function resetIncorrectchars (){
        setincorrectchars([]);
    }
    const incorrect = {
        incorrectindexes: incorrectchars,
        totalIncorrect: incorrectchars.length,
        addIncorrect : addIncorrectchar
    };
    return <Incorrectcontext.Provider value={incorrect}>
        {props.children}
    </Incorrectcontext.Provider>
}

export default Incorrectcontext;