import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import { Routes, Route, Navigate, Link } from "react-router";
import About from './pages/About';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <header style={{ display: "flex", alignItems: "center", gap: 15 }}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </header>
      <br />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </QueryClientProvider>
  );
}

export default App;
