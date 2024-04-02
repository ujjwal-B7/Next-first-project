import { create } from "domain";

const Form = ({ Post, createPromptHandler }) => {
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
          <input
            type="text"
            value={Post.prompt}
            onChange={() => setPost.prompt(e.target.value)}
          />
          <label htmlFor="tag" className="text-lg">
            Tag
          </label>
          <input type="text" onChange={Post.tag} />
          <input type="submit" className="fourth-bg secondary-text" />
        </form>
      </section>
    </>
  );
};

export default Form;
