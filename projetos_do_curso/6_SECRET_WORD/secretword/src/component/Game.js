import './Game.css'
import { useState, useRef } from 'react'

const Game = ({
    verifyLetter,
    pickedWord,
    pickedCategory,
    pickedLetters,
    guessedLetters,
    wrongLetters,
    guesses,
    score }) => {
        const [letter, setLetter] = useState("")
        const letterIputRef = useRef(null)

        const handleSubmit = (e) => {
            e.preventDefault();

            verifyLetter(letter)
            setLetter("")
            letterIputRef.current.focus()
        }
    return (
        <div className="game">
            <p className="points">
                <span>Pontuação: {score}</span>
            </p>
            <h1>Advinhe a palavra:</h1>
            <h3 className="tip">Dica sobre a palavra:
                <span>{pickedCategory}</span>
            </h3>
            <p>Voce ainda tem {guesses} tentativa(s).</p>
            <div className="wordContainer">
                {pickedLetters.map((letter, index) =>
                    guessedLetters.includes(letter)
                        ? (<span key={index} className="letter">{letter}</span>)
                        : (<span key={index} className="blankSquare"></span>)
                )}
            </div>
            <div className="choiceLetterContainer">
                <p>Tente advinhar uma letra da palavra:</p>
                <form onSubmit={handleSubmit}>
                    <input type="text"
                    name="letter"
                    maxLength="1"
                    required
                    onChange={(event) => setLetter(event.target.value)}
                    value={letter}
                    ref={letterIputRef}/>
                    <button>Jogar</button>
                </form>
            </div>
            <div>
                <p>Letras já utilizadas:</p>
                {wrongLetters.map((letter, index) =>
                    (<span key={index}>{letter}, </span>)
                )}
            </div>
        </div>
    )
}

export default Game
