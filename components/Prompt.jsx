"use client";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
const Prompt = ({ data, handleTagClick, handleEdit, handleDelete }) => {
  const [copy, setCopy] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [showTick, setShowTick] = useState(true);
  const copyPrompt = async (prompt) => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopy(prompt);
      setShowTick(false);
      setIsCopied(true);
      setInterval(() => {
        setIsCopied(false);
        setShowTick(true);
      }, 2000);
      console.log("Prompt copied to clipboard:", prompt);
    } catch (error) {
      console.error("Failed to copy prompt:", error);
    }
  };
  return (
    <div className="secondary-bg p-4 rounded max-w-[20rem] relative prompt-div">
      {isCopied && (
        <div className="secondary-bg absolute -top-9 p-2 right-0 text-xs">
          prompt copied
        </div>
      )}
      <div className=" flex">
        <div className="flex">
          <span className="w-16 h-16 rounded-full">
            <Image
              width={40}
              height={40}
              className="rounded-full object-cover"
              src={data.creator.image}
              alt="creators_image"
            ></Image>
          </span>
          <div>
            <h1>{data.creator.username}</h1>
            <h1 className="opacity-70 text-xs">{data.creator.email}</h1>
          </div>
        </div>
        <span
          className="primary-bg p-1 h-7 gap-2 rounded ml-auto cursor-pointer"
          onClick={() => copyPrompt(data.prompt)}
        >
          {showTick ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
          )}
        </span>
      </div>
      <p>{data.prompt}</p>
      <h2 className="text-orange-400 pt-4 pb-2">#{data.tag}</h2>
    </div>
  );
};

export default Prompt;
