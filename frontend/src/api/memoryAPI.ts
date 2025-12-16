import apiClient from './apiClient';

export interface MemoryData {
    userId: string;
    habits: string[];
    lastUpdated: string; // ISO date string
}

export const getUserMemory = async (): Promise<MemoryData> => {
    const response = await apiClient.get('/memory');
    const data = response.data;
    
    // Transform backend response to frontend type
    return {
        userId: data.user_id,
        habits: data.habits,
        lastUpdated: data.last_updated
    };
};