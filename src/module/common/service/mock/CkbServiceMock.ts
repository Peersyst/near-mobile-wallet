import { CKBBalance, Nft, SdkWalletState, Transaction } from "module/common/service/mock/CkbServiceMock.types";
import { WalletServiceMock } from "module/common/service/mock/WalletServiceMock";
import { TokenAmount } from "module/token/types";

export class CkbServiceMock {
    private readonly ckbUrl = "http://78.46.174.87:8114/rpc";
    private readonly indexerUrl = "http://78.46.174.87:8114/indexer";
    private connectionService: any; //any just for the mock
    private wallet!: WalletServiceMock;

    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    constructor(mnemonic: string[], initialState?: SdkWalletState) {
        // Initializes connectionService
        this.wallet = new WalletServiceMock();
        // Initializes wallet with initialState
    }

    async sync(): Promise<void> {
        await new Promise((resolve) => setTimeout(resolve, 10000));
    }

    isInitialized(): void {
        if (!this.wallet) {
            throw new Error("WalletNotInitializedError");
        }
    }

    async getCKBBalance(): Promise<CKBBalance> {
        return this.wallet.getCKBBalance();
    }

    async getTransactions(): Promise<Transaction[]> {
        return this.wallet.getTransactions();
    }

    async getNfts(): Promise<Nft[]> {
        return this.wallet.getNftsBalance();
    }

    async getTokensBalance(): Promise<TokenAmount[]> {
        return this.wallet.getTokensBalance();
    }

    getAddress(): string {
        return "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn";
    }
}
