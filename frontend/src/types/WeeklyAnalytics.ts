export interface WeeklyAnalyticsData {
    startDate: string;
    endDate: string;
    averageSleep: number;
    totalSteps: number;
    averageMoodScore: number;
    summaryText: string;
    chartPaths: string[];
}