import DomainError from "refactor/domain/error/DomainError";
import { IMnemonicController } from "refactor/ui/adapter/controllers/IMnemonicController";
import { IWalletController } from "refactor/ui/adapter/controllers/IWalletController";
import MnemonicErrorCodes from "../errors/MnemonicErrorCodes";

export default class WalletController implements IWalletController {
    constructor(public readonly mnemonicController: IMnemonicController) {}

    async createWallets(mnemonic: string[]): Promise<void> {
        const isValidMnemonic = await this.mnemonicController.validateMnemonic(mnemonic.join(" "));
        if (!isValidMnemonic) throw new DomainError(MnemonicErrorCodes.MNEMONIC_IS_INVALID);
        return await this.mnemonicController.setMnemonic(mnemonic.join(" "));
        // TODO : create wallets
    }

    recoverWallets(): Promise<void> {
        //throw new Error("Method not implemented.");
        // TODO : recover wallets
        return Promise.resolve();
    }
}
