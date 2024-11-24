"use client";
import Tasks from "./Components/Tasks/Tasks";
import { useGlobalState } from "./context/GlobalProvider";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import styled from "styled-components";
import Image from "next/image";

export default function Home() {
  const { tasks } = useGlobalState();

  return (
    <>
      <SignedIn>
        <Tasks title="All Tasks" tasks={tasks} />
      </SignedIn>
      <HomeStyled>
        <SignedOut>
          <div className="signed-out">
            <h1>Please sign in to view your tasks</h1>
            <div className="auth-buttons">
              <SignInButton />
              <p>If you don't have an account, create one here:</p>
              <SignUpButton />
            </div>
            <p className="quote">
              "The key to success is not in managing time, but in managing
              yourself."
            </p>
          </div>
        </SignedOut>
      </HomeStyled>
    </>
  );
}

const HomeStyled = styled.div`
  flex-direction: column;
  align-items: center;

  background-color: ${(props) => props.theme.colorBg};

  .signed-out {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.colorBg2};
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    text-align: center;
    margin-bottom: 2rem;

    h1 {
      font-size: 2rem;
      margin-bottom: 1rem;
      color: ${(props) => props.theme.colorText};
    }

    .auth-buttons {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;

      p {
        margin: 1rem 0 0;
        font-size: 1rem;
        color: ${(props) => props.theme.colorText};
      }

      button {
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        font-weight: 600;
        border-radius: 0.5rem;
        background-color: ${(props) => props.theme.colorPrimary};
        color: #fff;
        transition: background-color 0.3s ease, transform 0.3s ease;

        &:hover {
          background-color: ${(props) => props.theme.colorPrimary2};
          transform: translateY(-2px);
        }
      }
    }
  }

  .images {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 2rem;

    .decorative-image {
      width: 300px;
      height: auto;
      border-radius: 1rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  }

  .quote {
    font-size: 1.5rem;
    font-weight: 600;
    color: ${(props) => props.theme.colorText};
    text-align: center;
    margin-top: 2rem;
  }
`;
