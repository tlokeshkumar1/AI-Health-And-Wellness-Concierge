import apiClient from './apiClient';
import type { WeeklyAnalyticsData } from '../types/WeeklyAnalytics';

export const getWeeklyAnalytics = async (userId: string): Promise<WeeklyAnalyticsData> => {
    const response = await apiClient.get(`/analytics/weekly?user_id=${userId}`);
    const data = response.data;
    
    // Transform backend response to frontend type
    return {
        startDate: data.start_date,
        endDate: data.end_date,
        averageSleep: data.average_sleep,
        totalSteps: data.total_steps,
        averageMoodScore: data.average_mood_score,
        summaryText: data.summary_text,
        chartPaths: data.chart_paths
    };
};