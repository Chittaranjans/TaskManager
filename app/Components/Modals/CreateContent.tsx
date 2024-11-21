"use client";
import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { add, plus } from "@/app/utils/icons";
import Button from '../Button/Button';
import styled from 'styled-components';
import { useGlobalState } from '@/app/context/GlobalProvider';

function CreateContent() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [completed, setCompleted] = useState(false);
    const [important, setImportant] = useState(false);

    const { theme, allTasks, closeModal } = useGlobalState();

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
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const task = {
            title,
            description,
            date,
            completed,
            important
        }

        try {
            const res = await axios.post('/api/tasks', task);

            if (res.data.error) {
                toast.error(res.data.error);
            }
            else {
                toast.success("Task created successfully");
                allTasks();
                closeModal();
            }
        } catch (error) {
            toast.error("Something went wrong");
            console.log("Error creating task: ", error);
        }
    }

    return (
        <CreateContentStyled theme={theme} onSubmit={handleSubmit}>
            <h1>Create a Task</h1>
            <div className="input-control">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    name="title"
                    onChange={handleChange("title")}
                    placeholder="e.g, Watch a video from Youtube."
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
                    name="Create Task"
                    icon={add}
                    padding={"0.6rem 1.1rem"}
                    borderRad={"0.8rem"}
                    fw={"500"}
                    fs={"1rem"}
                    background={theme.colorGreenDark}
                />
            </div>
        </CreateContentStyled>
    )
}

const CreateContentStyled = styled.form`
    > h1 { 
        font-size: clamp(1.5rem, 2vw, 2rem);
        font-weight: 600;
    }

    color: ${props => props.theme.colorGrey1};

    .input-control {
        position: relative;
        margin: 1.6rem 0;
        font-weight: 500;

        label {
            font-size: clamp(0.9rem, 2vw, 1.2rem);
            display: inline-block;

            span {
                color: ${props => props.theme.colorGrey3};
            }
        }

        input, textarea {
            width: 100%;
            padding: 0.4rem;
            resize: none;

            background-color: ${props => props.theme.colorGrey0};
            color: ${props => props.theme.colorText};
            border-radius: 0.5rem;
        }

        input[type="date"]::-webkit-calendar-picker-indicator {
            filter: invert(1);
            font-size: 1.2rem;
            cursor: pointer;
        } 
    }

    .toggler {
        display: flex;
        align-items: center;
        gap: 2rem;

        cursor: pointer;

        input {
            width: initial;
        }
    }
        
`

export default CreateContent
