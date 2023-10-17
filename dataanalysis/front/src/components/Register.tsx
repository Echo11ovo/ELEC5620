import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Select, Row, Col, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        userType: 'Customer'
    });

    const handleFormChange = (changedValues:any, allValues:any) => {
        setFormData(allValues);
    };

    const handleSubmit = async () => {
        const { username, password, confirmPassword, userType } = formData;
        if (password !== confirmPassword) {
            message.error('Passwords do not match!');
            return;
        }
        // Optionally: Check for password strength here

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, userType })
            });
            const data = await response.json();
            if (data.success) {
                navigate('/login');  // Redirect to login page
            } else {
                message.error('Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            message.error('An error occurred. Please try again.');
        }
    };

    return (
        <Row justify="center" align="middle" style={{ height: '100vh' }}>
            <Col span={8}>
                <Form 
                    onFinish={handleSubmit} 
                    onValuesChange={handleFormChange}
                    initialValues={formData}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: 'Please input your Password!' },
                            // Optionally: Add more password strength rules here
                        ]}
                    >
                        <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                    </Form.Item>
                    <Form.Item
                        name="confirmPassword"
                        rules={[{ required: true, message: 'Please confirm your Password!' }]}
                    >
                        <Input prefix={<LockOutlined />} type="password" placeholder="Confirm Password" />
                    </Form.Item>
                    <Form.Item
                        name="userType"
                        rules={[{ required: true, message: 'Please select a user type!' }]}
                    >
                        <Select placeholder="Select a user type">
                            <Select.Option value="Customer">Customer</Select.Option>
                            <Select.Option value="Merchants">Merchants</Select.Option>
                            <Select.Option value="Data Analysts">Data Analysts</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
}

export default Register;
