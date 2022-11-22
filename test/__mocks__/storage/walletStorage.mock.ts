import BaseMock from "mocks/common/base.mock";
import { SecureWalletInfo, WalletState } from "module/wallet/WalletStorage";

export class InitialWalletStateMock extends BaseMock implements WalletState {
    name: string;
    colorIndex: number;
    constructor({ name = "firstWallet", colorIndex = 0 }: Partial<WalletState> = {}) {
        super();
        this.name = name;
        this.colorIndex = colorIndex;
    }
}

export interface UnencryptedWalletChainInfoMockType {
    initialState?: InitialWalletStateMock;
    uncommittedTransactionHashes?: string[];
}

export class UnencryptedWalletChainInfoMock extends BaseMock implements UnencryptedWalletChainInfoMockType {
    initialState?: InitialWalletStateMock;
    uncommittedTransactionHashes?: string[];
    constructor({ initialState, uncommittedTransactionHashes }: Partial<UnencryptedWalletChainInfoMockType> = {}) {
        super();
        this.initialState = initialState ?? new InitialWalletStateMock();
        this.uncommittedTransactionHashes = uncommittedTransactionHashes;
    }
}

export interface UnencryptedWalletInfoMock {
    index: number;
    testnet?: UnencryptedWalletChainInfoMock;
    mainnet?: UnencryptedWalletChainInfoMock;
}

export class UnencryptedWalletInfoMock extends BaseMock implements UnencryptedWalletInfoMock {
    index: number;
    testnet?: UnencryptedWalletChainInfoMock;
    mainnet?: UnencryptedWalletChainInfoMock;
    constructor({ index, testnet, mainnet }: Partial<UnencryptedWalletInfoMock> = {}) {
        super();
        this.index = index ?? 0;
        this.testnet = testnet ?? new UnencryptedWalletChainInfoMock();
        this.mainnet = mainnet ?? new UnencryptedWalletChainInfoMock();
    }
}

export class SecureWalletInfoMock extends BaseMock implements SecureWalletInfo {
    index: number;
    name: string;
    colorIndex: number;
    mnemonic?: string[];
    secret?: string;
    constructor({ index, name, colorIndex, mnemonic, secret }: Partial<SecureWalletInfo> = {}) {
        super();
        this.index = index ?? 0;
        this.name = name ?? "firstWallet";
        this.colorIndex = colorIndex ?? 0;
        this.mnemonic = mnemonic;
        this.secret = secret;
    }
}

export type StorageWalletMockType = SecureWalletInfo & UnencryptedWalletInfoMock;

export class StorageWalletMock extends BaseMock implements StorageWalletMockType {
    index: number;
    name: string;
    colorIndex: number;
    mnemonic?: string[];
    secret?: string;
    testnet?: UnencryptedWalletChainInfoMock;
    mainnet?: UnencryptedWalletChainInfoMock;
    constructor({ testnet, mainnet, name, index, colorIndex, ...rest }: Partial<StorageWalletMockType> = {}) {
        super();
        const { index, name, colorIndex, mnemonic, secret } = new SecureWalletInfoMock(rest);
        const uncryptedWallet = new UnencryptedWalletInfoMock({ testnet, mainnet });
        this.index = index;
        this.name = name;
        this.colorIndex = colorIndex;
        this.mnemonic = mnemonic;
        this.secret = secret;
        this.testnet = testnet ?? uncryptedWallet;
        this.mainnet = mainnet ?? new UnencryptedWalletChainInfoMock();
    }
}
