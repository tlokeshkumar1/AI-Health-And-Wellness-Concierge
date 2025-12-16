import apiClient from './apiClient';
import type { DailyPlan } from '../types/DailyPlan';

export const getDailyPlan = async (date: string, location: string = "New York"): Promise<DailyPlan> => {
    const response = await apiClient.get(`/plan?date=${date}&location=${encodeURIComponent(location)}`);
    const data = response.data;
    
    // Transform backend response to frontend type
    return {
        date: data.date,
        hydrationGoal: data.hydration_goal,
        workout: data.workout,
        meals: data.meals,
        breakReminders: data.break_reminders,
        moodSupport: data.mood_support,
        sleepTip: data.sleep_tip,
        weatherTip: data.weather_tip,
        disclaimer: data.disclaimer
    };
};