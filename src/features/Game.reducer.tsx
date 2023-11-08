import {
  GET_QUESTIONS,
  ANSWER_QUESTION,
  RESET,
  SAVE_SCORES,
  GET_CATEGORIES,
} from "../constants/actionTypes";

type Question = {
  question: string;
  answer: string;
};

type CategoryExample = {
  name: string;
  imageURL: string;
};

export type Category = {
  name: string;
  infoName: string;
  description: string;
  imageURL: string;
  examples: CategoryExample[];
};

type Score = {
  correctAnswers: number;
  totalQuestions: number;
};

export type Data = {
  questions: Question[];
  totalQuestions: number;
  correctAnswers: number;
  currentQuestion: number;
  isAnswerCorrect: boolean;
  scores: Score[];
  categories: Category[];
  getCategories: () => any;
  getQuestions: () => any;
  answerQuestion: (isAnswerCorrect: boolean) => any;
  getScores: () => any;
  saveScores: () => any;
  reset: () => any;
};

type Action =
  | {
      type: typeof GET_CATEGORIES;
      payload: Category[];
    }
  | {
      type: typeof GET_QUESTIONS;
      payload: Question[];
    }
  | {
      type: typeof ANSWER_QUESTION;
      payload: boolean;
    }
  | {
      type: typeof SAVE_SCORES;
      payload: Score[];
    }
  | {
      type: typeof RESET;
    };

function reducer(state: Data, action: Action): Data {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case GET_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
        totalQuestions: action.payload.length,
      };
      break;
    case ANSWER_QUESTION: {
      return {
        ...state,
        currentQuestion: (state.currentQuestion += 1),
        correctAnswers: action.payload
          ? state.correctAnswers + 1
          : state.correctAnswers,
        isAnswerCorrect: action.payload,
      };
    }
    case SAVE_SCORES: {
      return { ...state, scores: action.payload };
    }
    case RESET: {
      return {
        ...state,
        questions: [],
        correctAnswers: 0,
        currentQuestion: 0,
        totalQuestions: 0,
        isAnswerCorrect: false,
      };
    }
    default:
      return state;
  }
}

export default reducer;
