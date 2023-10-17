import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Login from './components/Login';  
import Register from './components/Register';  
import DataRetrieval from './components/DataRetrieval';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/retrieval" element={<ProtectedDataRetrieval />} />
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

const ProtectedDataRetrieval: React.FC = () => {
    const { isLoggedIn } = useAuth();

    return isLoggedIn ? <DataRetrieval /> : <Navigate to="/login" replace />;
};

export default App;
