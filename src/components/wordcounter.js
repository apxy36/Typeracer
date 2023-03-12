function Wordcounter(input = '') { // A function that counts the number of words in a string
  let wordcount = 0; // Initialize a variable to keep track of the word count
  let string = input; // Initialize a variable to store the input string

  for (let i = 0; i < string.length; i++) { // Loop through each character in the string
    const currentstr = string.at(i); // Get the current character in the string

    if (currentstr === " ") { // Check if the current character is a space
      wordcount++; // If it is, increment the word count
    }
  }

  return wordcount; // Return the final word count
}

export default Wordcounter; // Export the function so it can be used in other modules
