import { connectDB } from "@utils/db";
import Prompt from "@models/Prompt";
export const GET = async (req) => {
  try {
    // best techstack for 2024
    await connectDB();
    const allPrompts = await Prompt.find().populate("creator");
    // return res.status(201).json({ success: true, allPrompts });
    return new Response(JSON.stringify(allPrompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts", { status: 500 });
  }
};
