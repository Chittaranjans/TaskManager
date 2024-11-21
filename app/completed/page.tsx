"use client";
import React from 'react'
import Tasks from '../Components/Tasks/Tasks';
import { useGlobalState } from '../context/GlobalProvider';

function page() {
    const { completedTasks } = useGlobalState();

    return (
        <Tasks title="Completed Tasks" tasks={completedTasks} />
    )
}

export default page
