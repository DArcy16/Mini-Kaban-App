/** @format */

import { createContext, useContext, useEffect, useState } from "react";

const taskContext = createContext();

const defaultTasks = {
	"to-do": [],
	"in-progress": [],
	completed: [],
};

export const TaskContextProviders = ({ children }) => {
	const [tasks, setTasks] = useState("");

	useEffect(() => {
		const localTasks = localStorage.getItem("kaban-tasks");
		const saved = localTasks ? JSON.parse(localTasks) : defaultTasks;
		setTasks(saved); // You'll need to define setTasks and tasks via useState
	}, []);

	return (
		<taskContext.Provider value={{ tasks, setTasks }}>
			{children}
		</taskContext.Provider>
	);
};

export const useTaskContext = () => useContext(taskContext);
