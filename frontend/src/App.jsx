import React from 'react';
import { Box } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import Navbar from './components/Navbar';
import { Toaster } from "sonner"; // ✅ Import Toaster from Sonner
import AuthPage from './pages/AuthPage';
function App() {

  return (
    <Box minH = '100vh'>
      <Navbar />
      <Toaster /> {/* ✅ Add Toaster component */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </Box>
  )
}

export default App
