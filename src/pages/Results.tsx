import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import { GameContext } from "../features/Game.context";

import Icon from "../components/Icon";
import Smiley from "../components/Face";

import successSound from "../assets/audio/Success.mp3";
import failureSound from "../assets/audio/Failure.mp3";

type Props = {};

export default function Results({}: Props) {
  const {
    questions,
    correctAnswers,
    totalQuestions,
    reset,
    getQuestions,
    saveScores
  } = useContext(GameContext);
  const [isGameReset, setIsGameReset] = useState(false);
  const navigate = useNavigate();

  const dataRef = useRef({
    questions,
    correctAnswers,
    totalQuestions,
    reset,
    getQuestions
  })

  const audioRef = useRef<HTMLAudioElement>()
  

  function onTryAgainClick(e: React.MouseEvent | React.KeyboardEvent) {

    //@ts-ignore
    if(!e.key || e.key == " "){
      reset();
      getQuestions();
    }

  }

  useEffect(() => {
    saveScores();
    audioRef.current = new Audio(correctAnswers >= Math.ceil(totalQuestions / 2) ? successSound : failureSound);
    audioRef.current.play();
  }, [])

  useEffect(() => {
    if (!questions.length) {
      setIsGameReset(true);
    }
  }, [questions.length]);

  useEffect(() => {
    if(isGameReset && questions.length){
      navigate("/play")
    }
  }, [isGameReset, questions.length])


  function renderFinalMessage() {
    switch (dataRef.current!.correctAnswers) {
      case 5:
        return "You are perfect in recycling!";
      case 4:
        return "Good job!";
      case 3:
        return "Half way there!";
      case 2:
        return "You can do better!";
      case 1:
        return "You have a lot to learn!";
      case 0:
      default:
        return "Poor effort — try again!";
    }
  }


  return (
    <div className="page-container">
      <Smiley type={dataRef.current!.correctAnswers >= Math.ceil(dataRef.current!.totalQuestions / 2) ? "smile" : "frown"} />
      <h1 className="result">{renderFinalMessage()}</h1>

      <p className="result-copy">
        You got <span className="final-score">{dataRef.current!.correctAnswers}/{dataRef.current!.totalQuestions}</span> questions right!
      </p>
      <div className="btn-group">
        <Link className="btn btn-primary" onClick={onTryAgainClick} to=""  autoFocus>
          {dataRef.current!.correctAnswers === dataRef.current!.totalQuestions ? "Play" : "Try"} Again
        </Link>
        <Link className="btn btn-secondary" to="/info">
          Learn About Recycling
        </Link>
        <Link className="btn btn-secondary" to="/">
          Back To Start
        </Link>
      </div>
      <small className="copyright">&copy; SmarterWaste</small>
    </div>
  );
}
