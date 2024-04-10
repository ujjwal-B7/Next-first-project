import { connectDB } from "@utils/db";
import Prompt from "@models/Prompt";
export const GET = async (req, { params }) => {
  try {
    // best techstack for 2024
    await connectDB();

    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) {
      return new Response("No prompt match the id", { status: 404 });
    }

    // return res.status(201).json({ success: true, prompt });
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts", { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    // best techstack for 2024
    await connectDB();
    const singlePrompt = await Prompt.findByIdAndUpdate(params.id, {
      prompt,
      tag,
    }).populate("creator");
    if (!singlePrompt) {
      return new Response("No prompt match the id", { status: 404 });
    }
    // return res.status(201).json({ success: true, prompt });
    return new Response(JSON.stringify(singlePrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts", { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    // best techstack for 2024
    await connectDB();
    await Prompt.findByIdAndDelete(params.id);

    // return res.status(201).json({ success: true, newPrompt });
    return new Response("Prompt Deleted succesfully", { status: 201 });
  } catch (error) {
    return new Response("Failed to delete a prompt", { status: 500 });
  }
};
