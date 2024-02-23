import * as SecureStorage from "expo-secure-store";
import Repository from "./Repository";

export default class SecureStorageRepository<T> extends Repository<T> {
    protected set(value: T): Promise<void> {
        return SecureStorage.setItemAsync(this.storageKey, JSON.stringify(value));
    }

    protected async get(): Promise<T | undefined> {
        const item = await SecureStorage.getItemAsync(this.storageKey);
        return item ? JSON.parse(item) : undefined;
    }

    protected clear(): Promise<void> {
        return SecureStorage.deleteItemAsync(this.storageKey);
    }
}
