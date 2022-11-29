import { SecureWalletInfoMock, UnencryptedWalletInfoMock } from "mocks/storage";
import WalletController from "module/wallet/utils/WalletController";
import BaseMock, { MockFnType } from "../base.mock";
import { WalletMock } from "./wallet.mock";

export class ImportWalletsReturnMock extends BaseMock {
    wallets: WalletMock[];
    newStorageWallets: UnencryptedWalletInfoMock[];
    newSecureWallets: SecureWalletInfoMock[];
    updateSecure: boolean;
    constructor({
        wallets = [],
        newStorageWallets = [],
        newSecureWallets = [],
        updateSecure = false,
    }: Partial<ImportWalletsReturnMock> = {}) {
        super();
        this.wallets = wallets;
        this.newStorageWallets = newStorageWallets;
        this.newSecureWallets = newSecureWallets;
        this.updateSecure = updateSecure;
    }
}

interface WalletControllerRecoverMockType {
    recoverWallets: MockFnType;
    returnMock: ImportWalletsReturnMock;
}

export class WalletControllerRecoverMock extends BaseMock implements WalletControllerRecoverMockType {
    recoverWallets: MockFnType;
    returnMock: ImportWalletsReturnMock;
    constructor({ recoverWallets, returnMock = new ImportWalletsReturnMock() }: Partial<WalletControllerRecoverMockType> = {}) {
        super();
        this.returnMock = returnMock;
        this.recoverWallets = recoverWallets ?? jest.fn().mockResolvedValue(returnMock);
        this.mock = jest.spyOn(WalletController, "recoverWallets").mockImplementation(this.recoverWallets);
    }
}
