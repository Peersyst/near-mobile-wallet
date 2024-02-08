import {
    AccessKey,
    Action,
    ActionKind,
    Chains,
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
    public baseUrl: string;
    constructor(endpoint: string) {
        super();
        this.baseUrl = endpoint;
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

    private parseNearAccount(accountId: string): string {
        if (accountId.endsWith(".mainnet")) {
            return accountId.replace(".mainnet", ".near");
        }
        return accountId;
    }

    private parseNearAccounts(accounts: string[]): string[] {
        return accounts.map((account) => this.parseNearAccount(account));
    }

    /**
     * NearApiServiceInterface methods
     */

    async getAccountsFromPublicKey({ address }: NearApiServiceParams): Promise<string[]> {
        const accounts = await this.handleFetch<string[]>(`${this.baseUrl}/publicKey/${address}/accounts`);
        return this.parseNearAccounts(accounts);
    }

    async getStakingDeposits({ address }: NearApiServiceParams): Promise<StakingDeposit[]> {
        const apiDeposits = await this.handleFetch<StakingDepositApiDto[]>(`${this.baseUrl}/staking-deposits/${address}`);
        return apiDeposits.map(this.parseStakingDepositApiDtoDto);
    }

    async getLikelyTokens({ address, chain }: NearApiServiceParams): Promise<string[]> {
        const contractIds = (
            await this.handleFetch<LikelyResponseApiDto>(`${this.baseUrl}/account/${address}/likelyTokensFromBlock?fromBlockTimestamp=0`)
        ).list;
        if (chain === Chains.MAINNET) {
            if (!contractIds.includes("game.hot.tg")) {
                contractIds.push("game.hot.tg");
            }
        }
        return this.parseNearAccounts(contractIds);
    }

    async getLikelyNfts({ address }: NearApiServiceParams): Promise<string[]> {
        const contractIds = (
            await this.handleFetch<LikelyResponseApiDto>(`${this.baseUrl}/account/${address}/likelyNFTsFromBlock?fromBlockTimestamp=0`)
        ).list;
        return this.parseNearAccounts(contractIds);
    }

    async getRecentActivity({ address }: NearApiServiceParams): Promise<Action[]> {
        const txs = await this.handleFetch<ActionApiDto[]>(`${this.baseUrl}/account/${address}/activity`);
        return txs.map((tx) => this.parseActionApiDto(tx, address));
    }

    async getActionsFromTransactions({ address }: NearApiServicePaginatedParams): Promise<Action[]> {
        return await this.getRecentActivity({ address });
    }
}
