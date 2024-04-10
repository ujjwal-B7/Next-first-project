"use client";
import Feed from "@components/Feed";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
const Home = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <section
        className="w-full pt-40 flex flex-col justify-center items-center"
        data-aos="fade-up"
      >
        <h1 className="lg:text-6xl text-5xl font-bold text-center">
          Discover & Share
        </h1>
        <p className="text-2xl font-semibold text-orange-400 text-center">
          AI prompting tool
        </p>
        <p className="w-[60%]  pt-5 text-center">
          An open-source AI prompting tool for modern world to discover, create
          and share creative prompts
        </p>
      </section>
      <Feed />
    </>
  );
};

export default Home;
