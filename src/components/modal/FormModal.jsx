/** @format */

import { DatePicker, Form, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useTaskContext } from "../../context/useTaskContext";
import dayjs from "dayjs";

const defaultTask = {
	id: "",
	title: "",
	desc: "",
};

const FormModal = ({ task = defaultTask, isOpen, setIsOpen }) => {
	const [form] = Form.useForm();
	const { setTasks, tasks } = useTaskContext();

	const handleCancel = () => {
		setIsOpen(false);
		form.resetFields();
	};

	const handleSubmit = (values) => {
		if (task.title) {
			const editContainer = Object.keys(tasks).filter((container) =>
				tasks[container].some((item) => item.id === task.id)
			)[0];

			const editArr = tasks[editContainer].map((item) =>
				item.id === task.id
					? {
							...item,
							...values,
							dueDate: values.dueDate.format("YYYY-MM-DD HH:mm"),
					  }
					: item
			);

			setTasks((prev) => ({ ...prev, [editContainer]: [...editArr] }));
		} else {
			const newTask = {
				id: uuidv4(),
				...values,
				dueDate: values.dueDate.format("YYYY-MM-DD HH:mm"),
			};

			setTasks((prev) => ({
				...prev,
				"to-do": [...prev["to-do"], newTask],
			}));
		}
		handleCancel();
	};

	return (
		<Modal
			open={isOpen}
			onCancel={handleCancel}
			destoryOnClose={true}
			maskClosable={false}
			width={"fit-content"}
			closable={false}
			footer=""
		>
			<h2 className="text-center font-semibold mb-3 text-lg">
				{task.title ? "Edit" : "Add New"} Task
			</h2>
			<Form
				form={form}
				layout="vertical"
				style={{ width: "460px", maxWidth: "100%" }}
				initialValues={{
					...task,
					dueDate: task.dueDate ? dayjs(task.dueDate) : dayjs(new Date()),
				}}
				onFinish={handleSubmit}
			>
				<Form.Item
					label="Title"
					name={"title"}
					rules={[{ required: true, message: "Please input your username!" }]}
				>
					<Input style={{ fontSize: "16px" }} />
				</Form.Item>
				<Form.Item label="Description" name={"desc"}>
					<TextArea style={{ fontSize: "16px" }} rows={4} />
				</Form.Item>
				<Form.Item
					name="dueDate"
					label="Due Date"
					rules={[{ required: true, message: "Please select date and time" }]}
				>
					<DatePicker
						inputReadOnly
						style={{ fontSize: "16px" }}
						showTime
						format="YYYY-MM-DD HH:mm"
					/>
				</Form.Item>
				<Form.Item>
					<div className="flex items-center justify-center gap-2">
						<button onClick={handleCancel} type="button" className="cancel-btn">
							Cancel
						</button>
						<button type="submit" className="primary-btn">
							Submit
						</button>
					</div>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default FormModal;
