"use client";
import Feed from "@components/Feed";
import { motion, AnimatePresence } from "framer-motion";
const Home = () => {
  return (
    <>
      <section className="w-full min-h-screen flex flex-col justify-center items-center pt-20">
        <h1 className="text-6xl font-bold">Discover & Share</h1>
        <p className="text-2xl font-semibold text-orange-400">
          AI prompting tool
        </p>
        <p className="w-[60%] text-center pt-5">
          An open-source AI prompting tool for modern world to discover, create
          and share creative prompts
        </p>
        <AnimatePresence>
          <Feed />
        </AnimatePresence>
      </section>
    </>
  );
};

export default Home;
