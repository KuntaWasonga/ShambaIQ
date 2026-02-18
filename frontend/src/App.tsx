import './App.css';
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import { ChatInterface } from "./components/ChatInterface.tsx";

function App() {

    return (
    <>
        <ThemeProvider>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <ChatInterface />
            </div>
        </ThemeProvider>
    </>
  )
}

export default App
