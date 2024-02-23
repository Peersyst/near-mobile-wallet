import DomainError from "refactor/domain/error/DomainError";
import { IMnemonicController } from "refactor/ui/adapter/controllers/IMnemonicController";
import { IWalletController } from "refactor/ui/adapter/controllers/IWalletController";
import WalletErrorCodes from "../errors/WalletErrorCodes";

export default class WalletController implements IWalletController {
    constructor(public readonly mnemonicController: IMnemonicController) {}

    async createWallets(mnemonic: string[]): Promise<void> {
        const isValidMnemonic = await this.mnemonicController.validateMnemonic(mnemonic.join(" "));
        if (!isValidMnemonic) throw new DomainError(WalletErrorCodes.MNEMONIC_IS_INVALID);
        return await this.mnemonicController.setMnemonic(mnemonic.join(" "));
        // TODO : create wallets
    }

    recoverWallets(): Promise<void> {
        // TODO : recover wallets
        return Promise.resolve();
    }
}
