import React, { createContext, useReducer } from "react";
import reducer from "./Game.reducer";
import { preloadImage } from "../utils/utils";

import {
  GET_QUESTIONS,
  ANSWER_QUESTION,
  RESET,
  GET_CATEGORIES,
  SAVE_SCORES,
} from "../constants/actionTypes";
import { Data, Category } from "./Game.reducer";

// Data
import settings from "../assets/data/settings.json";

type Question = {
  question: string;
  answer: string;
};

const initialState: Data = {
  questions: [],
  correctAnswers: 0,
  currentQuestion: 0,
  totalQuestions: 0,
  isAnswerCorrect: false,
  scores: [],
  categories: [],
  getCategories: () => {},
  getQuestions: () => {},
  answerQuestion: (_isAnswerCorrect: boolean) => {},
  reset: () => {},
  getScores: () => {},
  saveScores: () => {},
};

export const GameContext = createContext(initialState);

type GameProviderProps = {
  children: React.ReactNode;
};

export const GameProvider = ({ children }: GameProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const MAX_QUESTIONS = settings[0].settings.maxQuestions;

  async function fetchCategories() {
    return await fetch("assets/data/categories.json")
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.log(error));
  }

  async function getCategories() {
    const parsedCategories: Category[] | undefined = await fetchCategories();

    if (!parsedCategories) return;

    parsedCategories.forEach(category => preloadImage(category.imageURL, 'bins'));

    dispatch({ type: GET_CATEGORIES, payload: parsedCategories });
  }

  async function fetchQuestions() {
    return await fetch("assets/data/questions.json")
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.log(error));
  }

  async function getQuestions() {
    const parsedQuestions: Question[] | undefined = await fetchQuestions();

    if (!parsedQuestions) return;

    const maxQuestions =
      parsedQuestions.length < MAX_QUESTIONS
        ? parsedQuestions.length
        : MAX_QUESTIONS;

    const randomQuestions = [];

    for (let i = 0; i < maxQuestions; i++) {
      const randomIndex = Math.floor(Math.random() * parsedQuestions.length);
      const randomQuestion = parsedQuestions.splice(randomIndex, 1);
      randomQuestions.push(...randomQuestion);
    }

    dispatch({ type: GET_QUESTIONS, payload: randomQuestions });

    randomQuestions.forEach((question) => {
      preloadImage(question.question)
    });
  }

  function answerQuestion(isAnswerCorrect: boolean) {
    dispatch({ type: ANSWER_QUESTION, payload: isAnswerCorrect });
  }

  function reset() {
    dispatch({ type: RESET });
  }

  function getScores() {
    let scores = state.scores;
    const savedScores = localStorage.getItem("scores");

    if (!scores.length) {
      if (savedScores) {
        scores = JSON.parse(savedScores);
      }
    }

    dispatch({ type: SAVE_SCORES, payload: scores });
  }

  function saveScores() {
    const savedScores = localStorage.getItem("scores");
    const currentScore = {
      correctAnswers: state.correctAnswers,
      totalQuestions: state.totalQuestions,
    };

    if (!savedScores) {
      const payload = [currentScore];
      dispatch({ type: SAVE_SCORES, payload });
      localStorage.setItem("scores", JSON.stringify([currentScore]));
    } else {
      let scores = JSON.parse(savedScores);
      if (scores >= 99) {
        scores = scores.slice(0, 100);
      }
      const allScores = [...scores, currentScore];
      const scoresJSON = JSON.stringify(allScores);
      dispatch({ type: SAVE_SCORES, payload: allScores });
      localStorage.setItem("scores", scoresJSON);
    }
  }

  return (
    <GameContext.Provider
      value={{
        ...state,
        getCategories,
        getQuestions,
        answerQuestion,
        getScores,
        saveScores,
        reset,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
