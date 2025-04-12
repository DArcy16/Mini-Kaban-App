import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { TaskContextProviders } from './context/useTaskContext.jsx'

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<TaskContextProviders>
			<App />
		</TaskContextProviders>
	</StrictMode>
);
