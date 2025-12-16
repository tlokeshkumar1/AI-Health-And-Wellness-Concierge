// Placeholder for chart utilities if needed
export const calculateAverage = (data: number[]): number => {
    if (data.length === 0) return 0;
    const sum = data.reduce((a, b) => a + b, 0);
    return sum / data.length;
};
