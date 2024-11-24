"use client";
import { SignIn } from "@clerk/nextjs";
import styled from "styled-components";

export default function Page() {
  return (
    <AuthPageStyled>
      <SignIn />
    </AuthPageStyled>
  );
}

const AuthPageStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${(props) => props.theme.colorBg};
  padding: 2rem;

  .cl-signIn,
  .cl-signUp {
    background-color: ${(props) => props.theme.colorBg2};
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    text-align: center;

    .cl-signIn-form,
    .cl-signUp-form {
      display: flex;
      flex-direction: column;
      align-items: center;

      .cl-signIn-header,
      .cl-signUp-header {
        font-size: 2rem;
        margin-bottom: 1rem;
        color: ${(props) => props.theme.colorText};
      }

      .cl-signIn-button,
      .cl-signUp-button {
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
`;
