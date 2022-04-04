import {
    CKBBalance,
    DepositInDAOParams,
    Nft,
    SdkWalletState,
    SendTransactionParams,
    Transaction,
} from "module/common/service/mock/CkbServiceMock.types";
import { WalletServiceMock } from "module/common/service/mock/WalletServiceMock";
import { DaoBalanceType } from "module/dao/types";
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

    // ----------------------
    // -- Wallet functions --
    // ----------------------

    async sync(): Promise<void> {
        await new Promise((resolve) => setTimeout(resolve, 10000));
    }

    isInitialized(): void {
        if (!this.wallet) {
            throw new Error("WalletNotInitializedError");
        }
    }

    getAddress(): string {
        return "0xMockedAddress12345678";
    }

    // ---------------------------
    // -- CKB service functions --
    // ---------------------------

    async getCKBBalance(): Promise<CKBBalance> {
        return this.wallet.getCKBBalance();
    }

    async sendTransaction(params: SendTransactionParams): Promise<string> {
        return this.wallet.sendTransaction(params);
    }

    // -----------------------------------
    // -- Transaction service functions --
    // -----------------------------------

    async getTransactions(): Promise<Transaction[]> {
        return this.wallet.getTransactions();
    }

    // -----------------------------
    // -- Nft service functions --
    // -----------------------------
    async getNfts(): Promise<Nft[]> {
        return this.wallet.getNftsBalance();
    }

    // -----------------------------
    // -- Token service functions --
    // -----------------------------
    async getTokensBalance(): Promise<TokenAmount[]> {
        return this.wallet.getTokensBalance();
    }

    // ---------------------------
    // -- DAO service functions --
    // ---------------------------
    async depositInDAO(params: DepositInDAOParams): Promise<string> {
        return this.wallet.depositInDAO(params);
    }

    async getDaoBalance(): Promise<DaoBalanceType> {
        return this.wallet.getDaoBalance();
    }
}
