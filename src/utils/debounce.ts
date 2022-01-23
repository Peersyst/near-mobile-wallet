export interface Cancelable {
    clear(): void;
}

export function debounce<T extends (...args: any[]) => any>(func: T, wait = 166) {
    let timeout: NodeJS.Timeout;

    function debounced(...args: any[]) {
        const later = () => {
            func.apply(null, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    }

    debounced.clear = () => {
        clearTimeout(timeout);
    };

    return debounced;
}
