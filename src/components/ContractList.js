import { useRouter } from 'next/router';

export default function ContractList({ contracts, onContractUpdated }) {
  const router = useRouter();

  const handleEdit = (id) => {
    router.push(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contract?')) {
      await fetch(`/api/contracts/${id}`, { method: 'DELETE' });
      onContractUpdated();
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content Preview</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {contracts.map((contract) => (
            <tr key={contract._id} className="hover:bg-gray-50 transition duration-150">
              <td className="px-6 py-4 whitespace-nowrap">{contract.clientName}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  contract.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                }`}>
                  {contract.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{contract.content.substring(0, 50)}...</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button onClick={() => handleEdit(contract._id)} className="text-indigo-600 hover:text-indigo-900 mr-4 transition duration-150">Edit</button>
                <button onClick={() => handleDelete(contract._id)} className="text-red-600 hover:text-red-900 transition duration-150">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {contracts.length === 0 && (
        <p className="text-center mt-4 text-gray-500">No contracts found.</p>
      )}
    </div>
  );
}

