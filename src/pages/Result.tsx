import React, { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { GameContext } from "../features/Game.context";

import Icon from "../components/Icon";

import correctSound from "../assets/audio/CorrectAnswer.mp3";
import wrongSound from "../assets/audio/WrongAnswer.mp3";


type Props = {};

export default function Result({}: Props) {
  const { correctAnswers, totalQuestions, currentQuestion, questions, isAnswerCorrect } =
    useContext(GameContext);

    const audioRef = useRef<HTMLAudioElement>()


useEffect(() => {
  audioRef.current = new Audio(isAnswerCorrect ? correctSound : wrongSound);
  audioRef.current.play();
}, [])

  return (
    <div className="page-container">
      <div
        className={
          isAnswerCorrect
            ? "result-mark result-mark-success"
            : "result-mark result-mark-error"
        }
      >
        <Icon size={128} icon={isAnswerCorrect ? "check" : "close"} />
      </div>
      <h1 className="result">{isAnswerCorrect ? "Correct!" : "Incorrect!"}</h1>
      <p className="result-copy">
        You got{" "}
        <span className="final-score">
          {correctAnswers}/{totalQuestions}
        </span>{" "}
        questions right!
      </p>
      <div className="btn-group">
        <Link className="btn btn-primary" to="/play" autoFocus>
          Next Question
        </Link>
        <Link className="btn btn-secondary" to={`/info/${questions[currentQuestion - 1].answer.toLowerCase()}`} autoFocus>
          Learn About {questions[currentQuestion - 1].answer} Waste
        </Link>
        <Link className="btn btn-secondary" to="/">
          Back To Start
        </Link>
      </div>
      <small className="copyright">&copy; SmarterWaste</small>
    </div>
  );
}
