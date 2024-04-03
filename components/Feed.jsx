"use client";
import { useState, useEffect } from "react";
import PromptCard from "@components/Prompt";
const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <>
      <div className="mt-16 flex flex-wrap gap-10">
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
  const handleSearch = (e) => {
    e.preventDefault();
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
          className="fourth-bg py-1.5 mt-5 w-[20rem] pl-2 rounded shadow secondary-text"
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search for a prompt or a username"
        />
      </form>
      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
