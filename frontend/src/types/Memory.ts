export interface MemoryData {
    habits: {
        name: string;
        frequency: string;
        streak: number;
    }[];
    preferences: Record<string, any>;
    history: {
        date: string;
        summary: string;
    }[];
}
