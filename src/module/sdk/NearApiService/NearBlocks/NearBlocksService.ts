/**
 * Do not `import {config} from "config"` in this file
 * because it will cause a circular dependency with SettingsState
 */
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
import { parseBlockTimestamp, convertYoctoToNear, addNearAmounts } from "../../utils";
import { FetchService } from "../common/FetchService";
import { NearApiServiceInterface, NearApiServicePaginatedParams, NearApiServiceParams } from "../NearApiService.types";
import {
    NearBlocksTransactionResponseDto,
    NearblocksAccessKeyResponseDto,
    NearBlocksTokenResponseDto,
    NearBlocksTransactionDto,
    NearBlocksActionDto,
    NearBlocksKitWalletStakingDepositsResponseDto,
    NearBlocksActivityDto,
} from "./NearBlocksService.types";

export class NearBlocksService extends FetchService implements NearApiServiceInterface {
    public chain: Chains;
    public apiUrl: string;
    public archivalNodeUrl: string;

    constructor(chain: Chains) {
        super();
        this.chain = chain;
        this.apiUrl = this.chain === Chains.MAINNET ? config.nearblocksMainnetApiUrl : config.nearblocksTesnetApiUrl;
        this.archivalNodeUrl = this.chain === Chains.MAINNET ? config.mainnetArchivalNodeUrl : config.testnetArchivalNodeUrl;
    }

    private fetch<T>(path: string): Promise<T> {
        return this.handleFetch<T>(`${this.apiUrl}${path}`);
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
                                ...(tx?.actions && {
                                    deposit: this.getDepositFromActions(tx?.actions),
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

    private getDepositFromActions(actions: NearBlocksTransactionDto["actions"]): string | undefined {
        if (!actions) return "0";

        const deposit = actions.reduce((acc: string, current: NearBlocksActionDto) => {
            return current.deposit ? addNearAmounts(BigInt(acc).toString(), BigInt(current.deposit).toString()) : acc;
        }, BigInt(0).toString());

        return convertYoctoToNear(deposit.toString());
    }

    async getStakingDeposits({ address }: NearApiServiceParams): Promise<StakingDeposit[]> {
        const stakingDeposits = await this.fetch<NearBlocksKitWalletStakingDepositsResponseDto>(`/kitwallet/staking-deposits/${address}`);

        return stakingDeposits.map(({ validator_id, deposit }) => ({
            validatorId: validator_id,
            amount: deposit,
            hasRewards: true,
        }));
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
        try {
            const activities = await this.fetch<NearBlocksActivityDto[]>(`/kitwallet/account/${address}/activities`);

            return activities.map((activity) => {
                const transaction: TransactionWithoutActions = {
                    transactionHash: activity.hash,
                    includedInBlockHash: activity.block_hash,
                    blockTimestamp: String(BigInt(activity.block_timestamp) / BigInt(1000000)),
                    signerAccountId: activity.signer_id,
                    receiverAccountId: activity.receiver_id,
                };
                const action: Action = {
                    actionKind: this.parseActionKindApiDto(activity.action_kind, activity.receiver_id, address),
                    transaction: transaction,
                    transactionHash: activity.hash,
                    indexInTransaction: activity.action_index,
                    ...(activity.args.code_sha_256 && { gas: Number(activity.args.code_sha_256) }), // For FUNCTION_CALL kind
                    ...(activity.args.gas && { gas: Number(activity.args.gas ?? 0) }), // For FUNCTION_CALL kind
                    ...(activity.args.deposit && { deposit: convertYoctoToNear(activity.args.deposit) }), // For
                    ...(activity.args.args_base64 && { argsBase64: activity.args.args_base64 }), // For FUNCTION_CALL kind
                    ...(activity.args.args_json && { argsJson: activity.args.args_json }), // For FUNCTION_CALL kind
                    ...(activity.args.method_name && { methodName: activity.args.method_name }), // For FUNCTION_CALL kind
                    ...(activity.args.stake && { stake: convertYoctoToNear(activity.args.stake) }), // For STAKE kind
                    ...(activity.args.public_key && { publicKey: activity.args.public_key }), // For STAKE, ADD_KEY, DELETE_KEY kind
                    // ...(activity.args.access_key && { accessKey: activity.args.access_key }), // For ADD_KEY kind
                    ...(activity.args.beneficiary_id && { beneficiaryId: activity.args.beneficiary_id }), // For DELETE_ACCOUNT kind
                };
                return action;
            });
        } catch (e) {
            return [];
        }
    }

    async getPaginatedActions({ address, page = 1, pageSize = 10 }: NearApiServicePaginatedParams): Promise<Action[]> {
        const actions = [];

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
}
