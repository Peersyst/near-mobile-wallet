import { timeoutPromise } from "@peersyst/react-utils";
import {
    AccessKey,
    Action,
    ActionKind,
    EnhancedTransactionActionKind,
    StakingDeposit,
    TransactionActionKind,
    TransactionWithoutActions,
} from "../../NearSdkService";
import { convertYoctoToNear, parseBlockTimestamp } from "../../utils";
import { FetchService } from "../FetchService";
import { NearApiServiceParams, NearApiServiceInterface, NearApiServicePaginatedParams } from "../NearApiService.types";
import config from "config/config";
import { ActionApiDto, AccessKeyApiDto, StakingDepositApiDto, LikelyResponseApiDto } from "./KitWalletService.types";

export class KitWalletService extends FetchService implements NearApiServiceInterface {
    public baseUrl: string;

    constructor(endpoint: string) {
        super();
        this.baseUrl = endpoint;
    }

    private async fetch<T>(path: string): Promise<T> {
        const fetchPromise = this.handleFetch<T>(`${this.baseUrl}${path}`);
        return await timeoutPromise<T>(fetchPromise, config.kitWalletTimeout);
    }

    /**
     * Parsers
     */
    private parseActionKindApiDto(transactionActionIndexerDto: ActionApiDto, account: string): ActionKind {
        const isReceiver = transactionActionIndexerDto.receiver_id === account;
        const isTransfer = transactionActionIndexerDto.action_kind === TransactionActionKind.TRANSFER;
        return isTransfer
            ? isReceiver
                ? EnhancedTransactionActionKind.TRANSFER_RECEIVE
                : EnhancedTransactionActionKind.TRANSFER_SEND
            : (transactionActionIndexerDto.action_kind as ActionKind);
    }

    private parseAccessKeyApiDto(accessKey: AccessKeyApiDto): AccessKey {
        return {
            nonce: accessKey.nonce,
            permission: {
                ...(accessKey.permission?.permission_kind && {
                    permissionKind: accessKey.permission?.permission_kind,
                }),
                ...(accessKey.permission?.permission_details && {
                    permissionDetails: {
                        allowance: accessKey.permission.permission_details.allowance,
                        receiverId: accessKey.permission.permission_details.receiver_id,
                        methodNames: accessKey.permission.permission_details.method_names,
                    },
                }),
            },
        };
    }

    private parseActionApiDto(actionApiDto: ActionApiDto, account: string): Action {
        const { args, hash, block_hash, block_timestamp, signer_id, receiver_id } = actionApiDto || {};
        const transaction: TransactionWithoutActions = {
            transactionHash: hash,
            includedInBlockHash: block_hash,
            blockTimestamp: parseBlockTimestamp(block_timestamp),
            signerAccountId: signer_id,
            receiverAccountId: receiver_id,
        };
        const { code_sha256, gas, deposit, args_base64, args_json, method_name, stake, public_key, access_key, beneficiary_id } =
            args || {};
        return {
            transaction,
            transactionHash: actionApiDto.hash,
            indexInTransaction: actionApiDto.action_index,
            actionKind: this.parseActionKindApiDto(actionApiDto, account),
            argsJson: args_json, // For FUNCTION_CALL kind
            ...(code_sha256 && { codeSha256: code_sha256 }), // For DEPLOY_CONTRACT kind
            ...(gas && { gas }), // For FUNCTION_CALL kind
            ...(deposit && { deposit: convertYoctoToNear(deposit) }), //
            ...(args_base64 && { argsBase64: args_base64 }), // For FUNCTION_CALL kind
            ...(method_name && { methodName: method_name }), // For FUNCTION_CALL kind
            ...(stake && { stake: convertYoctoToNear(stake) }), // For STAKE kind
            ...(public_key && { publicKey: public_key }), // For STAKE, ADD_KEY, DELETE_KEY kind
            ...(access_key && { accessKey: this.parseAccessKeyApiDto(access_key) }), // For ADD_KEY kind
            ...(beneficiary_id && { beneficiaryId: beneficiary_id }), // For DELETE_ACCOUNT kind
        };
    }

    private parseStakingDepositApiDtoDto(stkgDep: StakingDepositApiDto): StakingDeposit {
        return { validatorId: stkgDep.validator_id, amount: parseInt(stkgDep.deposit, 10) };
    }

    /**
     * METHODS
     */
    public async getAccountsFromPublicKey({ address }: NearApiServiceParams): Promise<string[]> {
        return await this.fetch<string[]>(`/publicKey/${address}/accounts`);
    }

    public async getStakingDeposits({ address }: NearApiServiceParams): Promise<StakingDeposit[]> {
        const apiDeposits: StakingDepositApiDto[] = await this.fetch<StakingDepositApiDto[]>(`/staking-deposits/${address}`);
        return apiDeposits.map(this.parseStakingDepositApiDtoDto);
    }

    public async getLikelyTokens({ address }: NearApiServiceParams): Promise<string[]> {
        return (await this.fetch<LikelyResponseApiDto>(`/account/${address}/likelyTokensFromBlock?fromBlockTimestamp=0`)).list;
    }

    public async getLikelyNfts({ address }: NearApiServiceParams): Promise<string[]> {
        return (await this.fetch<LikelyResponseApiDto>(`/account/${address}/likelyNFTsFromBlock?fromBlockTimestamp=0`)).list;
    }

    public async getRecentActivity({ address }: NearApiServiceParams): Promise<Action[]> {
        const txs = await this.fetch<ActionApiDto[]>(`/account/${address}/activity`);
        return txs.map((tx) => this.parseActionApiDto(tx, address));
    }

    public async getActionsFromTransactions(params: NearApiServicePaginatedParams): Promise<Action[]> {
        return await this.getRecentActivity(params);
    }
}
