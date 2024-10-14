import * as URL from "url";

export const getHostFromUrl = (url: string): string | null => {
    try {
        return URL.parse(url).host;
    } catch (error) {
        return null;
    }
};
