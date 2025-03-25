import * as URL from "url";

export const getHostFromUrl = (url: string): string | null => {
    try {
        const host = URL.parse(url).host;
        if (host?.includes(".")) {
            const parts = host.split(".");
            return parts.slice(parts.length - 2).join(".");
        }
        return host;
    } catch (error) {
        return null;
    }
};
