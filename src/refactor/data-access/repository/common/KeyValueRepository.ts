export abstract class KeyValueRepository<Def extends Record<string, any>> {
    protected readonly storageKey: string;

    protected constructor(key: string) {
        this.storageKey = key;
    }

    protected buildKey(key: keyof Def): string {
        return `${this.storageKey}-${key as string}`;
    }

    protected abstract set<K extends keyof Def>(key: K, value: Def[K]): Promise<void>;

    protected abstract get<K extends keyof Def>(key: K): Promise<Def[K] | undefined>;

    protected abstract getKeys(): Promise<(keyof Def)[]>;

    protected abstract clearKey(key: keyof Def): Promise<void>;

    protected abstract clearKeys(key: (keyof Def)[]): Promise<void>;

    protected abstract clear(): Promise<void>;
}
