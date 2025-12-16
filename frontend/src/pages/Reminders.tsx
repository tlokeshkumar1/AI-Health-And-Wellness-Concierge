import { useState } from 'react';
import { useReminders } from '../hooks/useReminders';
import { useAuth } from '../context/AuthContext';
import type { Reminder } from '../api/remindersAPI';

const Reminders = () => {
  const { addReminders, loading, error, success } = useReminders();
  const { user } = useAuth();
  const [reminders, setReminders] = useState<Reminder[]>([
    { type: 'water', time: '09:00' }
  ]);

  const handleAddReminder = () => {
    setReminders(prev => [...prev, { type: 'water', time: '09:00' }]);
  };

  const handleRemoveReminder = (index: number) => {
    setReminders(prev => prev.filter((_, i) => i !== index));
  };

  const handleReminderChange = (index: number, field: keyof Reminder, value: string) => {
    setReminders(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('You must be logged in to create reminders');
      return;
    }
    
    try {
      await addReminders(user.id, reminders);
    } catch (err) {
      console.error('Failed to create reminders', err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Smart Reminders</h1>
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Create New Reminders</h2>
          
          {reminders.map((reminder, index) => (
            <div key={index} className="flex items-end space-x-4 mb-4 pb-4 border-b border-gray-200">
              <div className="flex-1">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Reminder Type
                </label>
                <select
                  value={reminder.type}
                  onChange={(e) => handleReminderChange(index, 'type', e.target.value as any)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="water">Water Reminder</option>
                  <option value="walking">Walking Break Reminder</option>
                  <option value="sleep">Sleep Reminder</option>
                  <option value="meal">Meal Reminder</option>
                </select>
              </div>
              
              <div className="flex-1">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Time
                </label>
                <input
                  type="time"
                  value={reminder.time}
                  onChange={(e) => handleReminderChange(index, 'time', e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              
              <div>
                <button
                  type="button"
                  onClick={() => handleRemoveReminder(index)}
                  className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          
          <button
            type="button"
            onClick={handleAddReminder}
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Another Reminder
          </button>
        </div>
        
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Reminders'}
          </button>
        </div>
      </form>
      
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Reminder Types</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li><strong>Water Reminder:</strong> Get notified to drink water at scheduled times</li>
          <li><strong>Walking Break Reminder:</strong> Gentle reminders to take walking breaks during sedentary periods</li>
          <li><strong>Sleep Reminder:</strong> Notifications to help you prepare for bedtime</li>
          <li><strong>Meal Reminder:</strong> Timely alerts for your meals to maintain eating schedule</li>
        </ul>
      </div>
    </div>
  );
};

export default Reminders;