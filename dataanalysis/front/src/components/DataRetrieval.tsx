import React, { useState } from 'react';
import { Input, Button, Spin, Row, Col, Table, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Navbar from './Logout';
import '../CSS/Retrieval.css';
import { saveAs } from 'file-saver';

const BACKEND_URL = 'http://localhost:5000';
const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function DataRetrieval() {
    
    const [naturalLanguageInput, setNaturalLanguageInput] = useState('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [dataFromBackend, setDataFromBackend] = useState<any>(null);
    const navigate = useNavigate();
    // Handle the data retrieval from backend
    const handleDataRetrieval = async () => {
        setIsLoading(true);
        
        if (!naturalLanguageInput) {
            message.error('Please enter a query.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(`${BACKEND_URL}/api/data-retrieval`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    message: naturalLanguageInput
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
    // Convert JSON data to CSV format
    const jsonToCsv = (jsonData: Array<{ [key: string]: any }>) => {
        const replacer = (_: string, value: any) => value === null ? '' : value;
        const header = Object.keys(jsonData[0]);
        const csv = [
            header.join(','),
            ...jsonData.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
        ].join('\r\n');
        return csv;
    }
    // Enable the CSV data download
    const downloadCsv = () => {
        const csvData = jsonToCsv(dataFromBackend);
        const blob = new Blob([csvData], { type: 'text/csv' });
        saveAs(blob, 'datafile.csv');
    }

    const determineRowKey = (record: { [key: string]: any }) => {
        const possibleKeys = ['customerid', 'customerName','phone','gender','age','merchantId','merchantName','orderid','merchantid', 'productid', 'productName','ordertime','quantity','amount','productId','productCategory,','unitPrice'];
        for (let key of possibleKeys) {
            if (record[key]) {
                return record[key].toString();
            }
        }
        return null;  // fallback
    };

    return (
       <div className="retrievalPage">
        <Navbar/>
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
                        onClick={handleDataRetrieval} 
                        disabled={isLoading}
                        style={{ marginTop: '20px' }}
                    >
                        {isLoading ? <Spin indicator={loadingIcon} /> : "Fetch Data"}
                    </Button>
                </div>

                {/* Display data from backend */}
                {dataFromBackend && (
                    <div style={{ marginTop: '20px' }}>
                        <h3>Retrieved Data:</h3>
                        <Table 
                            dataSource={dataFromBackend} 
                            columns={Object.keys(dataFromBackend[0]).map(key => ({
                                title: key,
                                dataIndex: key,
                                key: key
                            }))}
                            rowKey={determineRowKey}
                        />
                        
                        {/* Download CSV link */}
                        <Button style={{ marginTop: '20px' }} onClick={downloadCsv}>Download as CSV</Button>
                    </div>
                )}
            </Col>
            <div>
                <Button onClick={() => navigate('/chat')}>Let's git Analysis!</Button>
            </div>
        </Row>
       </div>
    );
}

export default DataRetrieval;