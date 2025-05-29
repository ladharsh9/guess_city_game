import React, { useState, useEffect } from 'react';
import './App.css'; 


const cities = ['Mumbai', 'Delhi', 'Ahmedabad', 'Surat','Daman'];

function App() {
  const [selectedWord, setSelectedWord] = useState('');
  const [displayWord, setDisplayWord] = useState('');
  const [correctLetters, setCorrectLetters] = useState([]);
  const [incorrectLetters, setIncorrectLetters] = useState([]);
  const [guessesLeft, setGuessesLeft] = useState(6);
  const [inputLetter, setInputLetter] = useState('');

  const selectRandomCity = () => {
    const index = Math.floor(Math.random() * cities.length);
    return cities[index];
  };

  const startNewGame = () => {
    const word = selectRandomCity();
    setSelectedWord(word);
    setDisplayWord('*'.repeat(word.length));
    setCorrectLetters([]);
    setIncorrectLetters([]);
    setGuessesLeft(6);
    setInputLetter('');
  };

  useEffect(() => {
    startNewGame();
  }, []);

  const handleGuess = () => {
    if (!inputLetter.match(/^[A-Za-z]$/)) {
      setInputLetter('');
      return;
    }

    const letter = inputLetter.toUpperCase();

    if (correctLetters.includes(letter) || incorrectLetters.includes(letter)) {
      setInputLetter('');
      return;
    }

    let found = false;
    const wordArray = displayWord.split('');

    for (let i = 0; i < selectedWord.length; i++) {
      if (selectedWord[i].toUpperCase() === letter) {
        wordArray[i] = letter;
        found = true;
      }
    }

    if (found) {
      setDisplayWord(wordArray.join(''));
      setCorrectLetters([...correctLetters, letter]);
    } else {
      setIncorrectLetters([...incorrectLetters, letter]);
      setGuessesLeft(guessesLeft - 1);
    }

    setInputLetter('');

    if (!found && guessesLeft - 1 === 0) {
      setTimeout(() => {
        alert('OOPS.. You Lost!');
        startNewGame();
      }, 300);
    }

    if (!wordArray.includes('*')) {
      setTimeout(() => {
        alert('Congratulations.. You won..!!');
        startNewGame();
      }, 300);
    }
  };

  return (
    <>
    <nav class="navbar bg-body-tertiary">
  <div class="container-fluid d-flex justify-content-between align-items-center">
    <div class="navbar-brand">
      Guess the City Game 🔎
    </div>
    <div class="navbar-brand">
    Harsh Lad
      
    </div>
  </div>
</nav>

    <div className="container">
     
      <table className="table center-table">
        <tbody>
          <tr>
            <td colSpan="2">
             
              <p style={{ textAlign: 'center',fontFamily:'Roboto'}}>
                    Below is the name of a Indian city, hidden behind asterisks. 
                    <br/>You have 6 chances to guess the correct letters of city.
      
              </p>
            </td>
          </tr>
          <tr>
            <td colSpan="2" align="center">Guesses Left ➡️ {guessesLeft}</td>
          </tr>
          <tr>
            <td>✔️ Correct Letters: {correctLetters.join(', ')}</td>
            <td>✖️ Incorrect Letters: {incorrectLetters.join(', ')}</td>
          </tr>
          <tr>
            <td colSpan="2" align="center" style={{ fontSize: '25px' }}>{displayWord}</td>
          </tr>
          <tr>
            <td colSpan="2" align="center">
              <input
                type="text"
                value={inputLetter}
                onChange={(e) => setInputLetter(e.target.value)}
                maxLength="1"
                className="form-control"
                style={{ width: '250px', height: '50px', fontSize: '25px', textTransform: 'uppercase' }}
              />
            </td>
          </tr>
          <tr>
            <td colSpan="2" align="center">
              <button onClick={handleGuess} className="button">CHECK</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    </>
  );
}

export default App;
