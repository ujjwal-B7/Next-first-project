"use client";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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
    const hasConfirmed = confirm(
      "Are you sure, you want to delete the prompt?"
    );
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${_id}`, {
          method: "DELETE",
        });
        const filteredPosts = myposts.filter((p) => p._id !== _id);
        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto lg:px-20 px-4">
      <h1 className="pt-10 text-2xl">
        <span className="text-3xl font-semibold text-orange-400 pr-4">
          {session?.user.name}&apos;s
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
                  <h1>{post.creator.username}</h1>
                  <h1 className="opacity-70 text-xs">{post.creator.email}</h1>
                </div>
              </div>
              <p>{post.prompt}</p>
              <h2 className="text-orange-400 pt-4 pb-2">#{post.tag}</h2>
              {session?.user.id && (
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

export default Profile;
