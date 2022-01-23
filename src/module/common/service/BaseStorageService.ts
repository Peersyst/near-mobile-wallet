import * as SecureStorage from "expo-secure-store";
import AsyncStorage from '@react-native-async-storage/async-storage';
import isWeb from "utils/isWeb";

export abstract class BaseStorageService<T> {
    protected readonly STORAGE_KEY: string;

    protected constructor(key: string) {
        this.STORAGE_KEY = key;
    }

    async set(value: T): Promise<void> {
        return isWeb
            ? AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(value))
            : SecureStorage.setItemAsync(this.STORAGE_KEY, JSON.stringify(value));
    }

    async get(): Promise<T | null> {
        const item = await (isWeb ? AsyncStorage.getItem(this.STORAGE_KEY) : SecureStorage.getItemAsync(this.STORAGE_KEY));
        return item ? JSON.parse(item) : null;
    }

    async clear(): Promise<void> {
        return isWeb ? AsyncStorage.removeItem(this.STORAGE_KEY) : SecureStorage.deleteItemAsync(this.STORAGE_KEY);
    }
}
