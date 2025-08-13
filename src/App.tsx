import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Debounce from './begins/01.debounce'
import Throttle from './final/02.throttle'

const routes = [
  { path: "/debounce", element: <Debounce /> },
  { path: "/throttle", element: <Throttle /> },
];

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="flex">
        <div style={{ display: sidebarOpen ? 'none' : 'block' }} >
          <Sidebar />
        </div>
        <main className={`p-6 flex-1 ${sidebarOpen ? 'ml-0' : 'ml-64'} transition-all duration-300 ease-in-out`}>
          <button
            className="fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Open sidebar"
          >
            ☰
          </button>
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
