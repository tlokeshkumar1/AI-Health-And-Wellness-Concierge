import { useState } from 'react';
import { createReminders, scheduleFromPlan, type Reminder } from '../api/remindersAPI';

export const useReminders = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const addReminders = async (userId: string, reminders: Reminder[]) => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const result = await createReminders(userId, reminders);
            setSuccess(`Successfully created ${result.created} reminders`);
            return result;
        } catch (err: any) {
            const errorMessage = err.response?.data?.detail || 'Failed to create reminders';
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const scheduleFromDailyPlan = async (planData: any) => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const result = await scheduleFromPlan(planData);
            setSuccess(`Successfully scheduled ${result.scheduled} reminders`);
            return result;
        } catch (err: any) {
            const errorMessage = err.response?.data?.detail || 'Failed to schedule reminders from plan';
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { addReminders, scheduleFromDailyPlan, loading, error, success };
};