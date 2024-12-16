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
  }, [fetchContracts, searchFilters]);

  const handleSearch = (filters) => {
    setSearchFilters(filters);
  };

  const handleContractCreated = () => {
    setShowForm(false);
    fetchContracts(searchFilters);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/4 p-4 bg-white shadow-md rounded-lg mb-4 md:mb-0 md:mr-4">
        <h2 className="text-xl font-bold mb-4">Search Contracts</h2>
        <SearchFilter onSearch={handleSearch} />
      </div>
      <div className="w-full md:w-3/4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Contracts</h2>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200"
            >
              {showForm ? 'Hide Form' : 'Add New Contract'}
            </button>
          </div>
          {showForm && <ContractForm onContractCreated={handleContractCreated} />}
          {isLoading ? (
            <p className="text-center">Loading contracts...</p>
          ) : (
            <ContractList contracts={contracts} onContractUpdated={fetchContracts} />
          )}
        </div>
      </div>
    </div>
  );
}

