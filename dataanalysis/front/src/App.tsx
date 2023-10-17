import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';  
import Register from './components/Register';  
import DataRetrieval from './components/DataRetrieval';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/retrieval" element={<DataRetrieval />} />
                {/* Add other routes as needed */}
            </Routes>
        </Router>
    );
}

export default App;
