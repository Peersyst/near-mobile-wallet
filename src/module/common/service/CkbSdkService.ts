import {
    CKBBalance,
    ConnectionService,
    Environments,
    WalletService,
    Nft,
    WalletState,
    DAOBalance,
    TransactionType,
    ScriptType,
    DAOUnlockableAmount,
    Transaction,
} from "ckb-peersyst-sdk";
import { tokensList, UknownToken } from "module/token/mock/token";
import { DepositInDAOParams, FullTransaction, SendTransactionParams, WithdrawOrUnlockParams } from "./CkbSdkService.types";
import { CKB_URL, INDEXER_URL } from "@env";
import { TokenAmount, TokenType } from "module/token/types";

export function getTokenTypeFromScript(scriptType: ScriptType): TokenType {
    const tokenFound = tokensList.filter((tkn) => tkn.args === scriptType.args && tkn.codeHash === scriptType.codeHash);
    if (tokenFound.length > 0) {
        return tokenFound[0];
    }
    return { ...UknownToken, ...scriptType };
}

export const connectionService = new ConnectionService(CKB_URL, INDEXER_URL, Environments.Testnet);

export class CKBSDKService {
    private connectionService: ConnectionService;
    private wallet: WalletService;

    constructor(
        mnemonic: string,
        walletState?: WalletState,
        onSync?: (walletState: WalletState) => Promise<void>,
        onSyncStart?: () => void,
    ) {
        this.connectionService = connectionService;
        this.wallet = new WalletService(this.connectionService, mnemonic, walletState, onSync, onSyncStart);
    }

    static getFullTransactionFromTransaction(transaction: Transaction): FullTransaction {
        if ([TransactionType.RECEIVE_TOKEN, TransactionType.SEND_TOKEN].includes(transaction.type) && transaction.scriptType) {
            return { ...transaction, token: getTokenTypeFromScript(transaction.scriptType).tokenName };
        }
        return transaction;
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

    getTransactions(): FullTransaction[] {
        const transactions = this.wallet.getTransactions();
        return transactions.map(CKBSDKService.getFullTransactionFromTransaction);
    }

    async getTransaction(txHash: string): Promise<FullTransaction> {
        const transaction = await this.wallet.getTransactionFromHash(txHash);
        return CKBSDKService.getFullTransactionFromTransaction(transaction);
    }

    getTokensBalance(): TokenAmount[] {
        const tokens = this.wallet.getTokensBalance();
        const tokenAmounts: TokenAmount[] = [];
        for (const token of tokens) {
            tokenAmounts.push({ amount: token.amount, type: getTokenTypeFromScript(token.type) });
        }
        return tokenAmounts;
    }

    async getNfts(): Promise<Nft[]> {
        await this.synchronize();
        return this.wallet.getNftsBalance();
    }

    getAddress(): string {
        return this.wallet.getNextAddress();
    }

    async sendTransaction(params: SendTransactionParams): Promise<string> {
        return this.wallet.sendTransaction(BigInt(params.amount), params.mnemonic.join(" "), params.to, params.feeRate);
    }

    async depositInDAO(params: DepositInDAOParams): Promise<string> {
        return await this.wallet.depositInDAO(BigInt(params.amount), params.mnemonic.join(" "), params.feeRate);
    }

    async getDAOUnlockableAmounts(): Promise<DAOUnlockableAmount[]> {
        return this.wallet.getDAOUnlockableAmounts();
    }

    async withdrawOrUnlock({ unlockableAmount, mnemonic }: WithdrawOrUnlockParams): Promise<string> {
        return this.wallet.withdrawOrUnlock(unlockableAmount, mnemonic.join(" "));
    }
}
