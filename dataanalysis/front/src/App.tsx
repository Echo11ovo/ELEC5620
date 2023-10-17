import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';  
import Register from './components/Register';  
import DataRetrieval from './components/DataRetrieval';

const ProtectedRoute: React.FC<{ path: string, element: React.ReactNode }> = ({ path, element }) => {
    const isLoggedIn = Boolean(localStorage.getItem('token'));

    return isLoggedIn ? <Route path={path} element={element} /> : <Navigate to="/login" />;
}

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <ProtectedRoute path="/retrieval" element={<DataRetrieval />} />
                <Route path="*" element={<Navigate to="/login" />} /> {/* Default route redirects to login */}
            </Routes>
        </Router>
    );
}

export default App;
