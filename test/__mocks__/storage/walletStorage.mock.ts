import BaseMock from "mocks/common/base.mock";
import { MnemonicMocked } from "mocks/MnemonicMocked";
import { SecureWalletInfo, SecureWalletStorageType, UnencryptedWalletInfo } from "module/wallet/wallet.types";
import { MOCKED_PK } from "test-mocks";
import { WalletStorage } from "module/wallet/WalletStorage";

export class UnencryptedWalletInfoMock extends BaseMock implements UnencryptedWalletInfo {
    account: string;
    index: number;
    uncommittedTransactionHashes?: string[];

    constructor({ index, account, uncommittedTransactionHashes = [] }: Partial<UnencryptedWalletInfo> = {}) {
        super();
        this.index = index ?? 0;
        this.account = account ?? "firstWallet";
        this.uncommittedTransactionHashes = uncommittedTransactionHashes;
    }
}

export class UnencryptedWalletsInfoMock extends BaseMock {
    wallets: UnencryptedWalletInfo[];
    constructor({ wallets, length = 1 }: Partial<{ wallets: UnencryptedWalletInfo[]; length: number }> = {}) {
        super();
        this.wallets = wallets ?? Array.from({ length }, (_, i) => new UnencryptedWalletInfoMock({ index: i }));
    }
}

export interface UnsecureWalletStorageTypeMock {
    testnet: UnencryptedWalletInfoMock[];
    mainnet: UnencryptedWalletInfoMock[];
}

export class UnsecureWalletStorageTypeMock extends BaseMock implements UnsecureWalletStorageTypeMock {
    testnet: UnencryptedWalletInfoMock[];
    mainnet: UnencryptedWalletInfoMock[];
    constructor({ testnet = [], mainnet = [] }: Partial<UnsecureWalletStorageTypeMock> = {}) {
        super();
        this.testnet = testnet;
        this.mainnet = mainnet;
    }
}

export class SecureWalletInfoMock extends BaseMock implements SecureWalletInfo {
    walletIds: number[];
    privateKey: string;
    constructor({
        walletIds,
        privateKey = "privateKey",
        walletIdsLength = 2,
    }: Partial<SecureWalletInfo & { walletIdsLength: number }> = {}) {
        super();
        this.walletIds = walletIds ?? Array.from({ length: walletIdsLength }, (_, i) => i);
        this.privateKey = privateKey;
    }
}

export class SecureWalletStorageTypeMock extends BaseMock implements SecureWalletStorageType {
    pin: SecureWalletStorageType["pin"];
    mnemonic: SecureWalletStorageType["mnemonic"];
    testnet: SecureWalletStorageType["testnet"];
    mainnet: SecureWalletStorageType["mainnet"];
    mainPrivateKey: SecureWalletStorageType["mainPrivateKey"];

    constructor({
        pin = "1234",
        mnemonic = MnemonicMocked,
        testnet = [],
        mainnet = [],
        mainPrivateKey = MOCKED_PK,
    }: Partial<SecureWalletStorageType> = {}) {
        super();
        this.pin = pin;
        this.mnemonic = mnemonic;
        this.testnet = testnet;
        this.mainnet = mainnet;
        this.mainPrivateKey = mainPrivateKey;
        this.mock = jest.spyOn(WalletStorage, "getSecure").mockResolvedValue(this);
    }
}

export class SecureWalletsInfoMock extends BaseMock {
    wallets: SecureWalletInfoMock[];
    constructor({ wallets, length = 1 }: Partial<{ wallets: SecureWalletInfoMock[]; length: number }> = {}) {
        super();
        this.wallets = wallets ?? Array.from({ length }, () => new SecureWalletInfoMock({ walletIdsLength: 2 }));
    }
}
