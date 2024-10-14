export function cleanURL(url: string): string {
    if (url.startsWith("http://")) {
        return url.replace("http://", "https://");
    } else if (url.startsWith("https://")) {
        return url;
    } else {
        return `https://www.google.com/search?q=${url}`;
    }
}
