import Link from "next/link";
const Form = ({ post, handler, setPost, type, submitting, setSubmitting }) => {
  return (
    <>
      <section className="flex justify-center items-center h-screen w-full ">
        <form onSubmit={handler} className=" flex flex-col space-y-4 w-[40%]">
          <div className="mb-5">
            <h1 className="font-semibold text-3xl text-orange-400 pb-2">
              {type} Prompt
            </h1>
            <p className="opacity-70">
              {type} and share amazing prompts with the world and let your
              imagination run wild with any AI-powered platform
            </p>
          </div>
          <label htmlFor="prompt" className="text-lg">
            Prompt
          </label>
          <textarea
            className="secondary-bg text-sm h-60 p-2 rounded"
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your prompt here..."
            required
          ></textarea>
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
              className="px-12 bg-orange-600 fourth-text py-1 rounded"
            />
          </div>
        </form>
      </section>
    </>
  );
};

export default Form;
