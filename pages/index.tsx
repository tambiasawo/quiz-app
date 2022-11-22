import { Box, FormControlLabel, Paper, Tab } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import React from "react";
import Head from "next/head";
import { useSession, signOut, getSession } from "next-auth/react";
import MaterialUISwitch from "../utils/ThemeSwitch3";
import Link from "next/link";
import Layout from "../components/Layout";
import useAnswerContext from "../context/answerContext";

const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

const Home = (props: Props) => {
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [showQuiz, setShowQuiz] = React.useState(false);
  const { theme } = useAnswerContext();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleSignOut = async () => {
    signOut();
  };

  return (
    <Layout>
      <Box
        className={`${theme ? "bg-[#121212]" : ""}`}
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Paper elevation={2} className=" mx-auto md:w-3/4">
          <h1 className="text-2xl font-semibold p-4">Your Profile</h1>
          <div className="p-5 space-y-3">
            <p>
              Hi Katie, You have completed 5 assessments. Keep making attempts
              with us
            </p>{" "}
            <button className="rounded-full bg-[#ffc100] px-4 py-2">
              <Link href="/quiz">Take Quiz</Link>
            </button>
          </div>
        </Paper>
      </Box>
    </Layout>
  );
};

function Guest() {
  return <div>guest</div>;
}

export default Home;

export const getServerSideProps = async ({ req }: any) => {
  const session = await getSession({ req });
  console.log({ session });
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
