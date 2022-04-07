import {
    CKBBalance,
    ConnectionService,
    Environments,
    Transaction,
    WalletService,
    Nft,
    WalletState,
    DAOBalance,
} from "@peersyst/ckb-peersyst-sdk";
import { tokensList, UknownToken } from "module/token/mock/token";
import { TokenAmount } from "module/token/types";
import { DepositInDAOParams, SendTransactionParams } from "./CkbSdkService.types";

export class CKBSDKService {
    private readonly ckbUrl = "http://78.46.174.87:8114/rpc"; // Podem posar-ho com a env var?
    private readonly indexerUrl = "http://78.46.174.87:8114/indexer"; // Podem posar-ho com a env var?
    private connectionService: ConnectionService;
    private wallet: WalletService;

    constructor(mnemonic: string, walletState?: WalletState) {
        this.connectionService = new ConnectionService(this.ckbUrl, this.indexerUrl, Environments.Testnet);
        this.wallet = new WalletService(this.connectionService, mnemonic, walletState);
    }

    async synchronize(): Promise<WalletState> {
        return this.wallet.synchronize();
    }

    getCKBBalance(): CKBBalance {
        return this.wallet.getCKBBalance();
    }

    async getDAOBalance(): Promise<DAOBalance> {
        return this.wallet.getDAOBalance();
    }

    async getTransactions(): Promise<Transaction[]> {
        return this.wallet.getTransactions();
    }

    getTokensBalance(): TokenAmount[] {
        const tokens = this.wallet.getTokensBalance();
        const tokenAmounts: TokenAmount[] = [];
        for (const token of tokens) {
            const tokenFound = tokensList.filter((tkn) => tkn.args === token.type.args);
            if (tokenFound.length > 0) {
                tokenAmounts.push({ amount: token.amount, type: tokenFound[0] });
            } else {
                tokenAmounts.push({
                    amount: token.amount,
                    type: { ...UknownToken, ...token.type },
                });
            }
        }
        return tokenAmounts;
    }

    async getNfts(): Promise<Nft[]> {
        return this.wallet.getNftsBalance();
    }

    getAddress(): string {
        return this.wallet.getNextAddress();
    }

    async sendTransaction(params: SendTransactionParams): Promise<string> {
        return this.wallet.sendTransaction(params.amount, params.mnemonic.join(" "), params.to);
    }

    async depositInDAO(params: DepositInDAOParams): Promise<string> {
        return this.wallet.depositInDAO(params.amount, params.mnemonic.join(" "));
    }
}
