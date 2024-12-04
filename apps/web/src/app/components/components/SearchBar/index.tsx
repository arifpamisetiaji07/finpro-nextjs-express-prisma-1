import React, { useState, useEffect } from "react";

interface SearchBarProps {
  placeholder?: string; // Opsional untuk mengganti teks placeholder
  onSearch: (query: string) => void; // Callback untuk mengirim query ke parent
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Search events...", onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>(""); // State untuk query input
  const [debouncedTerm, setDebouncedTerm] = useState<string>(""); // State untuk debounce value

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm); // Meng-update debouncedTerm setelah delay
    }, 300); // Delay 300ms untuk debounce

    return () => {
      clearTimeout(timer); // Membersihkan timer setiap kali input berubah
    };
  }, [searchTerm]);

  useEffect(() => {
    onSearch(debouncedTerm); // Mengirim query ke parent setiap kali debounce selesai
  }, [debouncedTerm, onSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value); // Update state query input
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <div className="absolute right-3 top-2 text-gray-500">
        {/* Optional Icon (Search Icon) */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1117.5 7.5a7.5 7.5 0 01-4.35 9.15z" />
        </svg>
      </div>
    </div>
  );
};

export default SearchBar;
