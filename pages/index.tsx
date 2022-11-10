import { Box, Tab } from "@mui/material";
import type { NextPage } from "next";
import TabPanel from "@mui/lab/TabPanel";
import React from "react";
import Head from "next/head";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import LoginForm from "../components/LoginForm";

const Home: NextPage = () => {
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
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <h1 className="text-center font-semibold text-lg">
            Questionnare App
          </h1>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                centered
                //data-test="tabs"
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
              {/*<form className="relative mt-24 py-10 px-6 space-y-8 md:mt-0 md:max-w-md md:px-14 ">
                <h3>Please Sign in</h3>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                />
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />

                <input type="submit" className="py-3 rounded" />
</form>*/}
            </TabPanel>
          </TabContext>
        </Box>
      </main>
    </div>
  );
};

export default Home;
