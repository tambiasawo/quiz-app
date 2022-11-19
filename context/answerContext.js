import React from "react";

const AnswerContext = React.createContext({
  theme: false,
  userSelectedAnswers: [],
  changeTheme: () => {},
  updateUserSelectedAnswers: (answer) => {},
});

export const AnswerContextProvider = ({ children }) => {
  const [theme, setTheme] = React.useState(false);
  const [userSelectedAnswers, setUserSelectedAnswers] = React.useState([]);
  const changeTheme = () => {
    setTheme((prevTheme) => !prevTheme);
  };

  const updateUserSelectedAnswers = (newAnswer) => {
    const newArr = [...userSelectedAnswers];
    newArr.push(newAnswer);
    setUserSelectedAnswers(newArr);
  };

  const value = {
    theme,
    userSelectedAnswers,
    changeTheme,
    updateUserSelectedAnswers,
  };

  return (
    <AnswerContext.Provider value={value}>{children}</AnswerContext.Provider>
  );
};

export default function useAnswerContext() {
  return React.useContext(AnswerContext);
}
