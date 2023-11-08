import React, { useContext } from "react";
import { GameContext } from "../features/Game.context";
import { Link } from "react-router-dom";

type Props = {};

export default function Scores({}: Props) {
  const { scores } = useContext(GameContext);
  return (
    <div className="page-container">
      <Link to="/" className="btn btn-primary btn-exit-top">
        Go Back
      </Link>
      <h1 className="display">Scores</h1>
      <ul className="scores">
        <li className="score-labels"><span>Round</span><span>Score</span></li>
        {scores.map((score, index) => (
          <li key={index} className="score"><span className="score-index">{index + 1}</span><span>{score.correctAnswers}/{score.totalQuestions}</span></li>
        ))}
      </ul>
      <small className="copyright">&copy; SmarterWaste</small>
    </div>
  );
}
