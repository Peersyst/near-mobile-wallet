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
import { tokenAmountZeroBalanceList, tokensList, UknownToken } from "module/token/mock/token";
import { Chain, DepositInDAOParams, FullTransaction, SendTransactionParams, WithdrawOrUnlockParams } from "./CkbSdkService.types";
import { TokenAmount, TokenType } from "module/token/types";
import { config } from "config";

export function getTokenIndexTypeFromScript(scriptType: ScriptType): number {
    return tokensList.findIndex((tkn) => tkn.args === scriptType.args && tkn.codeHash === scriptType.codeHash);
}

export function getTokenTypeFromIndex(tokenIndex: number, scriptType?: ScriptType): TokenType {
    if (tokenIndex !== -1) {
        return tokensList[tokenIndex];
    }
    return { ...UknownToken, ...scriptType };
}

export function getTokenTypeFromScript(scriptType: ScriptType) {
    const tokenIndex = getTokenIndexTypeFromScript(scriptType);
    return getTokenTypeFromIndex(tokenIndex, scriptType);
}

export const testnetConnectionService = new ConnectionService(config.ckbTestnetUrl, config.indexerTestnetUrl, Environments.Testnet);
export const mainnetConnectionService = new ConnectionService(config.ckbMainnetUrl, config.indexerMainnetUrl, Environments.Mainnet);

export class CKBSDKService {
    private connectionService: ConnectionService;
    private wallet: WalletService;

    constructor(
        chain: Chain,
        mnemonic: string,
        walletState?: WalletState,
        onSync?: (walletState: WalletState) => Promise<void>,
        onSyncStart?: () => void,
    ) {
        this.connectionService = chain === "testnet" ? testnetConnectionService : mainnetConnectionService;
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
        const fullTxs: FullTransaction[] = [];
        const transactions = this.wallet.getTransactions();
        for (const tx of transactions) {
            if ([TransactionType.RECEIVE_TOKEN, TransactionType.SEND_TOKEN].includes(tx.type) && tx.scriptType) {
                const tokenIndex = getTokenIndexTypeFromScript(tx.scriptType);
                if (tokenIndex !== -1) {
                    fullTxs.push({ ...tx, token: getTokenTypeFromIndex(tokenIndex).tokenName });
                }
            } else {
                fullTxs.push(tx);
            }
        }
        return fullTxs;
    }

    async getTransaction(txHash: string): Promise<FullTransaction> {
        const transaction = await this.wallet.getTransactionFromHash(txHash);
        return CKBSDKService.getFullTransactionFromTransaction(transaction);
    }

    getTokensBalance(): TokenAmount[] {
        const tokens = this.wallet.getTokensBalance();
        const tokenAmounts: TokenAmount[] = [...tokenAmountZeroBalanceList];
        for (const token of tokens) {
            const tokenIndex = getTokenIndexTypeFromScript(token.type);
            //Supported Token
            if (tokenIndex !== -1) {
                tokenAmounts[tokenIndex].amount = token.amount;
            }
        }
        return tokenAmounts;
    }

    getNfts(): Promise<Nft[]> {
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
