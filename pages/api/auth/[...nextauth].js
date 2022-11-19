import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnection from "../../../database/conn";
import Users from "../../../schema/Users";
import md5 from "md5";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "authenticate",
      async authorize(credentials) {
        dbConnection().catch(
          (err) => "There was a problem connecting to the database"
        );
        const result = await Users.findOne({ email: credentials.email });
        if (!result) {
          throw new Error("Couldn't find user");
        }
        const checkPassword = result.password.localeCompare(
          md5(credentials.password)
        );

        if (checkPassword !== 0 || result.email !== credentials.email) {
          throw new Error("Authentication failed. Pls try again");
        }
        return result;
      },
    }),
  ],
});
