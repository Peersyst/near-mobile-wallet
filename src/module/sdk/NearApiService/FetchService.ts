export class FetchService {
    protected async handleFetch<T>(url: string): Promise<T> {
        try {
            const response: Response = await fetch(url);
            switch (response.status) {
                case 200:
                    return (await response.json()) as Promise<T>;
                case 429:
                    throw new HttpError(429, "Too many requests");
                default:
                    throw new HttpError(response.status, response.statusText);
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new HttpError(500, error.message);
            }
            throw new HttpError(500, "Unknown error");
        }
    }
}

export class HttpError extends Error {
    code: number;
    constructor(code: number, message: string) {
        super(message);
        this.code = code;
    }
}
