"use client";
import Tasks from "./Components/Tasks/Tasks";
import { useGlobalState } from "./context/GlobalProvider";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export default function Home() {
  const { tasks } = useGlobalState();

  return (
    <>
      <SignedIn>
        <Tasks title="All Tasks" tasks={tasks} />
      </SignedIn>
      <SignedOut>
        <div>
          <h1>Please sign in to view your tasks</h1>
          <SignInButton />
        </div>
      </SignedOut>
    </>
  );
}
