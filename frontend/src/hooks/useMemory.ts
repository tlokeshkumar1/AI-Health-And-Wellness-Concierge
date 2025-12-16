import { useState, useEffect } from 'react';
import { getUserMemory } from '../api/memoryAPI';
import type { MemoryData } from '../api/memoryAPI';

export const useMemory = () => {
    const [memory, setMemory] = useState<MemoryData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchMemory = async () => {
        setLoading(true);
        setError(null);
        try {
            const memoryData = await getUserMemory();
            setMemory(memoryData);
        } catch (err: any) {
            const errorMessage = err.response?.data?.detail || 'Failed to fetch memory data';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return { memory, loading, error, fetchMemory };
};