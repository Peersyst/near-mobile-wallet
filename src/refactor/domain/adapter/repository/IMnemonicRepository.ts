export interface IMnemonicRepository {
    getMnemonic(): Promise<string | undefined>;
    setMnemonic(mnemonic: string): Promise<void>;
    removeMnemonic(): Promise<void>;
}
