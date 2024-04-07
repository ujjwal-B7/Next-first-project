"use client";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const Profile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [myposts, setMyPosts] = useState([]);
  useEffect(() => {
    const fetchUserData = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/prompt`);
      const data = await res.json();
      setMyPosts(data);
    };
    if (session?.user.id) fetchUserData();
  }, [session?.user.id]);

  const handleEdit = (_id) => {
    router.push(`/update-prompt?id=${_id}`);
  };
  const handleDelete = async (_id) => {
    console.log("idddddddddddddddddddddd", _id);
    try {
      const response = await fetch(`/api/prompt/${_id}`, {
        method: "DELETE",
      });
      fetchUserData();
      console.log("idddddddddddddddddddddd", _id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {myposts.map((post) => (
        <>
          <section className="max-w-screen-xl mx-auto px-20">
            <div className="p-4 rounded flex-1 relative shadow-md mt-5">
              <div className=" flex">
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
                    <h1>{post.creator.username}</h1>
                    <h1 className="opacity-70 text-xs">{post.creator.email}</h1>
                  </div>
                </div>
              </div>
              <p>{post.prompt}</p>
              <h2 className="text-orange-400 pt-4 pb-2">{post.tag}</h2>
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
            </div>
          </section>
        </>
      ))}
    </div>
  );
};

export default Profile;
