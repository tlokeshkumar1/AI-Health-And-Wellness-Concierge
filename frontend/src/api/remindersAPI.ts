import apiClient from './apiClient';

export interface Reminder {
    type: 'water' | 'walking' | 'sleep' | 'meal';
    time: string; // HH:MM format
}

export const createReminders = async (userId: string, reminders: Reminder[]) => {
    // Transform reminders to simple strings as expected by backend
    const reminderStrings = reminders.map(r => `${r.type} reminder at ${r.time}`);
    
    const response = await apiClient.post('/reminders', {
        user_id: userId,
        reminders: reminderStrings
    });
    return response.data;
};

export const scheduleFromPlan = async (planData: any) => {
    const response = await apiClient.post('/reminders/schedule-from-plan', planData);
    return response.data;
};