"use client";
import { edit, trash } from '@/app/utils/icons';
import styled from 'styled-components';
import { useGlobalState } from '@/app/context/GlobalProvider'
import formatDate from '@/app/utils/formatDate';
import React from 'react'

interface Props {
    title: string,
    description: string,
    date: string,
    isCompleted: boolean,
    id: string,
}

function TaskItem({ title, description, date, isCompleted, id }: Props) {
    const { theme, deleteTask, updateTask } = useGlobalState();

    return (
        <TaskItemStyled theme={theme}>
            <h1>{title}</h1>
            <p>{description}</p>
            <p className="date">
                {formatDate(date)}
            </p>
            <div className="task-footer">
                {isCompleted ?
                    <button onClick={() => {
                        updateTask(id, { isCompleted: !isCompleted })
                    }} className="completed">Completed</button>
                    : <button onClick={() => {
                        updateTask(id, { isCompleted: !isCompleted })
                    }} className="incompleted">Incompleted</button>
                }
                <button onClick={() => { deleteTask(id) }} className="delete">{trash}</button>
            </div>
        </TaskItemStyled>
    )
}

const TaskItemStyled = styled.div`
    padding: 1.2rem 1rem;
    border-radius: 1rem;
    background-color: ${props => props.theme.colorBg3};
    color: ${props => props.theme.colorGrey0};
    box-shadow: ${props => props.theme.shadow7};
    border: 2px solid ${props => props.theme.borderColor2};

    height: 16rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .date {
        margin-top: auto;
    }

    > h1 {
        font-size: 1.2rem;
        font-weight: 600;
    }

    .task-footer {
        display: flex;
        align-items: center;
        gap: 1.2rem;

        button {
            border: none;
            outline: none;
            cursor: pointer;

            i {
                font-size: 1.4rem;
                color: ${props => props.theme.colorGrey2};
            }
        }

        .delete {
            margin-left: auto;

            i {
                color: ${props => props.theme.colorGrey1};
            }
        }

        .completed, .incompleted {
            display: inline-block;
            padding: 0.4rem 1rem;
            background: ${props => props.theme.colorIncomplete};
            border-radius: 30px;
        }

        .completed {
            background: ${props => props.theme.colorComplete} !important;
        }
    }
`

export default TaskItem
