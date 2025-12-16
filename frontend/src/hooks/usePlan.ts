import { useState, useEffect } from 'react';
import { getDailyPlan } from '../api/planAPI';
import type { DailyPlan } from '../types/DailyPlan';

export const usePlan = () => {
    const [plan, setPlan] = useState<DailyPlan | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPlan = async (date: string, location: string = "New York") => {
        setLoading(true);
        setError(null);
        try {
            const planData = await getDailyPlan(date, location);
            setPlan(planData);
        } catch (err: any) {
            const errorMessage = err.response?.data?.detail || 'Failed to fetch plan';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const refreshWeather = async (date: string, location: string = "New York") => {
        // This is the same as fetchPlan since the backend fetches weather on each request
        await fetchPlan(date, location);
    };

    return { plan, loading, error, fetchPlan, refreshWeather };
};