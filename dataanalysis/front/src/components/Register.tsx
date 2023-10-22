import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Row, Col, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../CSS/Register.css';

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        userType: 'Customer'
    });

    const handleFormChange = (changedValues: any, allValues: any) => {
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
        <Row className="row-center" gutter={[0, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
            <Col className="col-register" xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }} xl={{ span: 6 }}>
                <h2>Sign Up</h2>
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
                        name="email"
                        rules={[{ required: true, message: 'Please input your Email!' }]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                            Sign Up
                        </Button>
                    </Form.Item>
                </Form>
                <div className="form-link">
                    Already have an account? <a onClick={() => navigate('/login')}>Log in here!</a>
                </div>
            </Col>
        </Row>
    );
}

export default Register;
