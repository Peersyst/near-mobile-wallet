export interface IPinRepository {
    getPin(): Promise<string | undefined>;
    setPin(token: string): Promise<void>;
    removePin(): Promise<void>;
}
