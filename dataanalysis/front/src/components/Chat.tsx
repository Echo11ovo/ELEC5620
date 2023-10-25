import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Upload, message, Select, Spin, Row, Col } from 'antd';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import Navbar from './Logout';

import '../CSS/Chat.css';

type Message = {
    type: 'file-response' | 'chat-response';
    content: string;
};

const BACKEND_URL = 'http://localhost:5000';

const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function Chat() {
    const navigate = useNavigate();
    const [messages, setMessages] = useState<Message[]>([]);
    const [userInput, setUserInput] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { Option } = Select;
    const [selectedPrompt, setSelectedPrompt] = useState<string>('');
    
    const [userType] = useState<string | null>(localStorage.getItem('userType'));
    console.log("User Type:", userType);
    const handleFileUpload = async (info: any) => {
        if (info.file.status === 'done') {
            setMessages(prevMessages => [...prevMessages, { type: 'file-response', content: info.file.response.message }]);
        } else if (info.file.status === 'error') {
            message.error(`File upload failed: ${info.file.response.message}`);
        }
    };

    const promptsForUser = {
        'Customer': [
            'Personalized Recommendations',
            'Consumption Trend Analysis',
            'Shopping Advice'
        ],
        'Merchants': [
            'Inventory Strategies',
            'Sales Trend Analysis',
            'Product Popularity Analysis'
        ],
        'Data Analysts': [
            'Customer Group Analysis',
            'Market Trend Forecasting',
            'Store Rank Analysis',
            'Sales Suggestions'
        ]
    };
    const availablePrompts = promptsForUser[userType as keyof typeof promptsForUser] || [];
    console.log("Available Prompts:", availablePrompts);

    const handleSendMessage = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${BACKEND_URL}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userInput, prompt: selectedPrompt })
            });
            const data = await response.json();
            setMessages(prevMessages => [...prevMessages, { type: 'chat-response', content: data.message }]);
            setUserInput('');
        } catch (error) {
            message.error('Error sending message: ' + (error as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="chatPage">
            <Navbar /> 
            <Button className="floatingButton" onClick={() => navigate('/retrieval')}>Come back to retrieval data</Button>
            <Row className="container" justify="center">
                <Col xs={24} sm={22} md={18} lg={14} xl={12}>
                    <div className="header">
                        <h2>intelligent data analysis</h2>
                        <Select
                            placeholder="Select a prompt"
                            className="select"
                            onChange={(value) => setSelectedPrompt(value as string)}
                        >
                            {availablePrompts.map(prompt => (
                                <Option value={prompt.replace(/\s+/g, '-').toLowerCase()} key={prompt}>
                                    {prompt}
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <div className="chatBox" role="log" aria-live="polite">
                        {messages.map((message, index) => (
                            <div key={index} className={`message ${message.type}`}>
                                <strong>{message.type === 'file-response' ? 'File Response:' : 'ChatGPT:'}</strong> {message.content}
                            </div>
                        ))}
                    </div>

                    <div className="inputBox">
                        <Input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="Type your message..."
                        />
                        <Button type="primary" className="sendBtn" onClick={handleSendMessage} disabled={isLoading}>
                            {isLoading ? <Spin indicator={loadingIcon} /> : "Send"}
                        </Button>
                    </div>

                    <div className="uploadBox">
                        <Upload
                            name="file"
                            action={`${BACKEND_URL}/api/upload`}
                            showUploadList={false}
                            onChange={handleFileUpload}
                            aria-label="Upload a file for analysis">
                            <Button icon={<UploadOutlined />}>Upload a file for analysis</Button>
                        </Upload>
                    </div>
                </Col>
            </Row>
        </div>


    );
}

export default Chat;
