import BaseMock from "mocks/common/base.mock";
import { MnemonicMocked } from "mocks/MnemonicMocked";
import { SecureWalletInfo, SecureWalletStorageType, UnencryptedWalletInfo, UnsecureWalletStorageType } from "module/wallet/wallet.types";

export class UnencryptedWalletInfoMock extends BaseMock implements UnencryptedWalletInfo {
    account: string;
    colorIndex: number;
    index: number;
    imported?: boolean;
    uncommittedTransactionHashes?: string[];

    constructor({ index, colorIndex, account, uncommittedTransactionHashes = [], imported = false }: Partial<UnencryptedWalletInfo> = {}) {
        super();
        this.index = index ?? 0;
        this.colorIndex = colorIndex ?? 0;
        this.account = account ?? "firstWallet";
        this.uncommittedTransactionHashes = uncommittedTransactionHashes;
        this.imported = imported;
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
    constructor({ walletIds = [], privateKey = "privateKey" }: Partial<SecureWalletInfo> = {}) {
        super();
        this.walletIds = walletIds;
        this.privateKey = privateKey;
    }
}

export class SecureWalletStorageTypeMock extends BaseMock implements SecureWalletStorageType {
    pin: SecureWalletStorageType["pin"];
    mnemonic: SecureWalletStorageType["mnemonic"];
    testnet: SecureWalletStorageType["testnet"];
    mainnet: SecureWalletStorageType["mainnet"];

    constructor({ pin = "1234", mnemonic = MnemonicMocked, testnet = [], mainnet = [] }: Partial<SecureWalletStorageType> = {}) {
        super();
        this.pin = pin;
        this.mnemonic = mnemonic;
        this.testnet = testnet;
        this.mainnet = mainnet;
    }
}
