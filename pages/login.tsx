import { Box, Tab } from "@mui/material";
import type { NextPage } from "next";
import TabPanel from "@mui/lab/TabPanel";
import React from "react";
import Head from "next/head";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import LoginForm from "../components/LoginForm";

const Login: NextPage = () => {
  const [value, setValue] = React.useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div className="relative flex flex-col md:items-center md:justify-center w-screen h-screen md:bg-transparent">
      <Head>
        <title>Questionnare</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {" "}
        <h1 className="text-center font-semibold text-xl  md:text-2xl mt-24 mb-10">
          Questionnare App
        </h1>{" "}
        <Box sx={{ minHeight: "434px" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                centered
              >
                <Tab label="Sign In" value="1" />
                <Tab label="Sign Up" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <LoginForm signUp={false} />
            </TabPanel>
            <TabPanel value="2">
              <LoginForm signUp={true} />
            </TabPanel>
          </TabContext>
        </Box>
      </main>
    </div>
  );
};

export default Login;
