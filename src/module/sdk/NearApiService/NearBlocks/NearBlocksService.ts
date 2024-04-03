/**
 * Do not `import {config} from "config"` in this file
 * because it will cause a circular dependency with SettingsState
 */
import { providers } from "near-api-js";
import config from "../../../../config/config";
import {
    Action,
    ActionKind,
    Chains,
    EnhancedTransactionActionKind,
    StakingDeposit,
    TransactionActionKind,
    TransactionWithoutActions,
} from "../../NearSdkService";
import {
    parseBlockTimestamp,
    DEPOSIT_METHOD,
    DEPOSIT_STAKE_METHOD,
    WITHDRAW_METHOD,
    WITHDRAW_ALL_METHOD,
    convertYoctoToNear,
} from "../../utils";
import { FetchService } from "../common/FetchService";
import { NearApiServiceInterface, NearApiServicePaginatedParams, NearApiServiceParams } from "../NearApiService.types";
import {
    NearBlocksTransactionResponseDto,
    NearblocksAccessKeyResponseDto,
    NearBlocksTokenResponseDto,
    ValidatorAmount,
    ValidatorAmountMap,
    NearBlocksTransactionDto,
} from "./NearBlocksService.types";

export class NearBlocksService extends FetchService implements NearApiServiceInterface {
    public chain: Chains;
    public mainnetUrl = config.nearblocksMainnetApiUrl;
    public testnetUrl = config.nearblocksTesnetApiUrl;
    public mainnetArchivalNode = config.mainnetArchivalNodeUrl;
    public testnetArchivalNode = config.testnetArchivalNodeUrl;

    constructor(chain: Chains) {
        super();
        this.chain = chain;
    }

    private getNearblocksApiUrlFromChain(): string {
        return this.chain === Chains.MAINNET ? this.mainnetUrl : this.testnetUrl;
    }

    private getArchivalNodeUrl(): string {
        return this.chain === Chains.MAINNET ? this.mainnetArchivalNode : this.testnetArchivalNode;
    }

    private fetch<T>(path: string): Promise<T> {
        const nearBlocksApi = this.getNearblocksApiUrlFromChain();
        return this.handleFetch<T>(`${nearBlocksApi}${path}`);
    }

    private getActionsFromTxs(txs: NearBlocksTransactionDto[], address: string): Action[] {
        const actions: Action[] = [];
        for (const tx of txs) {
            try {
                if (tx.predecessor_account_id !== "system") {
                    const baseTransaction: TransactionWithoutActions = {
                        transactionHash: tx.transaction_hash,
                        includedInBlockHash: tx.included_in_block_hash,
                        blockTimestamp: parseBlockTimestamp(tx.block_timestamp),
                        signerAccountId: tx.predecessor_account_id,
                        nonce: 0,
                        receiverAccountId: tx.receiver_account_id,
                    };
                    if (!tx.actions) {
                        /* eslint-disable no-console */
                        console.warn("tx without actions", tx);
                        break;
                    }
                    for (const [i, action] of tx.actions.entries()) {
                        try {
                            const actionKind = this.parseActionKindApiDto(
                                action.action as TransactionActionKind,
                                tx.receiver_account_id,
                                address,
                            );
                            actions.push({
                                transaction: baseTransaction,
                                actionKind,
                                transactionHash: tx.transaction_hash,
                                indexInTransaction: i,
                                // codeSha256: "", // For DEPLOY_CONTRACT kind
                                gas: tx.outcomes_agg.transaction_fee, // For FUNCTION_CALL kind
                                ...(tx.actions_agg.deposit && {
                                    deposit: this.parseTransactionDeposit(actionKind, tx?.actions_agg.deposit), // For FUNCTION_CALL, TRANSFER kind
                                }),
                                // argsBase64: "", // For FUNCTION_CALL kind
                                // argsJson: "", // For FUNCTION_CALL kind
                                methodName: action.method || undefined,
                                // stake: "", // For STAKE kind
                                // publicKey: baseTransaction.receiverAccountId, // For STAKE, ADD_KEY, DELETE_KEY kind
                                // accessKey: "", // For ADD_KEY kind
                                // beneficiaryId: "", // For DELETE_ACCOUNT kind
                            });
                        } catch (e) {}
                    }
                }
            } catch (e) {}
        }
        return actions;
    }

    private async getLogsFromTx(txHash: string, address: string): Promise<string[]> {
        const provider = new providers.JsonRpcProvider({ url: this.getArchivalNodeUrl() });
        const result = await provider.txStatus(txHash, address);
        if (!result.receipts_outcome) {
            return [];
        }
        const logs = [];

        for (const receipt of result.receipts_outcome) {
            if (receipt.outcome) {
                logs.push(...receipt.outcome.logs);
            }
        }

        return logs;
    }

    private async getAmountFromLogs(logs: string[], address: string, txHash: string): Promise<ValidatorAmount> {
        if (logs.length === 0) {
            logs = await this.getLogsFromTx(txHash, address);
        }

        for (const log of logs) {
            const splittedLogs = log.split(" ");
            if (splittedLogs[0] === `@${address}` && splittedLogs[1] === "withdrawing") {
                const amount = parseInt(splittedLogs[2].slice(0, -1), 10);
                if (!Number.isNaN(amount)) {
                    return { amount, hasRewards: true };
                }
            }
        }

        return { amount: 0, hasRewards: false };
    }

    private async addValidatorAmountsFromTxs(
        txs: NearBlocksTransactionResponseDto,
        valAmounts: ValidatorAmountMap,
        address: string,
    ): Promise<ValidatorAmountMap> {
        for (let i = 0; i < txs.txns.length; i += 1) {
            const tx = txs.txns[i];
            if (!valAmounts[tx.receiver_account_id]) {
                valAmounts[tx.receiver_account_id] = { amount: 0, hasRewards: true };
            }

            if (!tx.actions[0] || valAmounts[tx.receiver_account_id].hasRewards === false) break;

            if ([DEPOSIT_STAKE_METHOD, DEPOSIT_METHOD].includes(tx.actions[0].method || "")) {
                if (!tx.actions_agg || !tx.actions_agg.deposit || tx.actions_agg.deposit <= 0) {
                    valAmounts[tx.receiver_account_id].hasRewards = false;
                } else {
                    valAmounts[tx.receiver_account_id].amount += tx.actions_agg.deposit;
                }
            } else if ([WITHDRAW_METHOD, WITHDRAW_ALL_METHOD].includes(tx.actions[0].method || "")) {
                const { amount, hasRewards } = await this.getAmountFromLogs(tx.logs || [], tx.transaction_hash, address);
                if (hasRewards) {
                    valAmounts[tx.receiver_account_id].amount -= amount;
                } else {
                    valAmounts[tx.receiver_account_id].hasRewards = false;
                }
            }

            // If it reaches negative values, start again
            if (valAmounts[tx.receiver_account_id].amount < 0) {
                valAmounts[tx.receiver_account_id].amount = 0;
            }
        }

        return valAmounts;
    }

    async getStakingDeposits({ address }: NearApiServiceParams): Promise<StakingDeposit[]> {
        const deposits: StakingDeposit[] = [];
        let validatorAmounts: ValidatorAmountMap = {};
        const pageSize = 25;
        const action = TransactionActionKind.FUNCTION_CALL;
        const order = "asc";

        let page = 1;
        let resp = await this.fetch<NearBlocksTransactionResponseDto>(
            `/account/${address}/txns?action=${action}&page=${page}&per_page=${pageSize}&order=${order}`,
        );
        validatorAmounts = await this.addValidatorAmountsFromTxs(resp, validatorAmounts, address);

        while (resp.txns.length === pageSize) {
            page += 1;
            resp = await this.fetch<NearBlocksTransactionResponseDto>(
                `/account/${address}/txns?action=${action}&page=${page}&per_page=${pageSize}&order=${order}`,
            );
            validatorAmounts = await this.addValidatorAmountsFromTxs(resp, validatorAmounts, address);
        }

        for (const key of Object.keys(validatorAmounts)) {
            deposits.push({ validatorId: key, amount: validatorAmounts[key].amount, hasRewards: validatorAmounts[key].hasRewards });
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
        const actions = [];
        let page = 1;
        const pageSize = 10;
        let txns: NearBlocksTransactionDto[] = [];
        do {
            txns = (
                await this.fetch<NearBlocksTransactionResponseDto>(`/account/${address}/txns?page=${page}&per_page=${pageSize}&order=desc`)
            ).txns;
            actions.push(...this.getActionsFromTxs(txns, address));
            page += 1;
        } while (actions.length < 10 && txns.length === pageSize);
        return actions;
    }

    async getActionsFromTransactions(params: NearApiServicePaginatedParams): Promise<Action[]> {
        return this.getRecentActivity(params);
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
        try {
            switch (action) {
                case "TRANSFER_SEND":
                case "TRANSFER_RECEIVE":
                    return convertYoctoToNear(BigInt(deposit).toString());
            }
        } catch (e) {
            return undefined;
        }
    }
}
