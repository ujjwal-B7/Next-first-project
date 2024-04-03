import { connectDB } from "@utils/db";
import Prompt from "@models/Prompt";
export const DELETE = async (req) => {
  const { _id } = await req.body;
  console.log("#############", _id);
  try {
    // best techstack for 2024
    await connectDB();
    const newPrompt = await Prompt.deleteOne({ _id });
    // return res.status(201).json({ success: true, newPrompt });
    return new Response(newPrompt, { status: 201 });
  } catch (error) {
    return new Response("Failed to delete a prompt", { status: 500 });
  }
};