"use client";
import React from 'react'
import { useGlobalState } from '../context/GlobalProvider';
import Tasks from '../Components/Tasks/Tasks';

function page() {
    const { incompletedTasks } = useGlobalState();

    return (
        <Tasks title="Incompleted Tasks" tasks={incompletedTasks} />
    )
}

export default page