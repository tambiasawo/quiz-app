import React from "react";
import { useQuery } from "react-query";
import Layout from "./Layout";
import SingleQuestion from "./Question";
import { Question } from "../utils/typings";
import { Pagination } from "@mui/material";
import useAnswerContext from "../context/answerContext";

function Quiz() {
  const MemoizedSingleQuestion = React.memo(SingleQuestion);
  const [page, setPage] = React.useState(1);
  const paginate = require("paginate-array");
  const [allAnswers, setAllAnswers] = React.useState([]);
  const { theme, changeTheme, userSelectedAnswers, updateUserSelectedAnswers } =
    useAnswerContext();

  const fetchQuestions = async () => {
    const request = await fetch(
      `https://the-trivia-api.com/api/questions?limit=${20}`
    );
    const response = await request.json();
    return response;
  };

  const pageChangeHandler = (e: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  const handleSelectedAnswer = (
    event: React.SyntheticEvent<Element, Event>
  ) => {
    console.log("word");
    const clickedAnswer = (event.target as HTMLInputElement).value;
    updateUserSelectedAnswers(clickedAnswer);
  };

  console.log({ theme });
  console.log({ userSelectedAnswers });

  const {
    data: questions,
    isLoading,
    error,
  } = useQuery(["questions"], fetchQuestions);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }
  const paginateCollection = paginate(questions, page, 5);

  const getAllCorrectAnswers = questions?.map(
    (ques: Question) => ques.correctAnswer
  );
  console.log({ getAllCorrectAnswers });
  return (
    <Layout>
      <div className={`w-full ${theme ? "bg-red-500" : ""}`}>
        <button onClick={changeTheme}>Change theme</button>
        <div className=" ml-14 mt-14 flex flex-col space-y-10">
          <div className="flex flex-col space-y-5">
            {paginateCollection.data?.map(
              (question: Question, index: number) => {
                let position = index + 1;
                switch (paginateCollection.currentPage) {
                  case 1:
                    position *= 1;
                    break;
                  case 2:
                    position += 5;
                    break;
                  case 3:
                    position += 10;
                    break;
                  case 4:
                    position += 15;
                    break;
                  case 5:
                    position += 20;
                    break;
                }
                return (
                  <MemoizedSingleQuestion
                    key={question.id}
                    question={question}
                    position={position}
                    correctAnswers={getAllCorrectAnswers}
                    onChangeAnswerHandler={handleSelectedAnswer}
                  />
                );
              }
            )}
          </div>
        </div>
        <div className=" w-1/4 mx-auto">
          <Pagination
            sx={{ backgroundColor: "" }}
            count={paginateCollection.totalPages}
            page={paginateCollection.currentPage}
            color="primary"
            onChange={pageChangeHandler}
          />
        </div>
      </div>
    </Layout>
  );
}

export default Quiz;

export const getServerSideProps = async () => {};
