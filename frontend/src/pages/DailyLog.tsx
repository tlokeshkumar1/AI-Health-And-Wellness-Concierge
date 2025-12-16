import { useState, useEffect } from 'react';
import { useLogs } from '../hooks/useLogs';
import { useAutoSave } from '../hooks/useAutoSave';
import type { DailyLogEntry } from '../types/DailyLog';

const DailyLog = () => {
  const { submitLog, loading, error } = useLogs();
  const [formData, setFormData] = useState<DailyLogEntry>({
    date: new Date().toISOString().split('T')[0],
    sleepHours: 0,
    steps: 0,
    meals: ['', '', ''],
    waterIntake: 0,
    mood: 'neutral',
    notes: ''
  });
  const [message, setMessage] = useState<string | null>(null);
  
  // Auto-save functionality
  const { isSaving, lastSaved, loadSavedData, clearSavedData } = useAutoSave<DailyLogEntry>(
    'dailyLogDraft',
    formData,
    2000 // Save every 2 seconds
  );

  // Load saved data on component mount
  useEffect(() => {
    const savedData = loadSavedData();
    if (savedData) {
      setFormData(savedData);
      setMessage('Draft loaded from auto-save');
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'sleepHours' || name === 'steps' || name === 'waterIntake' 
        ? Number(value) 
        : value
    }));
  };

  const handleMealChange = (index: number, value: string) => {
    const newMeals = [...formData.meals];
    newMeals[index] = value;
    setFormData(prev => ({
      ...prev,
      meals: newMeals
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitLog(formData);
      setMessage('Log submitted successfully! View your personalized plan now.');
      // Clear saved data after successful submission
      clearSavedData();
      // Reset form except for date
      setFormData(prev => ({
        ...prev,
        sleepHours: 0,
        steps: 0,
        meals: ['', '', ''],
        waterIntake: 0,
        mood: 'neutral',
        notes: ''
      }));
    } catch (err) {
      setMessage('Failed to submit log. Please try again.');
    }
  };

  const handleClearDraft = () => {
    clearSavedData();
    setFormData({
      date: new Date().toISOString().split('T')[0],
      sleepHours: 0,
      steps: 0,
      meals: ['', '', ''],
      waterIntake: 0,
      mood: 'neutral',
      notes: ''
    });
    setMessage('Draft cleared');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Daily Log</h1>
      
      <div className="mb-4 flex items-center justify-between">
        <div>
          {message && (
            <div className={`p-2 rounded ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {message}
              {message.includes('successfully') && (
                <span className="ml-2">
                  <a href="/plan" className="text-blue-600 hover:text-blue-800 underline">View Plan</a>
                </span>
              )}
            </div>
          )}
          
          {isSaving && (
            <div className="text-sm text-blue-600 mt-1">
              Saving draft...
            </div>
          )}
          
          {lastSaved && !isSaving && (
            <div className="text-sm text-gray-500 mt-1">
              Draft saved at {lastSaved.toLocaleTimeString()}
            </div>
          )}
        </div>
        
        <button
          onClick={handleClearDraft}
          className="bg-gray-500 hover:bg-gray-700 text-white py-1 px-3 rounded text-sm focus:outline-none focus:shadow-outline"
        >
          Clear Draft
        </button>
      </div>
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sleepHours">
            Sleep Hours
          </label>
          <input
            type="number"
            id="sleepHours"
            name="sleepHours"
            value={formData.sleepHours}
            onChange={handleChange}
            min="0"
            max="24"
            step="0.5"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="steps">
            Steps
          </label>
          <input
            type="number"
            id="steps"
            name="steps"
            value={formData.steps}
            onChange={handleChange}
            min="0"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Meals
          </label>
          {formData.meals.map((meal, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Meal ${index + 1}`}
              value={meal}
              onChange={(e) => handleMealChange(index, e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
            />
          ))}
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="waterIntake">
            Water Intake (Liters)
          </label>
          <input
            type="number"
            id="waterIntake"
            name="waterIntake"
            value={formData.waterIntake}
            onChange={handleChange}
            min="0"
            step="0.1"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mood">
            Mood
          </label>
          <select
            id="mood"
            name="mood"
            value={formData.mood}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="happy">Happy</option>
            <option value="energetic">Energetic</option>
            <option value="neutral">Neutral</option>
            <option value="tired">Tired</option>
            <option value="sad">Sad</option>
            <option value="stressed">Stressed</option>
          </select>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="notes">
            Notes (Optional)
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={3}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Log'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DailyLog;