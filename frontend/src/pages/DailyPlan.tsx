import { useState, useEffect } from 'react';
import { usePlan } from '../hooks/usePlan';
import { useReminders } from '../hooks/useReminders';
import { useAuth } from '../context/AuthContext';

const DailyPlan = () => {
  const { plan, loading, error, fetchPlan, refreshWeather } = usePlan();
  const { scheduleFromDailyPlan, loading: remindersLoading, error: remindersError, success: remindersSuccess } = useReminders();
  const { user } = useAuth();
  const [location, setLocation] = useState("New York");
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    fetchPlan(today, location);
  }, []);

  const handleGeneratePlan = () => {
    fetchPlan(today, location);
  };

  const handleRefreshWeather = () => {
    refreshWeather(today, location);
  };

  const handleScheduleReminders = async () => {
    if (plan && user) {
      try {
        await scheduleFromDailyPlan({
          ...plan,
          user_id: user.id
        });
      } catch (err) {
        console.error('Failed to schedule reminders', err);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Daily Wellness Plan</h1>
      
      <div className="mb-6 flex items-end space-x-4">
        <div className="flex-1">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
            Location
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          onClick={handleGeneratePlan}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
        >
          Generate Today's Plan
        </button>
        {plan && (
          <button
            onClick={handleScheduleReminders}
            disabled={remindersLoading}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            {remindersLoading ? 'Scheduling...' : 'Schedule Reminders'}
          </button>
        )}
      </div>
      
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {remindersError && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          {remindersError}
        </div>
      )}
      
      {remindersSuccess && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
          {remindersSuccess}
        </div>
      )}
      
      {plan && !loading && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-b pb-4 md:border-b-0 md:border-r md:pr-6 md:pb-0">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Hydration Goal</h2>
              <p className="text-gray-700">{plan.hydrationGoal}</p>
            </div>
            
            <div className="border-b pb-4 md:border-b-0 md:pl-6 md:pb-0">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Sleep Tip</h2>
              <p className="text-gray-700">{plan.sleepTip}</p>
            </div>
            
            <div className="border-b pb-4 md:border-b-0 md:border-r md:pr-6 md:pb-0 md:pt-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Workout Suggestion</h2>
              <p className="text-gray-700">{plan.workout}</p>
            </div>
            
            <div className="md:pl-6 md:pt-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Weather-Based Walking Plan</h2>
              <p className="text-gray-700">{plan.weatherTip}</p>
              <button
                onClick={handleRefreshWeather}
                className="mt-2 text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-3 rounded focus:outline-none focus:shadow-outline"
              >
                Refresh Weather
              </button>
            </div>
          </div>
          
          <div className="mt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Meal Suggestions</h2>
            <p className="text-gray-700">{plan.meals}</p>
          </div>
          
          <div className="mt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Break Reminders</h2>
            <ul className="list-disc pl-5 space-y-2">
              {plan.breakReminders.map((reminder, index) => (
                <li key={index} className="text-gray-700">{reminder}</li>
              ))}
            </ul>
          </div>
          
          <div className="mt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Stress Management Tip</h2>
            <p className="text-gray-700">{plan.moodSupport}</p>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500 italic">{plan.disclaimer}</p>
          </div>
        </div>
      )}
      
      {!plan && !loading && !error && (
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <p className="text-gray-700">Click "Generate Today's Plan" to get your personalized wellness plan.</p>
        </div>
      )}
    </div>
  );
};

export default DailyPlan;