import React from "react";
import { useQuery } from "react-query";
import Layout from "./Layout";
import SingleQuestion from "./Question";
import { Question } from "../utils/typings";
import {
  Box,
  Checkbox,
  Chip,
  CircularProgress,
  ListItemText,
  OutlinedInput,
  Pagination,
  Paper,
  Slider,
} from "@mui/material";
import useAnswerContext from "../context/answerContext";
import Link from "next/link";
import { useRouter } from "next/router";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useSession } from "next-auth/react";

interface Props {
  fetchedCategories: Array<string>;
}

function Quiz({ fetchedCategories }: Props) {
  const [page, setPage] = React.useState(1);
  const router = useRouter();
  const [categories, setCategories] = React.useState<string[]>([]);
  const [difficulty, setDifficultyChange] = React.useState<string>("easy");
  const [limit, setLimitChange] = React.useState<number>(5);
  const { data: session } = useSession();
  const paginate = require("paginate-array");
  const {
    theme,
    userSelectedAnswers,
    updateUserSelectedAnswers,
    updateUserScore,
    userScore,
  } = useAnswerContext();

  React.useEffect(() => {
    sendResult();
  }, [userScore]);

  const fetchQuestions = async () => {
    let categoriesPath = "";
    let url;
    if (categories.length > 0) {
      categoriesPath += categories.join(",");
      url = `https://the-trivia-api.com/api/questions?categories=${categoriesPath}&difficulty=${difficulty}&limit=${limit}`;
    } else {
      url = `https://the-trivia-api.com/api/questions?difficulty=${difficulty}&limit=${limit}`;
    }
    const request = await fetch(url);
    const response = await request.json();
    return response;
  };

  const handleCategoryChange = (
    event: SelectChangeEvent<typeof categories>
  ) => {
    const {
      target: { value },
    } = event;
    setCategories(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleDifficultyChange = (event: SelectChangeEvent) => {
    setDifficultyChange(event.target.value);
  };

  const handleLimitChange = (event: any) => {
    setLimitChange(event?.target.value);
  };
  const pageChangeHandler = (e: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  const handleSelectedAnswer = (
    event: React.SyntheticEvent<Element, Event>
  ) => {
    const clickedAnswer = (event.target as HTMLInputElement).value;
    updateUserSelectedAnswers(clickedAnswer);
  };

  const onSubmitHandler = async (e: any) => {
    e.preventDefault();
    const submittedAnswers: string[] = Array.from(userSelectedAnswers);

    const matchedAnswers = getAllCorrectAnswers.map((answer: string) => {
      if (submittedAnswers.includes(answer)) return true;
      else return false;
    });
    const filtered = matchedAnswers.filter(
      (answer: boolean) => answer === true
    );
    updateUserScore(Math.round((filtered.length / limit) * 100));
  };

  const sendResult = async () => {
    if (session && userScore !== null) {
      const options = {
        score: userScore,
        date: new Date(),
        email: session?.user?.email,
      };
      const response = await fetch("http://localhost:3000/api/scores/score", {
        method: "POST",
        headers: { contentType: "application/json" },
        body: JSON.stringify(options),
      }).then((res) =>
        res.json().then((data) => {
          if (data) return data;
        })
      );
      console.log({ response });
    }
  };
  const refreshPage = () => {
    router.reload();
  };
  const {
    data: questions,
    isLoading,
    error,
    refetch,
  } = useQuery(["questions"], fetchQuestions, { enabled: false });

  const getPaginateCollection = React.useCallback(
    () => paginate(questions, page, 5),
    [questions?.length, page]
  );
  if (isLoading) {
    return (
      <div className="absolute w-[60%] mx-auto mt-[15%] left-[50%]">
        <CircularProgress />
      </div>
    );
  }
  if (error) {
    return <div>Error</div>;
  }
  const getAllCorrectAnswers = questions?.map(
    (ques: Question) => ques.correctAnswer
  );

  const paginateCollection = questions && getPaginateCollection();
  return (
    <Layout>
      {userScore !== null ? (
        <Paper
          elevation={2}
          className=" mx-auto md:w-[60%] mt-14 sm:mt-9 md:mt-10"
        >
          <div className="p-5 space-y-3">
            <h3
              className={`text-2xl font-semibold p-4 ${
                limit - userScore > 5 ? "text-red-500" : "text-green-500"
              }`}
            >
              You scored {userScore}%.{" "}
              {limit - userScore <= 5 ? "Passed! 😁" : "Failed 🙁! "}
            </h3>{" "}
            <button className="rounded-full bg-[#ffc100] px-4 py-2">
              {limit - userScore > 5 ? (
                <Link href="/quiz" onClick={refreshPage}>
                  Try Again
                </Link>
              ) : (
                <Link href="/results">See All Results</Link>
              )}
            </button>
          </div>
        </Paper>
      ) : (
        <div className={`w-full ${theme ? "bg-[#121212] !text-white" : ""}`}>
          <div className="ml-14 md:mt-14 mt-24">
            {!paginateCollection?.data ? (
              <div className=" flex md:items-start w-[90%] items-center sm:items-center flex-col space-y-3 align-top space-x-5">
                <h2 className="">
                  Select Filters below. Leave blank to randomize
                </h2>{" "}
                <FormControl
                  sx={{ m: 1, minWidth: 200 }}
                  size="small"
                  className="!ml-5"
                >
                  <InputLabel id="demo-multiple-checkbox-label">
                    Categories
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={categories}
                    onChange={handleCategoryChange}
                    input={<OutlinedInput label="Categories" />}
                    renderValue={(selected) => (
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 0.5,
                          ml: 1,
                          maxHeight: 100,
                          overflowY: "scroll",
                        }}
                      >
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                  >
                    {fetchedCategories.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={categories.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
                  <InputLabel id="demo-select-small">Difficulty</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={difficulty}
                    label="Difficulty"
                    onChange={handleDifficultyChange}
                  >
                    <MenuItem value={"easy"}>Easy</MenuItem>
                    <MenuItem value={"medium"}>Medium</MenuItem>
                    <MenuItem value={"hard"}>Hard</MenuItem>
                  </Select>
                </FormControl>
                <div>
                  <h3>Number of questions</h3>
                  <Slider
                    aria-label="Number of Questions"
                    defaultValue={10}
                    value={limit}
                    valueLabelDisplay="auto"
                    onChange={handleLimitChange}
                    //step={5}
                    //marks
                    min={1}
                    max={20}
                  />
                </div>
                <button
                  className="rounded-full bg-[#ffc100] px-5 py-2"
                  onClick={refetch}
                >
                  Begin
                </button>
              </div>
            ) : (
              <>
                <div
                  className={`flex flex-col space-y-5 ${
                    theme ? "!text-white" : ""
                  }`}
                >
                  {paginateCollection?.data?.map(
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
                        <SingleQuestion
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
                <div
                  className={`flex justify-start mt-7   ${
                    page === paginateCollection?.totalPages ? "block" : "hidden"
                  }`}
                >
                  <button
                    className="rounded-full bg-[#ffc100] px-6 py-2"
                    onClick={onSubmitHandler}
                  >
                    Submit
                  </button>
                </div>{" "}
              </>
            )}
          </div>
          {paginateCollection?.data?.length > 0 && (
            <div className=" w-1/4 mx-auto">
              <Pagination
                sx={{ backgroundColor: "" }}
                count={paginateCollection?.totalPages}
                page={paginateCollection?.currentPage}
                color="primary"
                onChange={pageChangeHandler}
              />
            </div>
          )}
        </div>
      )}
    </Layout>
  );
}

export default Quiz;
