import apiClient from './apiClient';
import type { DailyLogEntry } from '../types/DailyLog';

export const submitDailyLog = async (logData: DailyLogEntry) => {
    // Transform frontend data to match backend schema
    const backendData = {
        date: logData.date,
        sleep_hours: logData.sleepHours,
        steps: logData.steps,
        meals: logData.meals,
        water_intake: logData.waterIntake,
        mood: logData.mood,
        notes: logData.notes
    };
    
    const response = await apiClient.post('/logs', backendData);
    return response.data;
};