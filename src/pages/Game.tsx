import React, { useEffect, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GameContext } from "../features/Game.context";

function Game() {
  const { questions, categories, currentQuestion, answerQuestion, totalQuestions } =
    useContext(GameContext);
  const navigate = useNavigate();

  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!questions.length) navigate("/");
  }, []);

 

  function onBinClick(e: React.MouseEvent) {
    if (e.target instanceof HTMLElement) {
      const answer = e.target.getAttribute("data-category");

      const isCorrectAnswer = answer == questions[currentQuestion].answer;

      answerQuestion(isCorrectAnswer);

      if(currentQuestion === totalQuestions - 1){
        navigate("/results");
      } else {
        navigate("/result");
      }
    }
  }
  return (
    <main className="page-container">
      <Link to="/" className="btn btn-primary btn-exit-top">
        Quit
      </Link>
      <h1 className="instructions h2">
        In which bin would you put the waste shown in the picture below? (Please
        select a bin.)
      </h1>
      <div className="question">
        {questions.length && <img className="question-img" src={"./assets/images/" + questions[currentQuestion].question} />}
      </div>
      <div className="categories">
        {categories.map((category, index) => (
          <button
            key={index}
            data-category={category.name}
            onClick={onBinClick}
            className="category"
          >
            <p>{category.name}</p>
            <img aria-label={category.name} src={"./assets/bins/" + category.imageURL} />
          </button>
        ))}
      </div>
      <small className="copyright">&copy; SmarterWaste</small>

    </main>
  );
}

export default React.memo(Game);