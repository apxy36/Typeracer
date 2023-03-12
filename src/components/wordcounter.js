function Wordcounter (input = ''){ //function for counting words 
  let wordcount = 0;
  let string = input;
  for (let i = 0; i < string.length; i++){
    const currentstr = string.at(i);
    if (currentstr === " "){
      wordcount ++;
    }
  }
  return wordcount;
}
 export default Wordcounter;