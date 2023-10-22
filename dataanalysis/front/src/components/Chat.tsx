import React, { useState } from 'react';
import { Input, Button, Upload, message, Select, Spin } from 'antd';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import '../CSS/Chat.css';

type Message = {
    type: 'file-response' | 'chat-response';
    content: string;
};

// const BACKEND_URL = 'http://localhost:5000';
const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function Chat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [userInput, setUserInput] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { Option } = Select;

    const handleFileUpload = async (info: any) => {
        if (info.file.status === 'done') {
            setMessages(prevMessages => [...prevMessages, { type: 'file-response', content: info.file.response.message }]);
        } else if (info.file.status === 'error') {
            message.error(`File upload failed: ${info.file.response.message}`);
        }
    };

    const handleSendMessage = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userInput })
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
        <div className="container">
            <div className="header">
                <h2>intelligent data analysis(powered by gpt-3.5)</h2>
                <Select placeholder="Select a prompt" className="select">
                    <Option value="market-trend-forecast">Market Trend Forecast</Option>
                    <Option value="product-popularity-analysis">Analyze the Product Popularity</Option>
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
                <Button type="primary" onClick={handleSendMessage} disabled={isLoading}>
                    {isLoading ? <Spin indicator={loadingIcon} /> : "Send"}
                </Button>
            </div>
    
            <div className="uploadBox">
                <Upload 
                    name="file" 
                    action="/api/upload" 
                    showUploadList={false} 
                    onChange={handleFileUpload}
                    aria-label="Upload a file for analysis">
                    <Button icon={<UploadOutlined />}>Upload a file for analysis</Button>
                </Upload>
            </div>
        </div>
    );
}

export default Chat;
