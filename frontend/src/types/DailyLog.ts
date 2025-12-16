export interface DailyLogEntry {
    date: string; // YYYY-MM-DD
    sleepHours: number;
    steps: number;
    meals: string[];
    waterIntake: number; // in liters
    mood: string; // Will use a select dropdown
    notes?: string;
}