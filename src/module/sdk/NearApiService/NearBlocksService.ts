/**
 * Do not `import {config} from "config"` in this file
 * because it will cause a circular dependency with SettingsState
 */
import config from "../../../config/config";
import { Action, Chains } from "../NearSdkService";
import { DEPOSIT_STAKE_METHOD } from "../utils";
import { FetchService } from "./FetchService";
import {
    NearApiServiceParams,
    NearBlocsTransactionResponseDto,
    NearblocksAccessKeyResponseDto,
    NearblocksTokenResponseDto,
    StakingDepositApiDto,
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

    async getAccountDeposits({ address }: NearApiServiceParams): Promise<StakingDepositApiDto[]> {
        const deposits: StakingDepositApiDto[] = [];
        const pageSize = 25;
        const method = DEPOSIT_STAKE_METHOD;
        const order = "asc";

        let page = 1;
        let { txns } = await this.fetch<NearBlocsTransactionResponseDto>(
            `/txns/?from=${address}&method=${method}&page=${page}&per_page=${pageSize}&order=${order}`,
        );
        deposits.push(...txns.map((tx) => ({ validator_id: tx.receiver_account_id, deposit: tx.actions_agg.deposit.toString() })));

        while (txns.length === pageSize) {
            page += 1;
            ({ txns } = await this.fetch<NearBlocsTransactionResponseDto>(
                `/txns/?from=${address}&method=${method}&page=${page}&per_page=${pageSize}&order=${order}`,
            ));
            deposits.push(...txns.map((tx) => ({ validator_id: tx.receiver_account_id, deposit: tx.actions_agg.deposit.toString() })));
        }

        return deposits;
    }

    /*    private async getAccountTransactions({ address }: NearApiServiceParams): Promise<Action[]> {
        const baseTxs = await this.fetch<NearBlocsTransactionResponseDto>(`/account/${address}/txns?page=1&per_page=10&order=desc`);

        const txs: Action[] = baseTxs.txns.map((tx) => {
            const baseTransaction: TransactionWithoutActions = {
                transactionHash: tx.transaction_hash,
                includedInBlockHash: tx.included_in_block_hash,
                blockTimestamp: tx.block_timestamp,
                signerAccountId: tx.predecessor_account_id,
                nonce: 2,
                receiverAccountId: tx.receiver_account_id,
            };
            return {
                transaction: baseTransaction,
            };
        });
        return [];
    } */

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

    private async getAccountTokens({ address }: NearApiServiceParams): Promise<NearblocksTokenResponseDto> {
        return await this.fetch<NearblocksTokenResponseDto>(`/account/${address}/tokens`);
    }

    async getLikelyTokens({ address }: NearApiServiceParams): Promise<string[]> {
        return (await this.getAccountTokens({ address })).tokens.fts;
    }

    async getLikelyNfts({ address }: NearApiServiceParams): Promise<string[]> {
        return (await this.getAccountTokens({ address })).tokens.nfts;
    }

    async getRecentActivity({ address }: NearApiServiceParams): Promise<Action[]> {
        return [] as any;
    }
}
