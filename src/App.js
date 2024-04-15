import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { ThemeProvider, useTheme } from './ThemeContext';
import './ThemeContext.css';

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Router>
      <div className={isDarkMode ? 'dark' : 'light'}>
        <button onClick={toggleTheme}>{isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</button>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              {/* 👇 link to dynamic path */}
              <Link to="/users/4200">Users</Link>
            </li>
            <li>
              {/* 👇 link to catch all route */}
              <Link to="/does-not-exist">Catch all route</Link>
            </li>
          </ul>
        </nav>

        {/* 👇 Wrap your Route components in a Routes component */}
        <Routes>
          <Route path="/about" element={<About />} />
          {/* 👇 handle dynamic path */}
          <Route path="/users/:userId" element={<Users />} />
          <Route path="/" element={<Home />} />
          {/* 👇 only match this when no other routes match */}
          <Route
            path="*"
            element={
              <div>
                <h2>404 Page not found etc</h2>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  const params = useParams();

  return <h2>Users: {params.userId}</h2>;
}