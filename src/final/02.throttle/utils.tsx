export function throttle<T extends (...args: Parameters<T>) => ReturnType<T>>(
    func: T,
    limit: number
) {
    let current = 0;
    return (...args: Parameters<T>) => {
        const now = Date.now();
        if (now - current >= limit) {
            console.log(`Throttling function call: ${current} -> ${now}`);
            current = now;
            func(...args);
        }
    }
}