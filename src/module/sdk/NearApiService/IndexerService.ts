import {
    Action,
    ActionKind,
    EnhancedTransactionActionKind,
    StakingDeposit,
    TransactionActionKind,
    TransactionWithoutActions,
} from "../NearSdkService";
import { FetchService } from "./FetchService";
import {
    NearApiServiceInterface,
    NearApiServicePaginatedParams,
    NearApiServiceParams,
    TransactionActionIndexerDto,
    TransactionIndexerDto,
} from "./NearApiService.types";

export class IndexerService extends FetchService implements NearApiServiceInterface {
    public endPoint: string;
    constructor(endpoint: string) {
        super();
        this.endPoint = endpoint;
    }
    /**
     * Parsers
     */
    private parseActionKindIndexerDto(
        actionKind: TransactionActionIndexerDto["actionKind"],
        receiverAccountId: TransactionIndexerDto["receiverAccountId"],
        account: string,
    ): ActionKind {
        const isReceiver = receiverAccountId === account;
        const isTransfer = actionKind === TransactionActionKind.TRANSFER;
        return isTransfer
            ? isReceiver
                ? EnhancedTransactionActionKind.TRANSFER_RECEIVE
                : EnhancedTransactionActionKind.TRANSFER_SEND
            : (actionKind as ActionKind);
    }

    private parseTransactionActionIndexerDto(
        action: TransactionActionIndexerDto,
        transaction: TransactionIndexerDto,
        account: string,
    ): Action {
        const { transactionActions, ...rest } = transaction || {};
        const finalTransaction: TransactionWithoutActions = {
            ...rest,
        };
        return {
            transaction: finalTransaction,
            actionKind: this.parseActionKindIndexerDto(action.actionKind, finalTransaction.receiverAccountId, account),
            transactionHash: finalTransaction.transactionHash,
            indexInTransaction: action.indexInTransaction,
            gas: action.args?.gas,
            deposit: action.args?.deposit,
            argsBase64: action.args?.args_base64,
            argsJson: action.args?.args_json,
            methodName: action.args?.method_name,
            stake: action.args?.stake,
            publicKey: action.args?.public_key,
            accessKey: action.args?.access_key
                ? {
                      nonce: action.args.access_key.nonce,
                      permission: {
                          permissionKind: action.args.access_key.permission?.permission_kind,
                          permissionDetails: action.args.access_key.permission?.permission_details
                              ? {
                                    allowance: action.args.access_key.permission.permission_details.allowance,
                                    receiverId: action.args.access_key.permission.permission_details.receiver_id,
                                    methodNames: action.args.access_key.permission.permission_details.method_names,
                                }
                              : undefined,
                      },
                  }
                : undefined,
            beneficiaryId: action.args?.beneficiary_id,
        };
    }

    /**
     * NearApiServiceInterface methods
     */
    async getAccountsFromPublicKey({ address }: NearApiServiceParams): Promise<string[]> {
        return await this.handleFetch<string[]>(`${this.endPoint}/accounts/public-key/${address}`);
    }
    async getStakingDeposits({ address }: NearApiServiceParams): Promise<StakingDeposit[]> {
        return await this.handleFetch<StakingDeposit[]>(`${this.endPoint}/accounts/${address}/staking-deposits`);
    }
    async getLikelyTokens({ address }: NearApiServiceParams): Promise<string[]> {
        return await this.handleFetch<string[]>(`${this.endPoint}/accounts/${address}/likely-tokens?fromBlockTimestamp=0`);
    }
    async getLikelyNfts({ address }: NearApiServiceParams): Promise<string[]> {
        return await this.handleFetch<string[]>(`${this.endPoint}/accounts/${address}/likely-nfts?fromBlockTimestamp=0`);
    }
    async getActionsFromTransactions({ address, page = 0, pageSize = 15 }: NearApiServicePaginatedParams): Promise<Action[]> {
        const txsIndexerDto = await this.handleFetch<TransactionIndexerDto[]>(
            `${this.endPoint}/transactions/?accountId=${address}&page=${page}&pageSize=${pageSize}`,
        );
        const actions: Action[] = [];
        txsIndexerDto.forEach((tx) => {
            tx.transactionActions.forEach((action) => {
                actions.push(this.parseTransactionActionIndexerDto(action, tx, address));
            });
        });
        return actions;
    }
    async getRecentActivity(params: NearApiServiceParams): Promise<Action[]> {
        return await this.getActionsFromTransactions({ ...params, page: 0, pageSize: 10 });
    }
}
