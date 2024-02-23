export interface IWalletController {
    createWallets(mnemonic: string[]): Promise<void>;
    recoverWallets(): Promise<void>;
}
