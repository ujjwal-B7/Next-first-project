import Link from "next/link";
const Form = ({ post, handler, setPost, type }) => {
  return (
    <>
      <section className="flex justify-center items-center h-screen w-full ">
        <form onSubmit={handler} className=" flex flex-col space-y-4 w-[20rem]">
          <h1 className="text-2xl text-orange-400">{type} Prompt</h1>
          <label htmlFor="prompt" className="text-lg">
            Prompt
          </label>
          <textarea
            className="secondary-text text-sm h-60 p-2 rounded fourth-bg"
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your prompt here..."
            required
          ></textarea>
          <label htmlFor="tag">Tag (#webdevelopment,#ideas,#product)</label>
          <input
            className="secondary-text p-1 rounded fourth-bg"
            type="text"
            required
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tag"
          />
          <div className="space-x-2">
            <span>
              <Link className="px-12  fourth-text py-1.5 rounded" href="/">
                Cancel
              </Link>
            </span>
            <input
              type="submit"
              value="Create"
              className="px-12 bg-orange-600 fourth-text py-1 rounded"
            />
          </div>
        </form>
      </section>
    </>
  );
};

export default Form;
