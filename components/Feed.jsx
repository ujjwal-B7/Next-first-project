"use client";
import { useState, useEffect } from "react";
import PromptCard from "@components/Prompt";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <>
      <div className="max-w-screen-xl mx-auto lg:px-20 px-4 grid lg:grid-cols-3 sm:grid-cols-2 lg:gap-10 gap-5 lg:py-20 py-14">
        {data &&
          [...data]
            .reverse()
            .map((data) => (
              <PromptCard
                key={data._id}
                data={data}
                handleTagClick={handleTagClick}
              />
            ))}
      </div>
    </>
  );
};

const Feed = () => {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  useEffect(() => {
    // const handleSearch = (keyword) => {
    //   setSearch(keyword);
    const filteredResults = posts.filter(
      (item) =>
        item.tag.toLowerCase().includes(search.toLowerCase()) ||
        item.prompt.toLowerCase().includes(search.toLowerCase()) ||
        item.creator.username.toLowerCase().includes(search.toLowerCase())
    );
    if (filteredResults.length > 0) setSearchResult(filteredResults);

    // };
  }, [posts, search]);

  // handletagClick
  const handleTagClick = (tag) => {
    setSearch(tag);
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      setPosts(data);
    };
    fetchData();
  }, []); //renders when the page loads due to empty array dependency
  return (
    <section className="flex justify-center flex-col items-center pt-5">
      <form className="lg:w-[35%] w-[80%]">
        <input
          id="search"
          name="search"
          className="fourth-bg py-1.5 mt-5 w-full pl-2 rounded shadow secondary-text"
          data-aos="fade-up"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for a prompt or a username or a tag"
        />
      </form>
      <div>
        <PromptCardList
          data={searchResult.length ? searchResult : posts}
          handleTagClick={handleTagClick}
        />
      </div>
    </section>
  );
};

export default Feed;
