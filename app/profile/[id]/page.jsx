"use client";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
const OthersProfile = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  const { id } = useParams();
  const { data: session } = useSession();
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

  const handleDelete = async (id) => {
    window.confirm("Are you sure, you want to delete?");
    try {
      await fetch(`/api/prompt/${id}`, {
        method: "DELETE",
      });
      const filteredPosts = myposts.filter((post) => post._id !== id);
      setMyPosts(filteredPosts);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-screen-xl mx-auto lg:px-20 px-4">
      <h1 className="pt-10 text-2xl">
        <span className="text-3xl font-semibold text-orange-400 pr-4">
          {name}&apos;s
        </span>
        Profile
      </h1>
      <p className="pb-5">Welcome to your personalized profile</p>
      {myposts.map((post) => (
        <>
          <section className="pb-4" data-aos="fade-up">
            <div className="p-4 rounded flex-1 relative shadow-custom mt-5">
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
              {session?.user.id === id && (
                <div className="space-x-5 mt-4">
                  <Link
                    className="text-green-500 underline underline-offset-4"
                    href={`/update-prompt/${post._id}`}
                  >
                    Edit
                  </Link>
                  {/* <button
                  className="text-green-500 underline underline-offset-4"
                  onClick={() => handleEdit(post._id)}
                >
                  Edit
                </button> */}
                  <button
                    className="text-red-600 underline underline-offset-4"
                    onClick={() => handleDelete(post._id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </section>
        </>
      ))}
    </div>
  );
};

export default OthersProfile;
