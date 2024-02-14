import { config } from "refactor/common/config";
import SecureStorageRepository from "../common/SecureStorageRepository";
import { IPinRepository } from "refactor/domain/adapter/repository/IPinRepository";

export default class PinRepository extends SecureStorageRepository<string> implements IPinRepository {
    constructor() {
        super(`${config.projectName}-pin`);
    }

    /**
     * Gets the PIN
     */
    async getPin(): Promise<string | undefined> {
        return await this.get();
    }

    /**
     * Sets thePIN
     * @param pin
     */
    async setPin(pin: string): Promise<void> {
        return this.set(pin);
    }

    /**
     * Removes the PIN
     */
    async removePin(): Promise<void> {
        this.clear();
    }
}
