import { useState, useEffect } from 'react';
import { useAnalytics } from '../hooks/useAnalytics';
import { useAuth } from '../context/AuthContext';

const WeeklyAnalytics = () => {
  const { analytics, loading, error, fetchAnalytics } = useAnalytics();
  const { user } = useAuth();
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (user) {
      fetchAnalytics(user.id);
    }
  }, [user, retryCount]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Weekly Analytics</h1>
      
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          <p>{error}</p>
          <button
            onClick={handleRetry}
            className="mt-2 bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded focus:outline-none focus:shadow-outline"
          >
            Retry
          </button>
        </div>
      )}
      
      {analytics && !loading && (
        <div className="space-y-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Weekly Summary</h2>
            <p className="text-gray-700">{analytics.summaryText}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800">Average Sleep</h3>
                <p className="text-2xl font-bold text-blue-600">{analytics.averageSleep.toFixed(1)} hours</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800">Total Steps</h3>
                <p className="text-2xl font-bold text-green-600">{analytics.totalSteps.toLocaleString()}</p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800">Average Mood Score</h3>
                <p className="text-2xl font-bold text-purple-600">{analytics.averageMoodScore.toFixed(1)}/5</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Weekly Trends</h2>
            {analytics.chartPaths && analytics.chartPaths.length > 0 ? (
              <div className="space-y-6">
                {analytics.chartPaths.map((chartPath, index) => (
                  <div key={index} className="border rounded-lg overflow-hidden">
                    <img 
                      src={`http://localhost:8000${chartPath}`} 
                      alt={`Chart ${index + 1}`} 
                      className="w-full h-auto"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNoYXJ0IGltYWdlIGhlcmU8L3RleHQ+PC9zdmc+';
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No charts available for this week.</p>
            )}
          </div>
        </div>
      )}
      
      {!analytics && !loading && !error && user && (
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <p className="text-gray-700">No analytics data available. Start logging your daily activities to see insights.</p>
        </div>
      )}
    </div>
  );
};

export default WeeklyAnalytics;