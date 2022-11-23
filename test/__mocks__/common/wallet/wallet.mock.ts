import { Wallet } from "module/wallet/state/WalletState";
import { UnencryptedWalletChainInfo } from "module/wallet/WalletStorage";
import BaseMock from "../base.mock";

export const MOCKED_ADDRESS = "ckt1qzda0cr08m85hc8jlnfp3zer7xulejywt49kt2rr0vthywaa50xwsq0h797pvzd3mc7a3s6jckzj7rcjfxwz3mqr63937";

export class WalletMock extends BaseMock implements Wallet {
    index: number;
    name: string;
    colorIndex: number;
    testnet?: UnencryptedWalletChainInfo | undefined;
    mainnet?: UnencryptedWalletChainInfo | undefined;
    synchronizing?: boolean | undefined;

    constructor({ name = "firstWallet", index = 0, colorIndex = 0, testnet, synchronizing, mainnet }: Partial<Wallet> = {}) {
        super();
        this.index = index;
        this.name = name;
        this.colorIndex = colorIndex;
        this.testnet = testnet;
        this.mainnet = mainnet;
        this.synchronizing = synchronizing;
    }
}
