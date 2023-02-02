import * as UseCreateNewWallet from "module/wallet/hook/useCreateNewWallet";
import BaseMock, { MockFnType } from "../base.mock";
import { WalletMock } from "./wallet.mock";

export interface UseCreateNewWalletMockInterface {
    wallet: WalletMock | undefined;
    createNewWallet: MockFnType;
}

export class UseCreateNewWalletMock extends BaseMock implements UseCreateNewWalletMockInterface {
    wallet: WalletMock | undefined;
    createNewWallet: MockFnType;
    constructor({ wallet, createNewWallet }: Partial<UseCreateNewWalletMockInterface> = {}) {
        super();
        this.wallet = wallet;
        this.createNewWallet = createNewWallet || jest.fn().mockResolvedValue(this.wallet);
        this.mock = jest.spyOn(UseCreateNewWallet, "default").mockReturnValue(this.createNewWallet);
    }
}
