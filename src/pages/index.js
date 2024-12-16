import { useState, useEffect, useCallback } from 'react';
import ContractForm from '../components/ContractForm';
import ContractList from '../components/ContractList';
import SearchFilter from '../components/SearchFilter';

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [contracts, setContracts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchFilters, setSearchFilters] = useState({});

  const fetchContracts = useCallback(async (filters = {}) => {
    setIsLoading(true);
    const queryString = new URLSearchParams(filters).toString();
    const res = await fetch(`/api/contracts/search?${queryString}`);
    const data = await res.json();
    setContracts(data.data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchContracts(searchFilters);
    // Initialize socket connection
    fetch('/api/socket');
  }, [fetchContracts, searchFilters]);

  const handleSearch = (filters) => {
    setSearchFilters(filters);
  };

  const handleContractCreated = () => {
    setShowForm(false);
    fetchContracts(searchFilters);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Contract Management System</h1>
      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {showForm ? 'Hide Form' : 'Add New Contract'}
      </button>
      {showForm && <ContractForm onContractCreated={handleContractCreated} />}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Search Contracts</h2>
        <SearchFilter onSearch={handleSearch} />
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Contract List</h2>
        {isLoading ? (
          <p>Loading contracts...</p>
        ) : (
          <ContractList contracts={contracts} onContractUpdated={fetchContracts} />
        )}
      </div>
    </div>
  );
}

