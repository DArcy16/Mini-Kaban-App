/** @format */

import "./App.css";

import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	DragOverlay,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useTaskContext } from "./context/useTaskContext";
import { useEffect, useState } from "react";

import Header from "./components/Header";
import SortableTaskContainer from "./components/TaskContainer";
import TaskCard from "./components/TaskCard";

const defaultActive = { id: "", container_id: "" };

function App() {
	const { setTasks, tasks } = useTaskContext();
	const [active, setActive] = useState(defaultActive);

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			activationConstraint: {
				defaultKeyboardCoordinateGetter: sortableKeyboardCoordinates,
			},
		})
	);

	useEffect(() => {
		if (tasks !== "") {
			localStorage.setItem("kaban-tasks", JSON.stringify(tasks));
		}
	}, [tasks]);

	const handleDragEnd = ({ active, over }) => {
		if (!active && !over) return;

		const activeContainerId = active?.data?.current?.sortable?.containerId;

		const dragTaskToDifferentContainer = (overContainerId) => {
			const tasksInActive = tasks[activeContainerId].filter(
				(item) => item.id !== active.id
			);
			const activeTask = tasks[activeContainerId].filter(
				(item) => item.id === active.id
			)[0];

			const tasksInOver = [...tasks[overContainerId], activeTask];

			setTasks((prev) => ({
				...prev,
				[activeContainerId]: [...tasksInActive],
				[overContainerId]: [...tasksInOver],
			}));
		};

		if (
			over.id === "to-do" ||
			over.id === "completed" ||
			over.id === "in-progress"
		) {
			dragTaskToDifferentContainer(over.id);
		} else {
			const overContainerId = over?.data?.current?.sortable?.containerId;

			if (activeContainerId === overContainerId) {
				if (active.id !== over.id) {
					const activeIndex = active?.data?.current?.sortable?.index;
					const overIndex = over?.data?.current?.sortable?.index;

					const replaceArray = arrayMove(
						tasks[activeContainerId],
						activeIndex,
						overIndex
					);
					console.log(replaceArray);
					setTasks((prev) => ({
						...prev,
						[activeContainerId]: [...replaceArray],
					}));
				}
			} else {
				dragTaskToDifferentContainer(overContainerId);
			}
		}
		setActive(defaultActive);
	};

	const handleDragStart = ({ active }) => {
		setActive({
			id: active.id,
			container_id: active.data.current.sortable.containerId,
		});
	};

	return (
		<div className="bg-gray-300 min-h-screen">
			<Header />
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}
			>
				<div
					style={{ height: "calc(100vh - 65px)" }}
					className="scroll-bar-light flex md:grid md:grid-cols-3 md:max-w-[1080px] md:mx-auto gap-4 overflow-x-auto w-screen p-5 md:p-10"
				>
						{Object.keys(tasks).map((key) => {
							return <SortableTaskContainer key={key} id={key} />;
						})}
				</div>
				<DragOverlay>
					{active.id ? (
						<TaskCard
							item={
								tasks[active.container_id].filter(
									(item) => item.id === active.id
								)[0]
							}
							isDragOverlay={true}
						/>
					) : (
						""
					)}
				</DragOverlay>
			</DndContext>
		</div>
	);
}

export default App;
