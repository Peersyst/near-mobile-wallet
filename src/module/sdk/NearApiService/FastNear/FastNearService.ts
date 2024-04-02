import { StakingDeposit, Action, Chains } from "module/sdk/NearSdkService";
import { FetchService } from "../common/FetchService";
import { NearApiServiceInterface, NearApiServicePaginatedParams, NearApiServiceParams } from "../NearApiService.types";
import config from "config/config";
import {
    FastNearAccountsFromPublicKeyResponseDto,
    FastNearFTFromAccountIdResponseDto,
    FastNearNFTFromAccountIdResponseDto,
} from "./FastNearService.types";
import { timeoutPromise } from "@peersyst/react-utils";

export class FastNearService extends FetchService implements NearApiServiceInterface {
    public chain: Chains;

    constructor(chain: Chains) {
        super();
        this.chain = chain;
    }

    private isValidNearAccount(accountId: string): boolean {
        if (this.chain === Chains.MAINNET) {
            return !accountId.endsWith(".testnet");
        } else {
            return ![".near", ".tg"].some((suffix) => accountId.endsWith(suffix));
        }
    }

    private getNearblocksApiUrlFromChain(): string {
        if (this.chain === Chains.MAINNET) {
            return config.fastMainnetNearApiUrl;
        }
        throw new Error("Not implemented");
    }

    private async fetch<T>(path: string): Promise<T> {
        const nearBlocksApi = this.getNearblocksApiUrlFromChain();
        const fetchPromise = this.handleFetch<T>(`${nearBlocksApi}${path}`);
        return await timeoutPromise<T>(fetchPromise, config.apiRequestTimeout);
    }

    private filterAccountIds(accountIds: string[]): string[] {
        return accountIds.filter((acc) => this.isValidNearAccount(acc));
    }

    async getAccountsFromPublicKey({ address }: NearApiServiceParams): Promise<string[]> {
        const { account_ids } = await timeoutPromise<FastNearAccountsFromPublicKeyResponseDto>(
            this.handleFetch(`https://api.fastnear.com/v0/public_key/${address}`),
            config.apiRequestTimeout,
        );
        return this.filterAccountIds(account_ids);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getStakingDeposits(_params: NearApiServiceParams): Promise<StakingDeposit[]> {
        //TODO: use https://api.fastnear.com/v0/account/root.near/staking to get the list of staking pools from an account
        return Promise.resolve([]);
    }

    async getLikelyTokens({ address }: NearApiServiceParams): Promise<string[]> {
        const { tokens } = await this.fetch<FastNearFTFromAccountIdResponseDto>(`/account/${address}/ft`);
        return this.filterAccountIds(tokens.map(({ contract_id }) => contract_id));
    }

    async getLikelyNfts({ address }: NearApiServiceParams): Promise<string[]> {
        const { tokens } = await this.fetch<FastNearNFTFromAccountIdResponseDto>(`/account/${address}/nft`);
        return this.filterAccountIds(tokens.map(({ contract_id }) => contract_id));
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getRecentActivity(_params: NearApiServiceParams): Promise<Action[]> {
        return Promise.resolve([]);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getActionsFromTransactions(_params: NearApiServicePaginatedParams): Promise<Action[]> {
        return Promise.resolve([]);
    }
}
