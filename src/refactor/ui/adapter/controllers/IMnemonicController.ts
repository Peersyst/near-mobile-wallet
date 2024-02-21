export interface IMnemonicController {
    setMnemonic(mnemonic: string): Promise<void>;
    getMnemonic(): Promise<string | undefined>;
    validateMnemonic(mnemonic: string): Promise<boolean>;
}
