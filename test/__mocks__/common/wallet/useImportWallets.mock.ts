import * as UseImportWallets from "module/wallet/hook/useImportWallets";
import BaseMock, { MockFnType } from "../base.mock";
import { WalletMock } from "./wallet.mock";

export interface UseImportWalletsMockInterface {
    wallets: WalletMock[];
    importWallets: MockFnType;
}

export class UseImportWalletsMock extends BaseMock implements UseImportWalletsMockInterface {
    wallets: WalletMock[];
    importWallets: MockFnType;
    constructor({ wallets, importWallets }: Partial<UseImportWalletsMockInterface> = {}) {
        super();
        this.wallets = wallets || [];
        this.importWallets = importWallets || jest.fn().mockResolvedValue(this.wallets);
        this.mock = jest.spyOn(UseImportWallets, "default").mockReturnValue(this.importWallets);
    }
}
