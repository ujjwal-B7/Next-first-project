"use client";
import React from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Form from "@components/Form";
const CreatePrompt = () => {
  const [Post, setPost] = useState({
    title: "",
    tag: "",
  });

  const createPromptHanlder = async (e) => {
    e.preventDefault();
    
  };
  return <Form Post={Post} createPromptHanlder={createPromptHanlder} />;
};

export default CreatePrompt;
