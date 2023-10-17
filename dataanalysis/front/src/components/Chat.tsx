import React, { useState } from 'react';

type Message = {
    type: 'file-response' | 'chat-response';
    content: string;
};

function Chat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [userInput, setUserInput] = useState<string>('');

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData
                });
                const data = await response.json();
                setMessages(prevMessages => [...prevMessages, { type: 'file-response', content: data.message }]);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    const handleSendMessage = async () => {
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userInput })
            });
            const data = await response.json();
            setMessages(prevMessages => [...prevMessages, { type: 'chat-response', content: data.message }]);
            setUserInput('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div>
            <h2>Chat with GPT-3.5</h2>
            
            <div>
                {messages.map((message, index) => (
                    <div key={index}>
                        {message.type === 'file-response' ? 
                            <p><strong>File Response:</strong> {message.content}</p> :
                            <p><strong>ChatGPT:</strong> {message.content}</p>
                        }
                    </div>
                ))}
            </div>

            <div>
                <input 
                    type="text" 
                    value={userInput} 
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>

            <div>
                <label>
                    Upload a file for analysis:
                    <input type="file" onChange={handleFileUpload} />
                </label>
            </div>
        </div>
    );
}

export default Chat;
