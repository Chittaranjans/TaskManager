"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { add } from "@/app/utils/icons";
import Button from "../Button/Button";
import styled from "styled-components";
import { useGlobalState } from "@/app/context/GlobalProvider";
import moment from "moment";

function CreateContent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [completed, setCompleted] = useState(false);
  const [important, setImportant] = useState(false);

  const { theme, allTasks, closeModal, editTask } = useGlobalState();

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDescription(editTask.description);
      setDate(moment(editTask.date).format("YYYY-MM-DD"));
      setCompleted(editTask.isCompleted);
      setImportant(editTask.isImportant);
    }
  }, [editTask]);

  const handleChange = (name: string) => (e: any) => {
    switch (name) {
      case "title":
        setTitle(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      case "date":
        setDate(e.target.value);
        break;
      case "completed":
        setCompleted(e.target.checked);
        break;
      case "important":
        setImportant(e.target.checked);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const task = {
      title,
      description,
      date,
      completed,
      important,
    };

    try {
      if (editTask && editTask.id) {
        await axios.put(`/api/tasks/${editTask.id}`, task);
        toast.success("Task updated successfully");
      } else {
        await axios.post("/api/tasks", task);
        toast.success("Task created successfully");
      }
      allTasks();
      closeModal();
    } catch (error) {
      toast.error("Something went wrong");
      console.log("Error creating/updating task: ", error);
    }
  };

  return (
    <CreateContentStyled theme={theme} onSubmit={handleSubmit}>
      <h1>{editTask ? "Edit Task" : "Create a Task"}</h1>
      <div className="input-control">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          name="title"
          onChange={handleChange("title")}
          placeholder="e.g, Learn Next.js"
        />
      </div>
      <div className="input-control">
        <label htmlFor="description">Description</label>
        <textarea
          value={description}
          onChange={handleChange("description")}
          name="description"
          id="description"
          rows={4}
          placeholder="e.g, Watch a video about Next.js Auth."
        ></textarea>
      </div>
      <div className="input-control">
        <label htmlFor="date">Date</label>
        <input
          value={date}
          onChange={handleChange("date")}
          type="date"
          name="date"
          id="date"
        />
      </div>
      <div className="input-control toggler">
        <label htmlFor="completed">Toggle Completed</label>
        <input
          value={completed.toString()}
          onChange={handleChange("completed")}
          type="checkbox"
          name="completed"
          id="completed"
        />
      </div>
      <div className="input-control toggler">
        <label htmlFor="important">Toggle Important</label>
        <input
          onClick={() => setImportant(!important)}
          value={important.toString()}
          onChange={handleChange("important")}
          type="checkbox"
          name="important"
          id="important"
        />
      </div>

      <div className="submit-btn flex justify-end">
        <Button
          type="submit"
          name={editTask ? "Update Task" : "Create Task"}
          icon={add}
          padding={"0.6rem 1.1rem"}
          borderRad={"0.8rem"}
          fw={"500"}
          fs={"1rem"}
          background={theme.colorGreenDark}
        />
      </div>
    </CreateContentStyled>
  );
}

const CreateContentStyled = styled.form`
  background-color: ${(props) => props.theme.colorBg};
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;

  > h1 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: ${(props) => props.theme.colorPrimary};
  }

  .input-control {
    margin-bottom: 1.5rem;

    label {
      display: block;
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: #fff
      color: ${(props) => props.theme.colorText};
    }

    input,
    textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid ${(props) => props.theme.colorBorder};
      border-radius: 0.5rem;
      background-color: ${(props) => props.theme.colorBg3};
      color: ${(props) => props.theme.colorText};
      color: white;
      font-size: 1rem;
      transition: border-color 0.3s ease;
      box-shadow: 0.3s ease;

      &:focus {
        border-color: ${(props) => props.theme.colorPrimary};
        box-shadow: 0 0 0 3px rgba(98 , 0 , 238 , 0.2);
        }
    }
      
    
    

    textarea {
      resize: vertical;
    }
  }

  .toggler {
    display: flex;
    align-items: center;
    gap: 1rem;

    label {
      margin-bottom: 0;
    }

    input {
      width: auto;
      height: auto;
    }
  }

  .submit-btn {
    display: flex;
    justify-content: flex-end;
    margin-top: 2rem;

    button {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
      font-weight: 600;
      border-radius: 0.5rem;
      background-color: ${(props) => props.theme.colorPrimary};
      color: #fff;
      transition: background-color 0.3s ease , transform 0.3s ease;

      &:hover {
        background-color: ${(props) => props.theme.colorPrimary2};
        transform: translateY(-2px);
      }
    }
  }
`;

export default CreateContent;
