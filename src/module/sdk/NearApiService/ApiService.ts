import { Action, Chains, StakingDeposit } from "../NearSdkService";
import { FetchService } from "./common/FetchService";
import { NearApiServiceInterface, NearApiServicePaginatedParams, NearApiServiceParams } from "./NearApiService.types";
import { NearBlocksService } from "./NearBlocks/NearBlocksService";
import { FastNearService } from "./FastNear/FastNearService";

export class ApiService extends FetchService implements NearApiServiceInterface {
    nearblocksService: NearBlocksService;
    fastNearService: FastNearService;

    constructor(chain: Chains) {
        super();
        this.nearblocksService = new NearBlocksService(chain);
        this.fastNearService = new FastNearService(chain);
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
        let newAccounts: string[] = [];
        try {
            newAccounts = await this.nearblocksService.getAccountsFromPublicKey({ address });
        } catch (error: unknown) {}
        let oldAccounts: string[] = [];
        try {
            oldAccounts = await this.fastNearService.getAccountsFromPublicKey({ address });
        } catch (error: unknown) {}
        const accounts = [...new Set([...newAccounts, ...oldAccounts])];

        return this.parseNearAccounts(accounts);
    }

    async getStakingDeposits({ address }: NearApiServiceParams): Promise<StakingDeposit[]> {
        try {
            return await this.nearblocksService.getStakingDeposits({ address });
        } catch (error: unknown) {
            return [];
        }
    }

    async getLikelyTokens({ address, chain }: NearApiServiceParams): Promise<string[]> {
        let newContractIds: string[] = [];
        try {
            newContractIds = await this.nearblocksService.getLikelyTokens({ address });
        } catch (error: unknown) {}
        let oldContractIds: string[] = [];
        try {
            oldContractIds = await this.fastNearService.getLikelyTokens({ address });
        } catch (e) {}
        const contractIds = [...new Set([...newContractIds, ...oldContractIds])];

        if (chain === Chains.MAINNET) {
            if (!contractIds.includes("game.hot.tg")) {
                contractIds.push("game.hot.tg");
            }
        }
        return this.parseNearAccounts(contractIds);
    }

    async getLikelyNfts({ address }: NearApiServiceParams): Promise<string[]> {
        let newContractIds: string[] = [];
        try {
            newContractIds = await this.nearblocksService.getLikelyNfts({ address });
        } catch (error: unknown) {}
        let oldContractIds: string[] = [];
        try {
            oldContractIds = await this.fastNearService.getLikelyNfts({ address });
        } catch (error: unknown) {}
        const contractIds = [...new Set([...newContractIds, ...oldContractIds])];

        return this.parseNearAccounts(contractIds);
    }

    async getRecentActivity({ address }: NearApiServiceParams): Promise<Action[]> {
        try {
            return await this.nearblocksService.getRecentActivity({ address });
        } catch (error: unknown) {
            return [];
        }
    }

    async getActionsFromTransactions({ address }: NearApiServicePaginatedParams): Promise<Action[]> {
        return await this.getRecentActivity({ address });
    }
}
