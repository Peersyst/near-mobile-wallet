import { CKBBalance, ConnectionService, Environments, Transaction, WalletService, Nft } from "@peersyst/ckb-peersyst-sdk";

export class CKBSDKService {
    private readonly ckbUrl = "http://78.46.174.87:8114/rpc"; // Podem posar-ho com a env var?
    private readonly indexerUrl = "http://78.46.174.87:8114/indexer"; // Podem posar-ho com a env var?
    private connectionService: ConnectionService;
    private wallet!: WalletService;

    constructor() {
        this.connectionService = new ConnectionService(this.ckbUrl, this.indexerUrl, Environments.Testnet);
    }

    initialize(mnemonic: string): void {
        this.wallet = new WalletService(this.connectionService, mnemonic);
    }

    isInitialized(): void {
        if (!this.wallet) {
            throw new Error("WalletNotInitializedError");
        }
    }

    async getCKBBalance(): Promise<CKBBalance> {
        this.isInitialized();
        return this.wallet.getCKBBalance();
    }

    async getTransactions(): Promise<Transaction[]> {
        this.isInitialized();
        return this.wallet.getTransactions();
    }

    async getNfts(): Promise<Nft[]> {
        this.isInitialized();
        return this.wallet.getNftsBalance();
    }
}

export const ckbSdkInstance = new CKBSDKService();
