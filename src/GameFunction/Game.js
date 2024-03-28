import React, { useState, useEffect } from "react";
import "../GameStyle/Game.css";
import GameOver from "../Images/gameover.png";
import Thinker from "../Images/thinker.png";
import Win from "../Images/win.png";
import Wrong from "../Images/wrong.png";

function Game() {
  const [attempt, setAttempt] = useState(10);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [winningNumber, setWinningNumber] = useState(
    Math.floor(Math.random() * 101) + 1
  );
  const [guess, setGuess] = useState("");
  const [guessArray, setGuessArray] = useState([]);
  const [message, setMessage] = useState("Guess a number");
  const [showModal, setShowModal] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [currentImage, setCurrentImage] = useState(Thinker);
  const [isCorrectGuess, setIsCorrectGuess] = useState(false);

  useEffect(() => {
    console.log("Winning number:", winningNumber);
  }, [winningNumber]);

  const checkGuess = () => {
    const numGuess = parseInt(guess, 10);
    setIsCorrectGuess(false); // Ensure the guess is reset each time

    if (!numGuess || numGuess < 1 || numGuess > 100) {
      setMessage("Enter a number between 1 and 100");
      setCurrentImage(Wrong);
    } else if (guessArray.includes(numGuess)) {
      setMessage("You already guessed that number!");
      setCurrentImage(Wrong);
    } else {
      setGuessArray(oldArray => [...oldArray, numGuess]);
      setGuess("");

      if (numGuess === winningNumber) {
        setScore(score + 1);
        setMessage(`Correct! The number was ${winningNumber}`);
        setCurrentImage(Win);
        setIsCorrectGuess(true);

        // Optionally start a new round
        setWinningNumber(Math.floor(Math.random() * 101) + 1);
        setGuessArray([]);
        setAttempt(10);
      } else {
        setMessage(numGuess < winningNumber ? "Too low!" : "Too high!");
        setCurrentImage(Wrong);
        setAttempt(attempt - 1);

        if (attempt - 1 <= 0) {
          setGameOver(true);
          setMessage(`Game Over! The number was ${winningNumber}`);
          setCurrentImage(GameOver);
        }
      }
    }
  };

  const resetGame = () => {
    setGuess("");
    setGuessArray([]);
    setAttempt(10);
    setScore(0);
    setGameOver(false);
    setIsCorrectGuess(false);
    setWinningNumber(Math.floor(Math.random() * 101) + 1);
    setCurrentImage(Thinker);
  };

  return (
    <div className="game-container">
      {showModal && (
        <div className="modal-container">
          <div className="modal">
            <h1>Guess My Number</h1>
            <p>Are you ready to play?</p>
            <button className="task-button" onClick={() => setShowModal(false)}>
              Yes
            </button>
            <button className="task-button" onClick={() => window.location.reload()}>
              No
            </button>
          </div>
        </div>
      )}

      <div className="header">
        <h1>GUESS MY NUMBER</h1>
        <p>Guess the number between 1 and 100</p>
      </div>

      <div className="score">
        <p>Attempts: {attempt}</p>
        <p>Score: {score}</p>
        <p>High Score: {highScore}</p>
      </div>

      <div className={`game-window ${isCorrectGuess ? 'correct' : ''}`}>
        <img src={currentImage} alt="Game Status" className="game-image" />
        <input
          className="input"
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          disabled={gameOver}
        />
        <button
          className="check-button"
          onClick={checkGuess}
          disabled={gameOver}
        >
          Check
        </button>
        <p>{message}</p>
      </div>

      <div className="guess-history">
        <p>Guess History: {guessArray.join(", ")}</p>
      </div>

      <button className="reset-button" onClick={resetGame}>
        Reset
      </button>
    </div>
  );
}

export default Game;
