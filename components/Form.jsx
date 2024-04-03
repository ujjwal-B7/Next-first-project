import { create } from "domain";

const Form = ({ post, createPromptHandler }) => {
  return (
    <>
      <section className="flex justify-center items-center h-screen w-full ">
        <form
          onSubmit={createPromptHandler}
          className=" flex flex-col space-y-4 w-[20rem]"
        >
          <label htmlFor="prompt" className="text-lg">
            Prompt
          </label>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your prompt here..."
            required
            cols="30"
            rows="10"
          ></textarea>
          <label htmlFor="tag" className="text-lg">
            Tag
          </label>
          <input
            type="text"
            required
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tag"
          />
          
          <input type="submit" className="fourth-bg secondary-text" />
        </form>
      </section>
    </>
  );
};

export default Form;
