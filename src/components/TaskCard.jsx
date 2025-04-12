/** @format */

import { useSortable } from "@dnd-kit/sortable";
import React, { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";

import { CSS } from "@dnd-kit/utilities";
import { useTaskContext } from "../context/useTaskContext";
import DeleteModal from "./modal/DeleteModal";
import FormModal from "./modal/FormModal";
import dayjs from "dayjs";

const TaskCard = ({ item, isDragOverlay = false }) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
		isOver,
	} = useSortable(item);
	const { tasks, setTasks } = useTaskContext();
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showFormModal, setShowFormModal] = useState(false);
	const [showWarning, setShowWarning] = useState(false); // show warning if curr time is close to due Date

	const dueDate = dayjs(item.dueDate);

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		touchAction: "manipulation",
	};

	const currContainer = Object.keys(tasks).filter((key) =>
		tasks[key].some((task) => task.id === item.id)
	)[0];

	const handleDelete = (e) => {
		e.stopPropagation();
		e.preventDefault();
		const selectedContainerId = Object.keys(tasks).filter((key) =>
			tasks[key].some((task) => task.id === item.id)
		)[0];

		const filteredArr = tasks[selectedContainerId].filter(
			(task) => task.id !== item.id
		);

		setTasks((prev) => ({ ...prev, [selectedContainerId]: filteredArr }));
	};

	useEffect(() => {
		const now = dayjs();
		const timeDiff = dueDate.diff(now);

		const timeGap = 2 * 60 * 60 * 1000; // 2hr

		if (timeDiff <= timeGap) {
			setShowWarning(true);
		} else {
			setShowWarning(false);
		}
	}, [dueDate]);

	const articleCardStyle = `${
		isDragging ? "bg-gray-300 cursor-grabbing" : ""
	} ${isDragOverlay || isOver ? "bg-gray-100 shadow-md" : "shadow-sm"}
			${
				currContainer === "completed"
					? "shadow-blue-400"
					: showWarning
					? "shadow-red-400"
					: currContainer === "in-progress"
					? "shadow-green-400"
					: ""
			}
			border-gray-300
			 p-3 border relative rounded-md`;

	return (
		<article ref={setNodeRef} style={style} className={articleCardStyle}>
			<div className="flex justify-between w-full items-center gap-2">
				<h2 className="text-base font-semibold line-clamp-1">{item?.title}</h2>
				<div className="flex gap-2">
					<button className="cursor-pointer">
						<BiEditAlt
							onClick={() => setShowFormModal(true)}
							className="size-5 text-gray-400 hover:text-gray-600 transition duration-300"
						/>
					</button>
					<button
						onClick={() => setShowDeleteModal(true)}
						className="cursor-pointer"
					>
						<RiDeleteBin6Line className="size-5 text-gray-400 hover:text-gray-600  transition duration-300" />
					</button>
				</div>
			</div>
			<p
				className={`mt-1 line-clamp-1 ${
					currContainer !== "completed" && showWarning ? "text-red-500" : ""
				} text-xs font-bold`}
			>
				dueDate : {item.dueDate}
			</p>
			<p className="mt-1 line-clamp-1 text-gray-600 text-xs">{item?.desc}</p>
			<button
				style={{ touchAction: "manipulation" }}
				className="absolute font-bold text-gray-500 tracking-wider hover:text-gray-800 right-1 bottom-0 cursor-grab"
				{...attributes}
				{...listeners}
			>
				.:
			</button>
			<DeleteModal
				isOpen={showDeleteModal}
				setIsOpen={setShowDeleteModal}
				onDelete={handleDelete}
			/>
			<FormModal
				isOpen={showFormModal}
				setIsOpen={setShowFormModal}
				task={item}
			/>
		</article>
	);
};

export default TaskCard;
