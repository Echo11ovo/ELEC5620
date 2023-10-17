import React, { useState } from 'react';

function DataRetrieval() {
    const [naturalLanguageInput, setNaturalLanguageInput] = useState('');
    const [selectedDataRange, setSelectedDataRange] = useState('Option1');  // default selection

    const handleNaturalLanguageSubmit = async () => {
        try {
            const response = await fetch('/api/data-retrieval/natural-language', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: naturalLanguageInput
                })
            });
            const data = await response.json();
            // Handle the data received from the backend
        } catch (error) {
            console.error('Error fetching data using natural language:', error);
        }
    };
    

    const handleDropdownSelection = async () => {
        try {
            const response = await fetch(`/api/data-retrieval/selected-range?range=${selectedDataRange}`, {
                method: 'GET'
            });
            const data = await response.json();
            // Handle the data received from the backend
        } catch (error) {
            console.error('Error fetching data using dropdown selection:', error);
        }
    };
    

    return (
        <div>
            <h2>Data Retrieval</h2>
            
            {/* Natural Language Input */}
            <div>
                <h3>Use Natural Language</h3>
                <input 
                    type="text" 
                    value={naturalLanguageInput} 
                    onChange={(e) => setNaturalLanguageInput(e.target.value)}
                    placeholder="Describe the data you want..."
                />
                <button onClick={handleNaturalLanguageSubmit}>Fetch Data</button>
            </div>

            {/* Dropdown Selection */}
            <div>
                <h3>Select Data Range</h3>
                <select 
                    value={selectedDataRange} 
                    onChange={(e) => setSelectedDataRange(e.target.value)}
                >
                    <option value="Option1">Option 1</option>
                    <option value="Option2">Option 2</option>
                    <option value="Option3">Option 3</option>
                    {/* Add more options as needed */}
                </select>
                <button onClick={handleDropdownSelection}>Fetch Data</button>
            </div>
        </div>
    );
}

export default DataRetrieval;
