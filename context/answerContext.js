import React from "react";
import { number } from "yup/lib/locale";

const AnswerContext = React.createContext({
  theme: false,
  userScore: null | number,
  userSelectedAnswers: [],
  changeTheme: () => {},
  updateUserSelectedAnswers: (answer) => {},
  updateUserScore: (score) => {},
});

export const AnswerContextProvider = ({ children }) => {
  const [theme, setTheme] = React.useState(false);
  const [userSelectedAnswers, setUserSelectedAnswers] = React.useState(
    new Set()
  );
  const [userScore, setUserScore] = React.useState(null);
  const changeTheme = () => {
    setTheme((prevTheme) => !prevTheme);
  };

  const updateUserSelectedAnswers = (newAnswer) => {
    const newArr = Array.from(userSelectedAnswers);
    newArr.push(newAnswer);
    setUserSelectedAnswers(new Set(newArr));
  };

  const updateUserScore = (newScore) => {
    setUserScore(newScore);
  };
  const value = {
    theme,
    userSelectedAnswers,
    changeTheme,
    updateUserSelectedAnswers,
    updateUserScore,
    userScore,
  };

  return (
    <AnswerContext.Provider value={value}>{children}</AnswerContext.Provider>
  );
};

export default function useAnswerContext() {
  return React.useContext(AnswerContext);
}
