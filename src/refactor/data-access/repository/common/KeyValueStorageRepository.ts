import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyValueRepository } from "./KeyValueRepository";

export default class KeyValueStorageRepository<Def extends Record<string, any>> extends KeyValueRepository<Def> {
    protected set<K extends keyof Def>(key: K, value: Def[K]): Promise<void> {
        return AsyncStorage.setItem(this.buildKey(key), JSON.stringify(value));
    }

    protected async get<K extends keyof Def>(key: K): Promise<Def[K] | undefined> {
        const item = await AsyncStorage.getItem(this.buildKey(key));

        return item ? JSON.parse(item) : undefined;
    }

    protected async getKeys(): Promise<(keyof Def)[]> {
        const keys = await AsyncStorage.getAllKeys();

        return keys.filter((key) => key.startsWith(`${this.storageKey}-`)) as (keyof Def)[];
    }

    protected async clearKey(key: keyof Def): Promise<void> {
        return AsyncStorage.removeItem(this.buildKey(key));
    }

    protected async clearKeys(keys: (keyof Def)[]): Promise<void> {
        return AsyncStorage.multiRemove(keys.map((key) => this.buildKey(key)));
    }

    protected async clear(): Promise<void> {
        const keys = await this.getKeys();

        return AsyncStorage.multiRemove(keys as string[]);
    }
}
