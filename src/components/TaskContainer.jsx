/** @format */

import React, { useState } from "react";

import TaskCard from "./TaskCard";
import { SortableContext } from "@dnd-kit/sortable";
import { useTaskContext } from "../context/useTaskContext";

import { verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

import FormModal from "./modal/FormModal";

import { TbProgress } from "react-icons/tb";
import { RiTaskLine } from "react-icons/ri";
import { GoTasklist } from "react-icons/go";

const TaskContainer = ({ id }) => {
	const { setNodeRef, isOver } = useDroppable({ id });
	const { tasks } = useTaskContext();
	const [showFormModal, setShowFormModal] = useState(false);
	const containerIcons = {
		"to-do": <GoTasklist className="size-5 text-gray-800" />,

		"in-progress": <TbProgress className="size-5 text-green-500" />,
		completed: <RiTaskLine className="size-5 text-blue-500" />,
	};

	return (
		<div className="bg-white h-fit shrink-0 w-80 md:shrink md:w-auto rounded-lg shadow-sm">
			<h1
				className={`font-bold flex gap-2 text-gray-800 items-center  text-base py-3 px-6 uppercase`}
			>
				{containerIcons[id]} {id.split("-").join(" ")}
			</h1>
			<div className="h-[1px] bg-gray-300" />
			<div
				style={{ maxHeight: "calc(100vh - 200px)" }}
				className="p-3 space-y-3 min-h-32 scroll-bar-light overflow-y-auto"
			>
				{tasks[id].length > 0 ? (
					<SortableContext
						id={id}
						items={tasks[id]}
						strategy={verticalListSortingStrategy}
					>
						{tasks[id].length > 0
							? tasks[id].map((item) => <TaskCard key={item?.id} item={item} />)
							: ""}
					</SortableContext>
				) : (
					<div
						ref={setNodeRef}
						style={{ height: "calc(100%  - 50px)" }}
						className={`${isOver ? "bg-gray-200 rounded-b-lg" : ""} min-h-24`}
					></div>
				)}
				{id === "to-do" ? (
					<button
						onClick={() => setShowFormModal(true)}
						className={`block w-full font-semibold text-sm cursor-pointer p-3 border border-gray-300 rounded-md shadow-sm hover:shadow-lg`}
					>
						+ Add New Task
					</button>
				) : (
					""
				)}
			</div>
			<FormModal isOpen={showFormModal} setIsOpen={setShowFormModal} />
		</div>
	);
};

export default TaskContainer;
