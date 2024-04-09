"use client";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useSpeechSynthesis } from "react-speech-kit";
import { useState } from "react";
const Prompt = ({ data, handleTagClick }) => {
  const [copy, setCopy] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [showTick, setShowTick] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(true);
  const router = useRouter();
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
  const { speak, cancel } = useSpeechSynthesis();
  const handleSound = async (prompt) => {
    setIsSpeaking(false);
    speak({ text: prompt });
  };

  const cancelSound = () => {
    cancel();
    setIsSpeaking(true);
  };
  const visitProfile = (_id) => {
    router.push(`/profile/${_id}`);
  };
  return (
    <div className="secondary-bg p-4 rounded max-w-[20rem] relative prompt-div">
      {isCopied && (
        <div className="secondary-bg absolute -top-9 p-2 right-0 text-xs">
          Copied
        </div>
      )}
      <div className="flex justify-between">
        <div
          className="flex -space-x-4 cursor-pointer"
          onClick={() => visitProfile(data.creator._id)}
        >
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
        <span className="flex gap-1">
          <span className="primary-bg p-1 h-7 gap-2 rounded ml-auto cursor-pointer">
            {isSpeaking ? (
              <svg
                onClick={() => handleSound(data.prompt)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                />
              </svg>
            ) : (
              <svg
                onClick={cancelSound}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 0 1 9 14.437V9.564Z"
                />
              </svg>
            )}
          </span>
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
                class="w-4 h-4"
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
                class="w-4 h-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            )}
          </span>
        </span>
      </div>
      <p contentEditable="true">{data.prompt}</p>
      <h2
        className="text-orange-400 pt-4 pb-2 cursor-pointer hover:underline underline-offset-4"
        onClick={() => handleTagClick(data.tag)}
      >
        #{data.tag}
      </h2>
    </div>
  );
};

export default Prompt;
