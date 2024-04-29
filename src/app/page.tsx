import { pgTable, text } from "drizzle-orm/pg-core";
import { db } from "../lib/drizzle";
import { users } from "@/lib/drizzle/schema";
import { signIn } from "@/lib/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUsers } from "@/db/actions/users";
import { SignIn } from "@/components/signin-button";

const Home = () => {
  return <SignIn />;
};

export default Home;
