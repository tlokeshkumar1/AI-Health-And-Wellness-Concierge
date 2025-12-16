export const isValidEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

export const isNotEmpty = (value: string): boolean => {
    return value.trim().length > 0;
};
