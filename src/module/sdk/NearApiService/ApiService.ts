import {
    AccessKey,
    Action,
    ActionKind,
    EnhancedTransactionActionKind,
    StakingDeposit,
    TransactionActionKind,
    TransactionWithoutActions,
} from "../NearSdkService";
import { convertYoctoToNear, parseBlockTimestamp } from "../utils";
import { FetchService } from "./FetchService";
import {
    AccessKeyApiDto,
    LikelyResponseApiDto,
    NearApiServiceInterface,
    NearApiServicePaginatedParams,
    NearApiServiceParams,
    StakingDepositApiDto,
    ActionApiDto,
} from "./NearApiService.types";

export class ApiService extends FetchService implements NearApiServiceInterface {
    public endPoint: string;
    constructor(endpoint: string) {
        super();
        this.endPoint = endpoint;
    }

    /**
     * Parsers
     */
    private parseStakingDepositApiDtoDto(stkgDep: StakingDepositApiDto): StakingDeposit {
        return { validatorId: stkgDep.validator_id, amount: parseInt(stkgDep.deposit, 10) };
    }

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

    /**
     * NearApiServiceInterface methods
     */

    async getAccountsFromPublicKey({ address }: NearApiServiceParams): Promise<string[]> {
        return await this.handleFetch<string[]>(`${this.endPoint}/publicKey/${address}/accounts`);
    }

    async getStakingDeposits({ address }: NearApiServiceParams): Promise<StakingDeposit[]> {
        const apiDeposits = await this.handleFetch<StakingDepositApiDto[]>(`${this.endPoint}/staking-deposits/${address}`);
        return apiDeposits.map(this.parseStakingDepositApiDtoDto);
    }

    async getLikelyTokens({ address }: NearApiServiceParams): Promise<string[]> {
        return [
            "wrap.near",
            "a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.factory.bridge.near",
            "dac17f958d2ee523a2206206994597c13d831ec7.factory.bridge.near",
            "6b175474e89094c44da98b954eedeac495271d0f.factory.bridge.near",
            "c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.factory.bridge.near",
            "111111111117dc0aa78b770fa6a738034120c302.factory.bridge.near",
            "c944e90c64b2c07662a292be6244bdf05cda44a7.factory.bridge.near",
            "token.skyward.near",
            "token.v2.ref-finance.near",
            "berryclub.ek.near",
            "6f259637dcd74c767781e37bc6133cd6a68aa161.factory.bridge.near",
            "de30da39c46104798bb5aa3fe8b9e0e1f348163f.factory.bridge.near",
            "1f9840a85d5af5bf1d1762f925bdaddc4201f984.factory.bridge.near",
            "2260fac5e5542a773aa44fbcfedf7c193bc2c599.factory.bridge.near",
            "514910771af9ca656af840dff83e8264ecf986ca.factory.bridge.near",
            "token.paras.near",
            "meta-pool.near",
            "marmaj.tkn.near",
            "52a047ee205701895ee06a375492490ec9c597ce.factory.bridge.near",
        ];
    }

    async getLikelyNfts({ address }: NearApiServiceParams): Promise<string[]> {
        return (
            await this.handleFetch<LikelyResponseApiDto>(`${this.endPoint}/account/${address}/likelyNFTsFromBlock?fromBlockTimestamp=0`)
        ).list;
    }

    async getRecentActivity({ address }: NearApiServiceParams): Promise<Action[]> {
        const txs = await this.handleFetch<ActionApiDto[]>(`${this.endPoint}/account/${address}/activity`);
        return txs.map((tx) => this.parseActionApiDto(tx, address));
    }

    async getActionsFromTransactions({ address }: NearApiServicePaginatedParams): Promise<Action[]> {
        return await this.getRecentActivity({ address });
    }
}
