import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Row, Col, message, Spin, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../AuthContext';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

import '../CSS/Login.css';

interface LoginFormValues {
    username: string;
    password: string;
    remember: boolean;
}
const BACKEND_URL = 'http://localhost:3000';

function Login() {
    const { setLoggedIn } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false);



    useEffect(() => {
        checkTokenValidity();
    }, [navigate]);

    const checkTokenValidity = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const response = await fetch(`${BACKEND_URL}/api/verify-token`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (response.ok) {
                navigate('/retrieval');
            } else {
                localStorage.removeItem('token');
            }
        } catch (error) {
            console.error('Error verifying token:', error);
        }
    };
    const handleCheckboxChange = (e: CheckboxChangeEvent) => {
        setIsChecked(e.target.checked);
    };
    const handleSubmit = async (values: LoginFormValues) => {
        values.remember = isChecked;
        setIsLoading(true);
        try {
            const response = await fetch(`${BACKEND_URL}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            if (data.success) {
                setLoggedIn(true);
                if (values.remember) {
                    console.log('remember state', values.remember);
                    console.log("Server response:", data);
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userType', data.userType); // Only save userType if remember is true
                }
                console.log("Server response:", data);

                localStorage.setItem('userType', data.userType); // 保存用户类型到localStorage中
            }
            navigate('/retrieval');
        } catch (error: unknown) {
            console.error('Error during login:', error);
            if (error instanceof Error) {
                message.error(error.message);
            } else {
                message.error('An unexpected error occurred.');
            }
        } finally {
            setIsLoading(false);
        }
        console.log('Remember Me value:', values.remember);

    };

    return (
        <Spin spinning={isLoading}>
            <Row className="row-center" gutter={[0, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
                <Col className="col-login" xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }} xl={{ span: 6 }}>
                    <h2>Sign In</h2>
                    <Form onFinish={handleSubmit} initialValues={{ remember: false }}>  {/* Set default value for remember */}
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                        </Form.Item>
                        <Form.Item>
                            <Checkbox checked={isChecked} onChange={handleCheckboxChange}>Remember me</Checkbox>
                        </Form.Item>
                        <Form.Item>
                            <Button className="Login" htmlType="submit">
                                Log in
                            </Button>
                        </Form.Item>
                        <Form.Item className="form-link">
                            Don't have an account? <a onClick={() => navigate('/register')}>Sign up now!</a>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Spin>
    );
}

export default Login;
