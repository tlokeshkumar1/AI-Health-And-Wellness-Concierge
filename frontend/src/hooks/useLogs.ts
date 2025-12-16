import { useState } from 'react';
import { submitDailyLog } from '../api/logsAPI';
import type { DailyLogEntry } from '../types/DailyLog';

export const useLogs = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submitLog = async (logData: DailyLogEntry) => {
        setLoading(true);
        setError(null);
        try {
            const result = await submitDailyLog(logData);
            return result;
        } catch (err: any) {
            const errorMessage = err.response?.data?.detail || 'Failed to submit log';
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { submitLog, loading, error };
};