import { Wallet } from "module/wallet/state/WalletState";
import { UnencryptedWalletChainInfo } from "module/wallet/WalletStorage";
import BaseMock from "../base.mock";

export class WalletMock extends BaseMock implements Wallet {
    index: number;
    name: string;
    colorIndex: number;
    secret?: string | undefined;
    testnet?: UnencryptedWalletChainInfo | undefined;
    mainnet?: UnencryptedWalletChainInfo | undefined;
    synchronizing?: boolean | undefined;

    constructor({ name = "firstWallet", index = 0, colorIndex = 0, testnet, secret, synchronizing, mainnet }: Partial<Wallet> = {}) {
        super();
        this.index = index;
        this.name = name;
        this.colorIndex = colorIndex;
        this.testnet = testnet;
        this.mainnet = mainnet;
        this.secret = secret;
        this.synchronizing = synchronizing;
    }
}
