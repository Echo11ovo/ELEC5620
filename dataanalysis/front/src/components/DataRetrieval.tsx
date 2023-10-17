import React, { useState } from 'react';

function DataRetrieval() {
    const [naturalLanguageInput, setNaturalLanguageInput] = useState('');
    const [selectedDataRange, setSelectedDataRange] = useState('Option1');  // default selection

    const handleNaturalLanguageSubmit = () => {
        // Here, send the naturalLanguageInput to the backend to process and fetch data
        console.log('Fetching data for:', naturalLanguageInput);
    };

    const handleDropdownSelection = () => {
        // Here, fetch data based on the selectedDataRange from the dropdown
        console.log('Fetching data for:', selectedDataRange);
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
