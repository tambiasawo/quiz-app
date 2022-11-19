import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Question } from "../utils/typings";
import shuffle from "../utils/shuffle";

interface Props {
  question: Question;
  position: number;
  correctAnswers: Array<String>;
  onChangeAnswerHandler: (event: React.SyntheticEvent<Element, Event>) => void;
}

function Question({ question, position, onChangeAnswerHandler }: Props) {
  const answers = shuffle([
    ...question.incorrectAnswers,
    question.correctAnswer,
  ]);
  /* const [userAnswers, setUserAnswers] = React.useState<any>([]);
  const onChangeHandler = (event: React.SyntheticEvent<Element, Event>) => {
    const clickedAnswer = (event.target as HTMLInputElement).value;
    const obj = { number: position, answer: clickedAnswer };
    const prevAnswers = [...userAnswers];
    prevAnswers.push(obj);
    console.log(obj);
    console.log({ prevAnswers });
    // setUserAnswers(prevAnswers);
  }; */
  return (
    <div className="">
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
              onChange={(_event) => onChangeAnswerHandler} //use onChange function from parent
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default Question;
