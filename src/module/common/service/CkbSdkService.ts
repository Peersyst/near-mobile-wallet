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
} from "@peersyst/ckb-peersyst-sdk";
import { tokensList, UknownToken } from "module/token/mock/token";
import { DepositInDAOParams, FullTransaction, SendTransactionParams, WithdrawAndUnlockParams } from "./CkbSdkService.types";
import { CKB_URL, INDEXER_URL } from "@env";
import { TokenAmount, TokenType } from "module/token/types";

export function getTokenTypeFromScript(scriptType: ScriptType): TokenType {
    const tokenFound = tokensList.filter((tkn) => tkn.args === scriptType.args && tkn.codeHash === scriptType.codeHash);
    if (tokenFound.length > 0) {
        return tokenFound[0];
    }
    return { ...UknownToken, ...scriptType };
}

export class CKBSDKService {
    private readonly ckbUrl = CKB_URL;
    private readonly indexerUrl = INDEXER_URL;
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

    getTransactions(): FullTransaction[] {
        const fullTxs: FullTransaction[] = [];
        const transactions = this.wallet.getTransactions();
        for (const tx of transactions) {
            if ([TransactionType.RECEIVE_TOKEN, TransactionType.SEND_TOKEN].includes(tx.type) && tx.scriptType) {
                fullTxs.push({ ...tx, token: getTokenTypeFromScript(tx.scriptType).tokenName });
            } else {
                fullTxs.push(tx);
            }
        }
        return fullTxs;
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
        return this.wallet.getNftsBalance();
    }

    getAddress(): string {
        return this.wallet.getNextAddress();
    }

    async sendTransaction(params: SendTransactionParams): Promise<string> {
        return this.wallet.sendTransaction(params.amount, params.mnemonic.join(" "), params.to, params.feeRate);
    }

    async depositInDAO(params: DepositInDAOParams): Promise<string> {
        return this.wallet.depositInDAO(params.amount, params.mnemonic.join(" "), params.feeRate);
    }

    async getDAOUnlockableAmounts(): Promise<DAOUnlockableAmount[]> {
        return this.wallet.getDAOUnlockableAmounts();
    }

    async withdrawAndUnlock({ unlockableAmount, mnemonic }: WithdrawAndUnlockParams): Promise<string> {
        return this.wallet.withdrawAndUnlock(unlockableAmount, mnemonic.join(" "));
    }
}
