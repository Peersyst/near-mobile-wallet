export default abstract class Repository<T> {
    protected readonly storageKey: string;

    protected constructor(key: string) {
        this.storageKey = key;
    }

    protected abstract set(value: T): Promise<void>;

    protected abstract get(): Promise<T | undefined>;

    protected abstract clear(): Promise<void>;
}
