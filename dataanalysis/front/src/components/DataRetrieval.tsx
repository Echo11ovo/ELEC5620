import React, { useState } from 'react';
import { Input, Button, Select, Spin, Row, Col, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;
const BACKEND_URL = 'http://localhost:5000';
const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function DataRetrieval() {
    const [naturalLanguageInput, setNaturalLanguageInput] = useState('');
    const [selectedQuery, setSelectedQuery] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [dataFromBackend, setDataFromBackend] = useState<any>(null);
    const navigate = useNavigate();
    const predefinedQueries = [
        "List all customers",
        "Show top selling products",
        "Display orders from last month",
        // Add more predefined queries as needed
    ];

    const handleDataRetrieval = async (type: 'natural' | 'predefined') => {
        setIsLoading(true);
        let messageToSend = type === 'natural' ? naturalLanguageInput : selectedQuery;
        
        if (!messageToSend) {
            message.error('Please enter a query or select one from the dropdown.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(`${BACKEND_URL}/api/data-retrieval`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    message: messageToSend
                })
            });
            const data = await response.json();
            setDataFromBackend(data);
        } catch (error) {
            message.error('Error fetching data: ' + (error as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Row justify="center">
            <Col xs={24} sm={22} md={18} lg={14} xl={12}>
                <h2>Data Retrieval</h2>
                
                {/* Natural Language Input */}
                <div>
                    <h3>Describe the data you want</h3>
                    <Input 
                        type="text" 
                        value={naturalLanguageInput} 
                        onChange={(e) => setNaturalLanguageInput(e.target.value)}
                        placeholder="Use natural language to specify your data request..."
                    />
                    <Button 
                        type="primary" 
                        onClick={() => handleDataRetrieval('natural')} 
                        disabled={isLoading}
                        style={{ marginTop: '20px' }}
                    >
                        {isLoading ? <Spin indicator={loadingIcon} /> : "Fetch Data"}
                    </Button>
                </div>

                {/* Dropdown Selection */}
                <div style={{ marginTop: '20px' }}>
                    <h3>Or select a predefined query</h3>
                    <Select 
                        style={{ width: 300 }}
                        placeholder="Select a predefined query"
                        onChange={(value) => setSelectedQuery(value)}
                    >
                        {predefinedQueries.map(query => (
                            <Option key={query} value={query}>{query}</Option>
                        ))}
                    </Select>
                    <Button 
                        type="primary" 
                        onClick={() => handleDataRetrieval('predefined')} 
                        disabled={isLoading}
                        style={{ marginLeft: '10px' }}
                    >
                        {isLoading ? <Spin indicator={loadingIcon} /> : "Fetch Data"}
                    </Button>
                </div>

                {/* Display data from backend */}
                {dataFromBackend && (
                    <div style={{ marginTop: '20px' }}>
                        <h3>Retrieved Data:</h3>
                        <pre>{JSON.stringify(dataFromBackend, null, 2)}</pre>
                    </div>
                )}
            </Col>
            <div>
                    <Button onClick={() => navigate('/chat')}>Let's git Analysis!</Button>
                </div>
        </Row>
    );
}

export default DataRetrieval;

