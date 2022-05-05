import * as SecureStorage from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import isWeb from "utils/isWeb";

export abstract class BaseStorageService<S = any, U = any> {
    protected readonly STORAGE_KEY: string;
    protected readonly SECURE_STORAGE_KEY: string;

    protected constructor(key: string) {
        this.STORAGE_KEY = key;
        this.SECURE_STORAGE_KEY = key + "_SECURE";
    }

    async set(value: U): Promise<void> {
        return AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(value));
    }

    async setSecure(value: S): Promise<void> {
        return isWeb
            ? AsyncStorage.setItem(this.SECURE_STORAGE_KEY, JSON.stringify(value))
            : SecureStorage.setItemAsync(this.SECURE_STORAGE_KEY, JSON.stringify(value));
    }

    async get(): Promise<U | null> {
        const item = await AsyncStorage.getItem(this.STORAGE_KEY);
        return item ? JSON.parse(item) : null;
    }

    async getSecure(): Promise<S | null> {
        const item = await (isWeb ? AsyncStorage.getItem(this.SECURE_STORAGE_KEY) : SecureStorage.getItemAsync(this.SECURE_STORAGE_KEY));
        return item ? JSON.parse(item) : null;
    }

    async clear(): Promise<void> {
        return AsyncStorage.removeItem(this.STORAGE_KEY);
    }

    async clearSecure(): Promise<void> {
        return isWeb ? AsyncStorage.removeItem(this.SECURE_STORAGE_KEY) : SecureStorage.deleteItemAsync(this.SECURE_STORAGE_KEY);
    }

    async clearAll(): Promise<void> {
        await this.clear();
        await this.clearSecure();
    }
}
