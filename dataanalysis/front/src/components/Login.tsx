import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Row, Col, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

interface LoginFormValues {
    username: string;
    password: string;
    remember: boolean;
}

function Login() {
    const navigate = useNavigate();

    useEffect(() => {
        // It's better to verify the token with backend rather than just checking its existence
        checkTokenValidity();
    }, [navigate]);

    const checkTokenValidity = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        // Assuming you have an endpoint to verify token
        try {
            const response = await fetch('/api/verify-token', {
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

    const handleSubmit = async (values: LoginFormValues) => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            if (data.success && values.remember) {
                localStorage.setItem('token', data.token);
            }
            navigate('/retrieval');
        } catch (error: unknown) {
            console.error('Error during login:', error);
            if (error instanceof Error) {
                message.error(error.message);
            } else {
                message.error('An unexpected error occurred.');
            }
        }
    };

    return (
        <Row justify="center" align="middle" style={{ height: '100vh' }}>
            <Col span={8}>
                <Form onFinish={handleSubmit} initialValues={{ remember: true }}>
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
                    <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                            Log in
                        </Button>
                        Or <a onClick={() => navigate('/register')}>register now!</a>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
}

export default Login;
