"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
const OthersProfile = () => {
  const { id } = useParams();
  const [myposts, setMyPosts] = useState([]);
  const [name, setUsername] = useState("");
  useEffect(() => {
    const fetchUserData = async () => {
      const res = await fetch(`/api/users/${id}/prompt`);
      const data = await res.json();
      setMyPosts(data);
      if (data.length > 0) {
        setUsername(data[0].creator.username);
      }
    };
    if (id) fetchUserData();
  }, [id]);

  return (
    <div className="max-w-screen-xl mx-auto px-20">
      <h1 className="pt-10 text-2xl">
        <span className="text-3xl font-semibold text-orange-400 pr-4">
          {name}'s
        </span>
        Profile
      </h1>
      <p className="pb-5">Welcome to your personalized profile</p>
      {myposts.map((post) => (
        <>
          <section className="pb-4">
            <div className="p-4 rounded flex-1 relative shadow-md mt-5">
              <div className="flex">
                <span className="w-16 h-16 rounded-full">
                  <Image
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                    src={post.creator.image}
                    alt="creators_image"
                  ></Image>
                </span>
                <div>
                  <h1 id="username">{post.creator.username}</h1>
                  <h1 className="opacity-70 text-xs">{post.creator.email}</h1>
                </div>
              </div>
              <p>{post.prompt}</p>
              <h2 className="text-orange-400 pt-4 pb-2">#{post.tag}</h2>
            </div>
          </section>
        </>
      ))}
    </div>
  );
};

export default OthersProfile;
