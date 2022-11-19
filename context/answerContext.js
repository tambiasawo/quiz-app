import React from "react";

const AnswerContext = React.createContext({
  theme: "",
  userSelectedAnswers: [],
});

export const AnswerContextProvider = ({ children }) => {
  const value = { theme: "", userSelectedAnswers: [] };

  return (
    <AnswerContext.Provider value={value}>{children}</AnswerContext.Provider>
  );
};

export default function useAnswerContext() {
  return React.useContext(AnswerContext);
}
