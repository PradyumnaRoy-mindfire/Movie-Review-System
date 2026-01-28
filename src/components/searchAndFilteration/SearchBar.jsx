import { useState } from 'react';

function SearchBar({ searchQuery, onSearchChange }) {
    const [inputValue, setInputValue] = useState(searchQuery);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        
        // Debounce search ,wait for user to stop typing
        clearTimeout(window.searchTimeout);
        window.searchTimeout = setTimeout(() => {
            onSearchChange(value);
        }, 500);
    };

    return (
        <div className="w-[85%] mb-8 mt-4">
            <div className="relative">
                <svg 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                    />
                </svg>
                <input
                    type="text"
                    placeholder="Search for movies..."
                    value={inputValue}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-2 bg-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-800 placeholder-gray-500 text-lg shadow-lg"
                />
            </div>
        </div>
    );
}

export default SearchBar;