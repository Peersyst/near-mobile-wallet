import AsyncStorage from "@react-native-async-storage/async-storage";
import Repository from "./Repository";

export default class StorageRepository<T> extends Repository<T> {
    protected set(value: T): Promise<void> {
        return AsyncStorage.setItem(this.storageKey, JSON.stringify(value));
    }

    protected async get(): Promise<T | undefined> {
        const item = await AsyncStorage.getItem(this.storageKey);
        return item ? JSON.parse(item) : undefined;
    }

    protected clear(): Promise<void> {
        return AsyncStorage.removeItem(this.storageKey);
    }
}
