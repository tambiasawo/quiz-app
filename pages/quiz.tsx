import React from "react";
import Quiz from "../components/Quiz";

interface Props {
  fetchedCategories: Array<string>;
}

function quiz({ fetchedCategories }: Props) {
  return (
    <div className="">
      <Quiz fetchedCategories={fetchedCategories} />
    </div>
  );
}

export default quiz;

export async function getStaticProps() {
  //console.log({ context });
  const response = await fetch("https://the-trivia-api.com/api/categories");
  const allCategories = await response.json();
  const fetchedCategories = [];

  for (const cat in allCategories) {
    if (allCategories[cat].length === 1) {
      fetchedCategories.push(allCategories[cat]);
    } else {
      const tag = cat.replaceAll(" & ", "_and_").toLowerCase();
      fetchedCategories.push(tag);
    }
  }

  return {
    props: { fetchedCategories }, // will be passed to the page component as props
  };
}
