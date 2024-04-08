"use client";
import { useState, useEffect } from "react";
import PromptCard from "@components/Prompt";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <>
      <div className="mt-16 flex mx-4 flex-wrap gap-10">
        {data.map((data) => (
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
    console.log(filteredResults);
    if (filteredResults.length > 0) setSearchResult(filteredResults);

    // };
  }, [search]);

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
    <section className="flex justify-center flex-col items-center">
      <form>
        <input
          id="search"
          name="search"
          className="fourth-bg py-1.5 mt-5 w-[30rem] pl-2 rounded shadow secondary-text"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for a prompt or a username"
        />
      </form>
      <div className="lg:px-52 px-10 pb-10">
        <PromptCardList
          data={searchResult.length ? searchResult : posts}
          handleTagClick={handleTagClick}
        />
      </div>
    </section>
  );
};

export default Feed;
