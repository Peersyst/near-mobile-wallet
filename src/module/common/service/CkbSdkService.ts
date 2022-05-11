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
} from "ckb-peersyst-sdk";
import { tokenAmountZeroBalanceList, tokensList, UknownToken } from "module/token/mock/token";
import { DepositInDAOParams, FullTransaction, SendTransactionParams, WithdrawOrUnlockParams } from "./CkbSdkService.types";
import { CKB_URL, INDEXER_URL } from "@env";
import { TokenAmount, TokenType } from "module/token/types";

export function getTokenIndexTypeFromScript(scriptType: ScriptType): number {
    return tokensList.findIndex((tkn) => tkn.args === scriptType.args && tkn.codeHash === scriptType.codeHash);
}

export function getTokenTypeFromIndex(tokenIndex: number, scriptType?: ScriptType): TokenType {
    if (tokenIndex !== -1) {
        return tokensList[tokenIndex];
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

    getTokensBalance(): TokenAmount[] {
        const tokens = this.wallet.getTokensBalance();
        let tokenAmounts: TokenAmount[] = [...tokenAmountZeroBalanceList];
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
