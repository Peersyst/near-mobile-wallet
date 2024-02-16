import { IMnemonicRepository } from "refactor/domain/adapter/repository/IMnemonicRepository";
import DomainError from "refactor/domain/error/DomainError";
import { IMnemonicController } from "refactor/ui/adapter/controllers/IMnemonicController";
import AuthErrorCodes from "../AuthErrorCodes";
// @ts-ignore
import * as bip39 from "bip39";

export default class MnemonicController implements IMnemonicController {
    constructor(private readonly mnemonicRepository: IMnemonicRepository) {}

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
     * Checks if the given Mnemonic is correct
     * @param Mnemonic
     */
    async validateMnemonic(mnemonic: string): Promise<boolean> {
        if (!mnemonic) throw new DomainError(AuthErrorCodes.MNEMONIC_IS_NOT_SET);
        return bip39.validateMnemonic(mnemonic);
    }
}
