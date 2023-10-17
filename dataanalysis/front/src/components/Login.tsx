import React, { useState } from 'react';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userType, setUserType] = useState('Customer');  // default user type

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });
            const data = await response.json();
            if (data.success) {
                // Handle successful login, e.g. redirect to dashboard or set user session
            } else {
                // Handle login error, e.g. show error message to user
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
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
