import { IMnemonicRepository } from "refactor/domain/adapter/repository/IMnemonicRepository";
import { IMnemonicController } from "refactor/ui/adapter/controllers/IMnemonicController";
// @ts-ignore
import * as bip39 from "bip39";
import DomainEvents from "refactor/domain/events";

export default class MnemonicController implements IMnemonicController {
    constructor(private readonly mnemonicRepository: IMnemonicRepository) {}

    onInit(): void {
        // Listen for logout event to remove the Mnemonic
        DomainEvents.auth.on("logout", () => {
            this.removeMnemonic();
        });
    }

    /**
     * Set the Mnemonic.
     * @param Mnemonic
     */
    setMnemonic(mnemonic: string): Promise<void> {
        return this.mnemonicRepository.setMnemonic(mnemonic);
    }

    /**
     * get the Mnemonic.
     * @param Mnemonic
     */
    getMnemonic(): Promise<string | undefined> {
        return this.mnemonicRepository.getMnemonic();
    }

    /**
     * clear the Mnemonic.
     * @param Mnemonic
     */
    removeMnemonic(): Promise<void> {
        return this.mnemonicRepository.removeMnemonic();
    }

    /**
     * Checks if the given Mnemonic is correct
     * @param Mnemonic
     */
    async validateMnemonic(mnemonic: string): Promise<boolean> {
        return bip39.validateMnemonic(mnemonic);
    }
}
