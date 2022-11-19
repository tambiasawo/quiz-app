import { Box, Paper, Tab } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import React from "react";
import Head from "next/head";
import { useSession, signOut, getSession } from "next-auth/react";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import AssessmentIcon from "@mui/icons-material/Assessment";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
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
  const { theme, userSelectedAnswers, updateUserSelectedAnswers, changeTheme } =
    useAnswerContext();

  console.log("arr: ", userSelectedAnswers);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleSignOut = async () => {
    signOut();
  };

  return (
    <Layout>
      <Box
        className={`${theme ? "bg-red-500" : ""}`}
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <button onClick={changeTheme}>Change theme</button>
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
        {/* {showQuiz && (
          <Paper>
            <div>quizzes</div>
          </Paper>
        )} */}
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
