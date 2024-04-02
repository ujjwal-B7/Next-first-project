import Feed from "@components/Feed";
const Home = () => {
  return (
    <section className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="text-6xl font-bold">Discover & Share</h1>
      <p className="text-2xl font-semibold text-orange-400">
        AI prompting tool
      </p>
      <p className="w-[60%] text-center pt-5">
        An open-source AI prompting tool for modern world to discover, create
        and share creative prompts
      </p>
      <Feed />
    </section>
  );
};

export default Home;
