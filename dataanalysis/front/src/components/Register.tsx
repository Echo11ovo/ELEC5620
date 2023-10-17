import React, { useState } from 'react';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userType, setUserType] = useState('Customer');  // default user type

    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            console.log('Passwords do not match!');
            return;
        }
        // Here, you'd send the user data to your backend to register
        console.log('Registering as', username, userType);
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <div>
                    <label>User Type:</label>
                    <select value={userType} onChange={(e) => setUserType(e.target.value)}>
                        <option value="Customer">Customer</option>
                        <option value="Merchant">Merchant</option>
                        <option value="Data Analyst">Data Analyst</option>
                    </select>
                </div>
                <div>
                    <button type="submit">Register</button>
                </div>
            </form>
            <div>
                Already have an account? <a href="/login">Login</a>
            </div>
        </div>
    );
}

export default Register;