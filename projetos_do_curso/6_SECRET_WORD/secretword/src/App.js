import './App.css';
import StartScreen from './component/StartScreen'
import { wordsList } from './data/words'
import { useCallback, useEffect, useState } from 'react'
import Game from './component/Game';
import GameOver from './component/GameOver';

const stages = [
  { id: 1, name: "start" }, { id: 2, name: "game" }, { id: 3, name: "end" }
]

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [pickedLetters, setPickedLetters] = useState([])

  const [guessedLetters, setGuessedLetters] = useState([]) //letras adivinhadas
  const [wrongLetters, setWrongLetters] = useState([]) //letras erradas
  const [guesses, setGuesses] = useState(3) //tentativas ainda válidas
  const [score, setScore] = useState(0) //pontuação

  const pickWordAndCategory = () => {
    // pick random category
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * categories.length)]

    // pick random word
    const word = words[category][Math.floor(Math.random() * words[category].length)]

    return { word, category }
  }

  // start the game
  const startGame = () => {

    clearLetterStates()
    // pick word and category
    const { word, category } = pickWordAndCategory()
    // vretate an array of letters
    let wordLetters = word.split("")
    wordLetters = wordLetters.map((letter) => letter.toLowerCase())
    // fill state
    setPickedWord(word)
    setPickedCategory(category)
    setPickedLetters(wordLetters)

    setGameStage(stages[1].name)
  }

  // process the letter input

  const verifyLetter = (letter) => {
    // putting letter to lower case because the reference lists are in lower case
    const normalizedLetter = letter.toLowerCase()
    // check if letter has already benn utilized
    if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return
    }

    // push guess letters or remove a guess
    pickedLetters.includes(normalizedLetter)
      ? setGuessedLetters((actualGuessesLetters) => [...actualGuessesLetters, normalizedLetter])
      : wrongLettersActions(normalizedLetter)

  }

  const wrongLettersActions = (normalizedLetter) => {
    setWrongLetters((actualWrongLetters) => [...actualWrongLetters, normalizedLetter])
    setGuesses((actualGuesses) => actualGuesses - 1)
  }

  // check if guesses ended
  useEffect(() => {
    if (guesses <= 0) {
      // reset all states
      clearLetterStates()
      setGameStage(stages[2].name)
    }
  }, [guesses])

  // check win condiction
  useEffect(() => {
    const uniqueLetters = [...new Set(pickedLetters)]

    // win condictions
    if(guessedLetters.length === uniqueLetters.length && gameStage === stages[1].name){
      setScore((actualScore) => actualScore += 100)
      startGame()
    }

  }, [guessedLetters, startGame, pickedLetters])

  const clearLetterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

  // restart the game
  const retry = () => {
    setScore(0)
    setGuesses(3)
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && <Game
        verifyLetter={verifyLetter}
        pickedWord={pickedWord}
        pickedCategory={pickedCategory}
        pickedLetters={pickedLetters}
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
        guesses={guesses}
        score={score} />}
      {gameStage === "end" && <GameOver retry={retry}
        score={score} />}
    </div>
  );
}

export default App;
