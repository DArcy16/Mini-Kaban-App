
site - (https://mini-kaban.netlify.app/)
# Mini Kaban

Mini Kaban is a simple, lightweight Kanban board application that helps you manage your tasks across three columns: **To Do**, **In Progress**, and **Completed**. With features like creating, editing, and deleting tasks, as well as intuitive drag & drop support for sorting and moving tasks between columns, Mini Kaban streamlines your workflow. It also gives you a visual warning when a task's due date is less than or equal to 2 hours away.

## Features

- **Three Columns:**  
  Organize your tasks into:
  - **To Do**
  - **In Progress**
  - **Completed**

- **Task Management:**  
  - Create new tasks with details such as title, description, and due date.
  - Edit existing tasks.
  - Delete tasks that are no longer needed.

- **Drag & Drop:**  
  - Drag tasks between columns to update their status.
  - Reorder tasks within the same column using drag & drop.

- **Due Date Warning:**  
  - Automatically displays a warning on task cards when a task's due date is less than or equal to **2 hours** away.
  - **Important:** The warning feature checks the due date **only once** on page load. This means that if a task's due date moves into the 2-hour window during your session, the warning will not update unless you reload the page.
  
  > **Why this approach?**  
  > The design decision was made to minimize re-rendering and to avoid constantly polling for time differences, which can impact performance. This approach checks the time difference when the component mounts, ensuring that the application does not continuously update the state every second.
  
## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:
- [Node.js](https://nodejs.org/) installed (version 14 or higher recommended)
- A modern web browser (Chrome, Firefox, Edge, etc.)

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/DArcy16/mini-kaban-app.git
   cd mini-kaban-app

 # React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


