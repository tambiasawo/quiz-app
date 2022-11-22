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

const Question = ({ question, position, onChangeAnswerHandler }: Props) => {
  const [answers, setAnswers] = React.useState<any>([]);
  const { theme } = useAnswerContext();
  React.useEffect(() => {
    setAnswers(shuffle([...question.incorrectAnswers, question.correctAnswer]));
  }, []);

  return (
    <div>
      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">
          <h4 className={` ${theme ? "bg-[#121212] !text-white" : ""}`}>
            {" "}
            <span>{position}. </span> {question?.question}{" "}
          </h4>
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
