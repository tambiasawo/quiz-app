import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { AnswerContextProvider } from "../context/answerContext";

function MyApp({ Component, pageProps }: AppProps) {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: false,
        staleTime: Infinity,
      },
    },
  });
  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={client}>
        <AnswerContextProvider>
          <Component {...pageProps} />;
        </AnswerContextProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
