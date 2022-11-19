import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Question } from "../utils/typings";
import { shuffle } from "../utils/shuffle";
import useAnswerContext from "../context/answerContext";

interface Props {
  question: Question;
  position: number;
  correctAnswers: Array<String>;
  onChangeAnswerHandler: (event: React.SyntheticEvent<Element, Event>) => void;
}

/* const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}; */

const Question = ({ question, position, onChangeAnswerHandler }: Props) => {
  const answers = shuffle([
    ...question.incorrectAnswers,
    question.correctAnswer,
  ]);
  return (
    <div>
      <span>{position}. </span>
      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">
          {question?.question}
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-error-radios"
          defaultValue=""
          name="quiz"
        >
          {answers?.map((answer: String, index: number) => (
            <FormControlLabel
              key={index}
              value={answer}
              control={<Radio />}
              label={answer}
              onChange={onChangeAnswerHandler} //use onChange function from parent
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
};
export default Question;
