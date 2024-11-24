"use client";
import { trash, edit as editIcon } from "@/app/utils/icons";
import styled from "styled-components";
import { useGlobalState } from "@/app/context/GlobalProvider";
import formatDate from "@/app/utils/formatDate";
import React from "react";

interface Props {
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  isImportant: boolean;
  id: string;
}

function TaskItem({
  title,
  description,
  date,
  isCompleted,
  isImportant,
  id,
}: Props) {
  const { theme, deleteTask, updateTask, edit } = useGlobalState();

  return (
    <TaskItemStyled theme={theme}>
      <div className="task-header">
        <h1>{title}</h1>
        {!isCompleted && (
          <button
            onClick={() => {
              updateTask(id, { isCompleted: !isCompleted });
            }}
            className="incompleted"
          >
            Incompleted
          </button>
        )}
      </div>
      <p className="description">{description}</p>
      <p className="date">{formatDate(date)}</p>
      <div className="task-footer">
        {isCompleted && (
          <button
            onClick={() => {
              updateTask(id, { isCompleted: !isCompleted });
            }}
            className="completed"
          >
            Completed
          </button>
        )}
        <button
          onClick={() => {
            deleteTask(id);
          }}
          className="delete"
        >
          {trash}
        </button>
        <button
          onClick={() => {
            edit({ id, title, description, date, isCompleted, isImportant });
          }}
          className="edit"
        >
          {editIcon}
        </button>
      </div>
    </TaskItemStyled>
  );
}

const TaskItemStyled = styled.div`
  padding: 1rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.colorBg3};
  color: ${(props) => props.theme.colorText};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid ${(props) => props.theme.colorBorder};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;

  &:hover {
    transform: translateY(-5px);

    .description {
      display: block;
    }
  }

  .task-header {
    display: flex;
    color: #fff;
    justify-content: space-between;
    align-items: center;

    .incompleted {
      background-color: ${(props) => props.theme.colorIncomplete};
      color: #fff;
      padding: 0.3rem 0.6rem;
      border-radius: 0.5rem;
      font-size: 0.8rem;
      font-weight: 600;
      transition: background-color 0.3s ease, color 0.3s ease;

      &:hover {
        background-color: ${(props) => props.theme.colorIncompleteDark};
      }
    }
  }

  > h1 {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .description {
    display: none;
    font-size: 1rem;
    color: ${(props) => props.theme.colorGrey2};
  }

  .date {
    font-size: 0.8rem;
    color: ${(props) => props.theme.colorGrey3};
  }

  .task-footer {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: auto;

    button {
      border: none;
      outline: none;
      cursor: pointer;
      background: none;
      padding: 0.3rem 0.6rem;
      border-radius: 0.5rem;
      transition: background-color 0.3s ease, color 0.3s ease;

      i {
        font-size: 1.2rem;
        color: ${(props) => props.theme.colorGrey2};
      }

      &:hover {
        background-color: ${(props) => props.theme.colorBg2};
        color: ${(props) => props.theme.colorPrimary};

        i {
          color: ${(props) => props.theme.colorPrimary};
        }
      }
    }

    .delete {
      margin-left: auto;

      &:hover {
        background-color: ${(props) => props.theme.colorIncomplete};
        color: #fff;

        i {
          color: #fff;
        }
      }
    }

    .edit {
      &:hover {
        background-color: ${(props) => props.theme.colorPrimary};
        color: #fff;

        i {
          color: #fff;
        }
      }
    }

    .completed {
      background-color: ${(props) => props.theme.colorComplete};
      color: #fff;
      padding: 0.3rem 0.6rem;
      border-radius: 0.5rem;
      font-size: 0.8rem;
      font-weight: 600;
      transition: background-color 0.3s ease, color 0.3s ease;

      &:hover {
        background-color: ${(props) => props.theme.colorCompleteDark};
      }
    }
  }
`;

export default TaskItem;
