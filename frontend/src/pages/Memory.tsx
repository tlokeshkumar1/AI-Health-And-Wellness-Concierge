import { useState, useEffect } from 'react';
import { useMemory } from '../hooks/useMemory';

const Memory = () => {
  const { memory, loading, error, fetchMemory } = useMemory();
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    fetchMemory();
  }, [retryCount]);

  const handleRefresh = () => {
    setRetryCount(prev => prev + 1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Habit Memory</h1>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
        >
          Refresh
        </button>
      </div>
      
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          <p>{error}</p>
          <button
            onClick={handleRefresh}
            className="mt-2 bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded focus:outline-none focus:shadow-outline"
          >
            Retry
          </button>
        </div>
      )}
      
      {memory && !loading && (
        <div className="space-y-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Detected Habits</h2>
            {memory.habits.length > 0 ? (
              <ul className="list-disc pl-5 space-y-2">
                {memory.habits.map((habit, index) => (
                  <li key={index} className="text-gray-700">{habit}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No habits detected yet. Continue logging your daily activities to help the AI learn your patterns.</p>
            )}
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Memory Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800">User ID</h3>
                <p className="text-gray-700 break-all">{memory.userId}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800">Last Updated</h3>
                <p className="text-gray-700">
                  {new Date(memory.lastUpdated).toLocaleString()}
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
                <h3 className="font-semibold text-gray-800">Habit Count</h3>
                <p className="text-2xl font-bold text-blue-600">{memory.habits.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">About Habit Memory</h2>
            <p className="text-gray-700 mb-4">
              The AI analyzes your daily logs to identify patterns and habits. This helps provide more personalized recommendations over time.
            </p>
            <p className="text-gray-700">
              Habits are detected based on consistent patterns in your sleep, activity, hydration, and mood data. 
              The system updates these insights as you continue to log your activities.
            </p>
          </div>
        </div>
      )}
      
      {!memory && !loading && !error && (
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <p className="text-gray-700">No memory data available. Start logging your daily activities to build your habit profile.</p>
        </div>
      )}
    </div>
  );
};

export default Memory;