export interface IMnemonicController {
    setMnemonic(mnemonic: string): Promise<void>;
    validateMnemonic(mnemonic: string): Promise<boolean>;
}
