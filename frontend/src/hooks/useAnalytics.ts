import { useState, useEffect } from 'react';
import { getWeeklyAnalytics } from '../api/analyticsAPI';
import type { WeeklyAnalyticsData } from '../types/WeeklyAnalytics';

export const useAnalytics = () => {
    const [analytics, setAnalytics] = useState<WeeklyAnalyticsData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchAnalytics = async (userId: string) => {
        setLoading(true);
        setError(null);
        try {
            const analyticsData = await getWeeklyAnalytics(userId);
            setAnalytics(analyticsData);
        } catch (err: any) {
            const errorMessage = err.response?.data?.detail || 'Failed to fetch analytics';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return { analytics, loading, error, fetchAnalytics };
};