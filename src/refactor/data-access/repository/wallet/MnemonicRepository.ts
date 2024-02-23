import { config } from "refactor/common/config";
import SecureStorageRepository from "../common/SecureStorageRepository";
import { IMnemonicRepository } from "refactor/domain/adapter/repository/IMnemonicRepository";

export default class MnemonicRepository extends SecureStorageRepository<string> implements IMnemonicRepository {
    constructor() {
        super(`${config.projectName}-mnemonic`);
    }

    /**
     * Get the Mnemonic
     */
    async getMnemonic(): Promise<string | undefined> {
        return await this.get();
    }

    /**
     * Sets the Mnemonic
     * @param Mnemonic
     */
    async setMnemonic(mnemonic: string): Promise<void> {
        return this.set(mnemonic);
    }

    /**
     * Remove the Mnemonic
     */
    async removeMnemonic(): Promise<void> {
        this.clear();
    }
}
