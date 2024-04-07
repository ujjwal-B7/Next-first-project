import { connectDB } from "@utils/db";
import Prompt from "@models/Prompt";
export const GET = async (req, { params }) => {
  try {
    // best techstack for 2024
    await connectDB();
    // if i have passed direct id then it would search for the prompt id...but i want the creator id so i can get all the prompts a single user has created
    const allPrompts = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );
    // return res.status(201).json({ success: true, allPrompts });
    return new Response(JSON.stringify(allPrompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts", { status: 500 });
  }
};
