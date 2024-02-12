/**
 * Forwards the resolution of an object
 * @param resolve
 */
export default function forward<T>(resolve: () => T): T {
    return new Proxy(
        {},
        {
            get: (_target, key) => {
                return resolve()[key as keyof T];
            },
        },
    ) as T;
}
