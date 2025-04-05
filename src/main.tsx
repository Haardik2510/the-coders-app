
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Set initial theme from localStorage or default to 'purple'
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

// Set app title and meta description
document.title = "CodersApp by KRMU";
const metaDescription = document.querySelector('meta[name="description"]');
if (metaDescription) {
  metaDescription.setAttribute('content', 'CodersApp by KRMU - Connect, Code, and Celebrate with Fellow Developers');
}

createRoot(document.getElementById("root")!).render(<App />);
