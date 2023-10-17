import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

function Login() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/retrieval');  // Redirect to dataRetrieval if already logged in
        }
    }, [navigate]);

    const handleSubmit = async (values: { username: string, password: string, remember: boolean }) => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            });
            const data = await response.json();
            if (data.success && values.remember) {
                localStorage.setItem('token', data.token);  // Save token to localStorage
            }
            navigate('/retrieval');  // Navigate to dataRetrieval page after successful login
        } catch (error) {
            console.error('Error during login:', error);
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
