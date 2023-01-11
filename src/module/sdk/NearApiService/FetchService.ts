export class FetchService {
    protected async handleFetch<T>(url: string): Promise<T> {
        const response: Response = await fetch(url);
        if (response.status !== 200) throw new Error(`Error ${response.status} ${response.statusText}`);
        const data = await response.json();
        return data as T;
    }
}
