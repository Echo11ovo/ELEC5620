import React, { useState } from 'react';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userType, setUserType] = useState('Customer');  // default user type

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            console.log('Passwords do not match!');
            return;
        }
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                    userType
                })
            });
            const data = await response.json();
            if (data.success) {
                // Handle successful registration, e.g. redirect to login page or auto-login the user
            } else {
                // Handle registration error, e.g. show error message to user
            }
        } catch (error) {
            console.error('Error during registration:', error);
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