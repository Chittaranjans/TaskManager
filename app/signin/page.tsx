"use client";
import { SignIn } from "@clerk/nextjs";
import React from "react";

function page() {
  return (
    <div className="flex justify-center items-center h-full">
      <SignIn routing="hash" />
    </div>
  );
}

export default page;
