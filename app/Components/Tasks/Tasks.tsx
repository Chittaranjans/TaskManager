"use client";
import { useGlobalState } from "@/app/context/GlobalProvider";
import React from "react";
import styled from "styled-components";
import TaskItem from "@/app/Components/TaskItem/TaskItem";
import { plus } from "@/app/utils/icons";
import Modal from "../Modals/Modal";
import CreateContent from "../Modals/CreateContent";

interface Props {
  title: string;
  tasks: any[];
}

function Tasks({ title, tasks }: Props) {
  const { theme, openModal, modal } = useGlobalState();

  return (
    <TaskStyled theme={theme}>
      {modal && <Modal content={<CreateContent />} />}
      <h1>{title}</h1>
      <div className="tasks">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            title={task.title}
            description={task.description}
            date={task.date}
            isCompleted={task.isCompleted}
            isImportant={task.isImportant}
            id={task.id}
          />
        ))}
        <button onClick={openModal} className="create-task">
          {plus}
          Create New Task
        </button>
      </div>
    </TaskStyled>
  );
}

const TaskStyled = styled.main`
  padding: 2rem;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;

  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  .tasks {
    // display: flex;
    // flex-wrap: wrap;
    // gap: 1rem;;
    margin: 1.5rem 0;
  }

  > h1 {
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 800;
    position: relative;
    color: ${(props) => props.theme.colorGrey0};

    &::after {
      content: "";
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 3rem;
      height: 0.2rem;
      background-color: ${(props) => props.theme.colorGrey1};
      border-radius: 0.5rem;
    }
  }

  .create-task {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin: 1.5rem 0;

    width: 100%;
    max-width: 100%;
    height: 16rem;
    color: ${(props) => props.theme.colorGrey2};
    font-weight: 600;
    cursor: pointer;
    border-radius: 1rem;
    border: 3px dashed ${(props) => props.theme.colorGrey5};
    transition: all 0.3s ease;

    &:hover {
      background-color: ${(props) => props.theme.colorGrey5};
      color: ${(props) => props.theme.colorGrey0};
    }
  }
`;

export default Tasks;
