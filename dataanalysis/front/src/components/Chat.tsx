import React, { useState } from 'react';
import { Input, Button, Upload, message, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

type Message = {
    type: 'file-response' | 'chat-response';
    content: string;
};
const BACKEND_URL = 'http://localhost:3000';

function Chat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [userInput, setUserInput] = useState<string>('');
    const { Option } = Select;

    const handleFileUpload = async (info: any) => {
        if (info.file.status === 'done') {
            setMessages(prevMessages => [...prevMessages, { type: 'file-response', content: info.file.response.message }]);
        } else if (info.file.status === 'error') {
            message.error(`File upload failed: ${info.file.response.message}`);
        }
    };

    const handleSendMessage = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/chat`, {  // <-- Modified this line
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userInput })
            });
            const data = await response.json();
            setMessages(prevMessages => [...prevMessages, { type: 'chat-response', content: data.message }]);
            setUserInput('');
            console.log(data.message)
        } catch (error) {
            message.error('Error sending message: ' + (error as Error).message);
        }
    };


    return (
        <div style={{ padding: '20px' }}>
            <h2>Chat with GPT-3.5</h2>

            <Select placeholder="Select a prompt" style={{ width: 200, marginBottom: '20px' }}>
                <Option value="market-trend-forecast">Market Trend Forecast</Option>
                <Option value="product-popularity-analysis">Analyze the Product Popularity</Option>
            </Select>

            <div style={{ marginBottom: '20px', border: '1px solid #d9d9d9', padding: '10px', borderRadius: '4px', maxHeight: '300px', overflowY: 'auto' }}>
                {messages.map((message, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                        <strong>{message.type === 'file-response' ? 'File Response:' : 'ChatGPT:'}</strong> {message.content}
                    </div>
                ))}
            </div>

            <div style={{ marginBottom: '20px' }}>
                <Input 
                    type="text" 
                    value={userInput} 
                    onChange={(e) => setUserInput(e.target.value)} 
                    placeholder="Type your message..." 
                    style={{ marginRight: '10px' }}
                />
                <Button type="primary" onClick={handleSendMessage}>Send</Button>
            </div>

            <Upload 
                name="file" 
                action="/api/upload"
                showUploadList={false} 
                onChange={handleFileUpload}>
                <Button icon={<UploadOutlined />}>Upload a file for analysis</Button>
            </Upload>
        </div>
    );
}

export default Chat;
