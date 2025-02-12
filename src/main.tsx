
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Set initial theme from localStorage or default to 'purple'
const savedTheme = localStorage.getItem('theme') || 'purple';
document.documentElement.setAttribute('data-theme', savedTheme);

createRoot(document.getElementById("root")!).render(<App />);
