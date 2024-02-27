/**
 * Do not `import {config} from "config"` in this file
 * because it will cause a circular dependency with SettingsState
 */
import { formatNearAmount } from "near-api-js/lib/utils/format";
import config from "../../../config/config";
import {
    Action,
    ActionKind,
    Chains,
    EnhancedTransactionActionKind,
    StakingDeposit,
    TransactionActionKind,
    TransactionWithoutActions,
} from "../NearSdkService";
import {
    parseBlockTimestamp,
    DEPOSIT_METHOD,
    DEPOSIT_STAKE_METHOD,
    WITHDRAW_METHOD,
    WITHDRAW_ALL_METHOD,
    convertYoctoToNear,
} from "../utils";
import { FetchService } from "./FetchService";
import {
    NearApiServiceParams,
    NearBlocksTransactionResponseDto,
    NearblocksAccessKeyResponseDto,
    NearBlocksTokenResponseDto,
    ValidatorAmount,
} from "./NearApiService.types";

export class NearBlocksService extends FetchService {
    public chain: Chains;
    public testnetUrl = config.nearblocksTesnetApiUrl;
    public mainnetUrl = config.nearblocksMainnetApiUrl;

    constructor(chain: Chains) {
        super();
        this.chain = chain;
    }

    private getNearblocksApiUrlFromChain(): string {
        return this.chain === Chains.MAINNET ? this.mainnetUrl : this.testnetUrl;
    }

    private fetch<T>(path: string): Promise<T> {
        const nearBlocksApi = this.getNearblocksApiUrlFromChain();
        return this.handleFetch<T>(`${nearBlocksApi}${path}`);
    }

    private addValidatorAmountsFromTxs(txs: NearBlocksTransactionResponseDto, valAmounts: ValidatorAmount): ValidatorAmount {
        for (let i = 0; i < txs.txns.length; i += 1) {
            const tx = txs.txns[i];
            if (!valAmounts[tx.receiver_account_id]) {
                valAmounts[tx.receiver_account_id] = 0;
            }

            if (DEPOSIT_STAKE_METHOD === tx.actions[0].method) {
                valAmounts[tx.receiver_account_id] += tx.actions_agg.deposit;
            } else if (DEPOSIT_METHOD === tx.actions[0].method) {
                valAmounts[tx.receiver_account_id] += tx.actions_agg.deposit;
            } else if (WITHDRAW_METHOD === tx.actions[0].method) {
                if (tx.logs[0]) {
                    const amount = parseInt(tx.logs[0].split(" ")[2].slice(0, -1), 10);
                    valAmounts[tx.receiver_account_id] -= amount;
                }
            } else if (WITHDRAW_ALL_METHOD === tx.actions[0].method) {
                if (tx.logs[0]) {
                    const amount = parseInt(tx.logs[0].split(" ")[2].slice(0, -1), 10);
                    valAmounts[tx.receiver_account_id] -= amount;
                }
            }
        }

        return valAmounts;
    }

    async getAccountDeposits({ address }: NearApiServiceParams): Promise<StakingDeposit[]> {
        const deposits: StakingDeposit[] = [];
        let validatorAmounts: ValidatorAmount = {};
        const pageSize = 25;
        const action = TransactionActionKind.FUNCTION_CALL;
        const order = "asc";

        let page = 1;
        let resp = await this.fetch<NearBlocksTransactionResponseDto>(
            `/account/${address}/txns?action=${action}&page=${page}&per_page=${pageSize}&order=${order}`,
        );
        validatorAmounts = this.addValidatorAmountsFromTxs(resp, validatorAmounts);

        while (resp.txns.length === pageSize) {
            page += 1;
            resp = await this.fetch<NearBlocksTransactionResponseDto>(
                `/account/${address}/txns?action=${action}&page=${page}&per_page=${pageSize}&order=${order}`,
            );
            validatorAmounts = this.addValidatorAmountsFromTxs(resp, validatorAmounts);
        }

        for (const key of Object.keys(validatorAmounts)) {
            if (validatorAmounts[key] > 0) {
                deposits.push({ validatorId: key, amount: validatorAmounts[key] });
            }
        }

        return deposits;
    }

    async getAccountsFromPublicKey({ address }: NearApiServiceParams): Promise<string[]> {
        const accounts: string[] = [];
        const keys = await this.fetch<NearblocksAccessKeyResponseDto>(`/keys/${address}`);
        if (!keys?.keys || keys.keys.length === 0) return accounts;
        for (const key of keys.keys) {
            if (key.permission_kind === "FULL_ACCESS") {
                accounts.push(key.account_id);
            }
        }
        return accounts;
    }

    private async getAccountTokens({ address }: NearApiServiceParams): Promise<NearBlocksTokenResponseDto> {
        return await this.fetch<NearBlocksTokenResponseDto>(`/account/${address}/tokens`);
    }

    async getLikelyTokens({ address }: NearApiServiceParams): Promise<string[]> {
        return (await this.getAccountTokens({ address })).tokens.fts;
    }

    async getLikelyNfts({ address }: NearApiServiceParams): Promise<string[]> {
        return (await this.getAccountTokens({ address })).tokens.nfts;
    }

    async getRecentActivity({ address }: NearApiServiceParams): Promise<Action[]> {
        const baseTxs = await this.fetch<NearBlocksTransactionResponseDto>(`/account/${address}/txns?page=1&per_page=10&order=desc`);

        const txs: Action[] = [];
        for (const tx of baseTxs.txns) {
            if (tx.predecessor_account_id !== "system") {
                const baseTransaction: TransactionWithoutActions = {
                    transactionHash: tx.transaction_hash,
                    includedInBlockHash: tx.included_in_block_hash,
                    blockTimestamp: parseBlockTimestamp(tx.block_timestamp),
                    signerAccountId: tx.predecessor_account_id,
                    nonce: 0,
                    receiverAccountId: tx.receiver_account_id,
                };

                for (const [i, action] of tx.actions.entries()) {
                    const actionKind = this.parseActionKindApiDto(action.action as TransactionActionKind, tx.receiver_account_id, address);
                    if (action.action === "FUNCTION_CALL" && action.method === "ft_transfer") {
                        const res = this.parseTransactionLogs(tx.logs);
                    }
                    console.log("Action Kind: " + actionKind);
                    txs.push({
                        transaction: baseTransaction,
                        actionKind,
                        transactionHash: tx.transaction_hash,
                        indexInTransaction: i,
                        // codeSha256: "", // For DEPLOY_CONTRACT kind
                        gas: tx.outcomes_agg.transaction_fee, // For FUNCTION_CALL kind

                        ...(tx.actions_agg.deposit && {
                            deposit: this.parseTransactionDeposit(actionKind, tx.actions_agg.deposit), // For FUNCTION_CALL, TRANSFER kind
                        }),
                        // argsBase64: "", // For FUNCTION_CALL kind
                        // argsJson: "", // For FUNCTION_CALL kind
                        methodName: action.method || undefined,
                        // stake: "", // For STAKE kind
                        // publicKey: baseTransaction.receiverAccountId, // For STAKE, ADD_KEY, DELETE_KEY kind
                        // accessKey: "", // For ADD_KEY kind
                        // beneficiaryId: "", // For DELETE_ACCOUNT kind
                    });
                }
            }
        }
        return txs;
    }

    private parseActionKindApiDto(actionKind: TransactionActionKind, receiverId: string, account: string): ActionKind {
        const isReceiver = receiverId === account;
        const isTransfer = actionKind === TransactionActionKind.TRANSFER;
        return isTransfer
            ? isReceiver
                ? EnhancedTransactionActionKind.TRANSFER_RECEIVE
                : EnhancedTransactionActionKind.TRANSFER_SEND
            : (actionKind as ActionKind);
    }

    private parseTransactionDeposit(action: ActionKind, deposit: number): string | undefined {
        switch (action) {
            case "TRANSFER_SEND":
            case "TRANSFER_RECEIVE":
                return convertYoctoToNear(deposit.toString());
        }
    }

    private parseTransactionLogs(logs: string[]): any {
        for (const log of logs) {
            this.parseTransactionLog(log);
        }
    }

    private parseTransactionLog(log: string): any {
        try {
            let jsonString = log.replaceAll("\\", "");
            console.log("JSON String: " + jsonString);
            const json = JSON.parse(jsonString.replaceAll("\\", "").slice(1, 12));
            console.log("JSON: " + json);
        } catch (e) {}
    }
}
