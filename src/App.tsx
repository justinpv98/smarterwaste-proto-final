import React, { useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Info from "./pages/Info";
import Game from "./pages/Game";
import Result from "./pages/Result";
import Results from "./pages/Results";
import CategoryInfo from "./pages/CategoryInfo";
import Scores from "./pages/Scores";

import { GameContext } from "./features/Game.context";

function App() {

  const {getCategories} = useContext(GameContext)

  useEffect(() => {
    getCategories();
  }, [])


  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="info" element={<Info />} />
      <Route path="info/:category" element={<CategoryInfo />} />
      <Route path="play" element={<Game/>} />
      <Route path="result" element={<Result />} />
      <Route path="results" element={<Results />} />
      <Route path="scores" element={<Scores />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
