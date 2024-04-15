import Link from "next/link";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Hover from "./Hover";
import { useState, useEffect } from "react";

const Form = ({ post, handler, setPost, type, submitting, setSubmitting }) => {
  const { transcript, resetTranscript, listening } = useSpeechRecognition();
  const [recording, setRecording] = useState(true);

  useEffect(() => {
    if (type === "Edit") {
      setPost((prevPost) => ({
        ...prevPost,
        prompt: prevPost.prompt + transcript,
      }));
    } else {
      setPost({ prompt: transcript });
    }
  }, [transcript, type, setPost]);

  const handleListen = () => {
    setRecording(false);
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleStopListen = () => {
    setRecording(true);
    SpeechRecognition.stopListening({ continuous: true });
  };

  return (
    <>
      <section className="flex justify-center items-center lg:h-[90vh] w-full lg:py-0 py-10 px-4">
        <form
          onSubmit={handler}
          className=" flex flex-col space-y-4 lg:w-[40%] sm:w-[70%]"
        >
          <div className="mb-5">
            <h1 className="font-semibold text-3xl text-orange-400 pb-2">
              {type} Prompt
            </h1>
            <p className="opacity-70">
              {type} and share amazing prompts with the world and let your
              imagination run wild with any AI-powered platform
            </p>
          </div>
          <div className="flex justify-between">
            <label htmlFor="prompt" className="text-lg">
              Prompt
            </label>
            <Hover
              bg={`secondary-bg`}
              width={"[10rem]"}
              color={`secondary-bg`}
              message={listening ? "Stop Recording" : "Record Prompt"}
            >
              <span>
                {recording ? (
                  <span onClick={handleListen}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
                      />
                    </svg>
                  </span>
                ) : (
                  <span onClick={handleStopListen}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ionicon w-4 h-4"
                      viewBox="0 0 512 512"
                      fill="#eeeeee"
                      stroke="#eeeeee"
                    >
                      <path
                        fill="none"
                        stroke-linecap="round"
                        stroke-miterlimit="10"
                        stroke-width="32"
                        d="M432 400L96 64"
                      />
                      <path d="M400 240v-31.55c0-8.61-6.62-16-15.23-16.43A16 16 0 00368 208v32a111.58 111.58 0 01-2.45 23.31 4.05 4.05 0 001.07 3.69l21.82 21.81a2 2 0 003.29-.72A143.27 143.27 0 00400 240zM256 352a112.36 112.36 0 01-112-112v-31.55c0-8.61-6.62-16-15.23-16.43A16 16 0 00112 208v32c0 74 56.1 135.12 128 143.11V432h-47.55c-8.61 0-16 6.62-16.43 15.23A16 16 0 00192 464h127.55c8.61 0 16-6.62 16.43-15.23A16 16 0 00320 432h-48v-48.89a143.08 143.08 0 0052-16.22 4 4 0 00.91-6.35L307 342.63a4 4 0 00-4.51-.78A110.78 110.78 0 01256 352zM256 80a47.18 47.18 0 0148 48v74.72a4 4 0 001.17 2.82L332.59 233a2 2 0 003.41-1.42V128.91C336 85 301 48.6 257.14 48a79.66 79.66 0 00-68.47 36.57 4 4 0 00.54 5l19.54 19.54a2 2 0 003.25-.63A47.44 47.44 0 01256 80z" />
                      <path d="M207.27 242.9L179.41 215a2 2 0 00-3.41 1.42V239a80.89 80.89 0 0023.45 56.9 78.55 78.55 0 0077.8 21.19 2 2 0 00.86-3.35l-24.91-24.91a4.08 4.08 0 00-2.42-1.15c-21.65-2.52-39.48-20.44-42.37-42.43a4 4 0 00-1.14-2.35z" />
                    </svg>
                  </span>
                )}
              </span>
            </Hover>
          </div>
          <textarea
            className="secondary-bg text-sm h-60 p-2 rounded"
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your prompt here..."
            required
          />
          <label htmlFor="tag">Tag (#webdevelopment,#ideas,#product)</label>
          <input
            className="secondary-bg p-2 rounded"
            type="text"
            required
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tag"
          />
          <div className="space-x-2">
            <span>
              <Link
                className="secondary-bg px-12  fourth-text py-2 rounded"
                href="/"
              >
                Cancel
              </Link>
            </span>
            <input
              type="submit"
              value={submitting ? type + "..." : type}
              className="cursor-pointer px-12 bg-orange-600 fourth-text py-1 rounded"
            />
          </div>
        </form>
      </section>
    </>
  );
};

export default Form;
