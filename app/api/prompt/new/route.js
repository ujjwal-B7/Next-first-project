import { connectDB } from "@utils/db";
import Prompt from "@models/Prompt";
export const POST = async (req) => {
  const { prompt, tag, userId } = await req.json();
  try {
    // best techstack for 2024
    await connectDB();
    const newPrompt = await Prompt.create({ creator: userId, prompt, tag });
    // return res.status(201).json({ success: true, newPrompt });
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
