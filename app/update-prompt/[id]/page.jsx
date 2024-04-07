"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Form from "@components/Form";
import { useRouter, useSearchParams } from "next/navigation";
import { useParams } from "next/navigation";
const EditPrompt = () => {
  const router = useRouter();
  const params = useParams();
  const promptId = params.id;
  //if we get id from the url when route.push(url)..this method
  // const searchParams = useSearchParams();
  // const promptId = searchParams.get("_id");
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const getPromptDetails = async () => {
      const prompt = await fetch(`/api/prompt/${promptId}`);
      const data = await prompt.json();
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };
    if (promptId) getPromptDetails();
  }, [promptId]);

  const editPromptHanlder = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      handler={editPromptHanlder}
    />
  );
};

export default EditPrompt;
