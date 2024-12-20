"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import themes from "./themes";
import axios from "axios";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalProvider = ({ children }) => {
    const { user } = useUser();

    const [selectedTheme, setSelectedTheme] = useState(0);
    const theme = themes[selectedTheme];
    const [isLoading, setIsLoading] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [modal, setModal] = useState(false);
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(true);
    const [editTask, setEditTask] = useState(null);

    const openModal = () => setModal(true);

    const closeModal = () => {
        setModal(false);
        setEditTask(null); // Reset editTask when closing the modal
    };

    const toggleSidebar = () => setSidebarCollapsed(!isSidebarCollapsed);

    const toggleLightMode = () => setSelectedTheme((selectedTheme + 1) % 2);

    const allTasks = async () => {
        setIsLoading(true);

        try {
            const res = await axios.get("/api/tasks");

            const sortedTasks = res.data.sort((a, b) => {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            });

            setTasks(sortedTasks);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`/api/tasks/${id}`);
            toast.success("Task Deleted.");
            allTasks();
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    const updateTask = async (id, task) => {
        try {
            await axios.put(`/api/tasks/${id}`, task);
            toast.success("Task Updated.");
            allTasks();
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    const edit = (task) => {
        setEditTask(task);
        openModal();
    };

    const completedTasks = tasks.filter((task) => task.isCompleted === true);

    const incompletedTasks = tasks.filter((task) => task.isCompleted === false);

    const importantTasks = tasks.filter((task) => task.isImportant === true);

    useEffect(() => {
        if (user) allTasks();
    }, [user]);

    return (
        <GlobalContext.Provider value={{
            theme,
            selectedTheme,
            modal,
            openModal,
            closeModal,
            tasks,
            allTasks,
            deleteTask,
            updateTask,
            edit,
            editTask,
            completedTasks,
            incompletedTasks,
            importantTasks,
            isSidebarCollapsed,
            toggleSidebar,
            toggleLightMode,
        }}>
            <GlobalUpdateContext.Provider value={setSelectedTheme}>
                {children}
            </GlobalUpdateContext.Provider>
        </GlobalContext.Provider>
    );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);