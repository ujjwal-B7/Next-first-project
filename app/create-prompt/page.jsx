"use client";
import React from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Form from "@components/Form";
const CreatePrompt = () => {
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const createPromptHanlder = async (e) => {
    e.preventDefault();
  };
  return <Form post={post} createPromptHanlder={createPromptHanlder} />;
};

export default CreatePrompt;
