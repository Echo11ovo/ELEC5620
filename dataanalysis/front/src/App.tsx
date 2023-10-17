import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';  
import Register from './components/Register';  
import DataRetrieval from './components/DataRetrieval';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/retrieval" element={<DataRetrieval />} />
                <Route path="*" element={<Navigate to="/login" />} /> {/* Default route redirects to login */}
                {/* Add other routes as needed */}
            </Routes>
        </Router>
    );
}

export default App;
