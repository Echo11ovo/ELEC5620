import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import DataRetrieval from './components/DataRetrieval';
import NotFound from './components/NotFound';

const AppRoutes: React.FC = () => {
    const { isLoggedIn } = useAuth(); // 移动到这里

    if (isLoggedIn) {
        return (
            <Routes>
                <Route path="/retrieval" element={<DataRetrieval />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        );
    } else {
        return (
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        );
    }
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <AppRoutes />
            </Router>
        </AuthProvider>
    );
};

export default App;
