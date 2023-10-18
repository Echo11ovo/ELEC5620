import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import DataRetrieval from './components/DataRetrieval';
import Chat from './components/Chat';
import NotFound from './components/NotFound';



const App: React.FC = () => {
    return(
        //没有路由保护
        <Router>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register />} />
                <Route path="/retrieval" element={<DataRetrieval />} />
                <Route path='/chat' element={<Chat/>}/>
            </Routes>
        </Router>
    )
}

// 路由保护，先别启用
// const AppRoutes: React.FC = () => {
//     const { isLoggedIn } = useAuth(); 

//     if (isLoggedIn) {
//         return (
//             <Routes>
//                 <Route path="/retrieval" element={<DataRetrieval />} />
//                 <Route path="*" element={<NotFound />} />
//             </Routes>
//         );
//     } else {
//         return (
//             <Routes>
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/register" element={<Register />} />
//                 <Route path="*" element={<Navigate to="/login" />} />
//             </Routes>
//         );
//     }
// };
// const App: React.FC = () => {
//     return (
//         <AuthProvider>
//             <Router>
//                 <AppRoutes />
//             </Router>
//         </AuthProvider>
//     );
// };

export default App;
