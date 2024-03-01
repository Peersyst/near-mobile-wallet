export class FetchService {
    protected async handleFetch<T>(url: string): Promise<T> {
        try {
            const response: Response = await fetch(url);
            switch (response.status) {
                case 200:
                    return (await response.json()) as Promise<T>;
                case 429:
                    throw new FetchError(429, "Too many requests");
                default:
                    throw new FetchError(response.status, response.statusText);
            }
        } catch (error: unknown) {
            if (error instanceof FetchError) {
                throw error;
            } else if (error instanceof Error) {
                throw new FetchError(500, error.message);
            }
            throw new FetchError(500, "Unknown error");
        }
    }
}

export class FetchError extends Error {
    code: number;
    constructor(code: number, message: string) {
        super(message);
        this.code = code;
    }
}
