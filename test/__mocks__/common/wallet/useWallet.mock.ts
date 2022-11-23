import BaseMock from "../base.mock";
import { WalletMock } from "./wallet.mock";
import * as UseWallet from "module/wallet/hook/useWallet";

export class UseWalletMock extends BaseMock {
    wallet: WalletMock;
    constructor(walletParams: Partial<WalletMock> = {}) {
        super();
        this.wallet = new WalletMock(walletParams);
        this.mock = jest.spyOn(UseWallet, "default").mockReturnValue(this.wallet);
    }
}
