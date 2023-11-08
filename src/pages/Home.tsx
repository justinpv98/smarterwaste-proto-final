import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";

// Context
import { GameContext } from "../features/Game.context";

// Components
import Icon from "../components/Icon";

function Home({}) {
  const { getQuestions, reset, scores, getScores } = useContext(GameContext);

  useEffect(() => {
    reset();
    getScores();
    getQuestions();
  }, []);

  return (
    <main className="page-container page-container--home">
      <div className="circles" role="presentation">
        <div className="circles-left">
          <div className="circle circle-1">
            <Icon icon="plus" size={48} />
          </div>
          <div className="circle circle-2">
            <Icon icon="recycle" size={48} />
          </div>
          <div className="circle circle-3">
            <Icon icon="recycle" size={48} />
          </div>
          <div className="circle circle-4">
            <Icon icon="plus" size={48} />
          </div>
          <div className="circle circle-5">
            <Icon icon="plus" size={48} />
          </div>
          <div className="circle circle-6">
            <Icon icon="recycle" size={48} />
          </div>
          <div className="circle circle-7">
            <Icon icon="recycle" size={48} />
          </div>
          <div className="circle circle-8">
            <Icon icon="plus" size={48} />
          </div>
        </div>

        <div className="circles-right">
          <div className="circle circle-1">
            <Icon icon="plus" size={48} />
          </div>
          <div className="circle circle-2">
            <Icon icon="recycle" size={48} />
          </div>
          <div className="circle circle-3">
            <Icon icon="recycle" size={48} />
          </div>
          <div className="circle circle-4">
            <Icon icon="plus" size={48} />
          </div>
          <div className="circle circle-5">
            <Icon icon="plus" size={48} />
          </div>
          <div className="circle circle-6">
            <Icon icon="recycle" size={48} />
          </div>
          <div className="circle circle-7">
            <Icon icon="recycle" size={48} />
          </div>
          <div className="circle circle-8">
            <Icon icon="plus" size={48} />
          </div>
        </div>
      </div>
      <div className="title">
        <h1 className="display">Welcome to SmarterWaste!</h1>
        <p className="h2">It's a nice day to learn about recycling!</p>
      </div>
      <div className="btn-group">
        <Link className="btn btn-primary" to="play">
          Play A Game
        </Link>
        <Link className="btn btn-secondary" to="info">
          Learn About Recycling
        </Link>
        {scores.length ? <Link className="btn btn-secondary" to="scores">See Scores</Link> : null}
      </div>
      <p className="h4 disclaimer">
        This game was designed at the request of the Swiss Government with the
        primary aim of educating adolescents, international students and recent
        immigrants about the recycling practices employed within the nation.
      </p>
      <small className="copyright">&copy; SmarterWaste</small>
    </main>
  );
}

export default React.memo(Home);