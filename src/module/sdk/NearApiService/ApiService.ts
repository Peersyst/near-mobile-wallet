import { Action, Chains, StakingDeposit } from "../NearSdkService";
import { FetchService } from "./FetchService";
import { NearApiServiceInterface, NearApiServicePaginatedParams, NearApiServiceParams } from "./NearApiService.types";
import { NearBlocksService } from "./NearBlocks/NearBlocksService";
import { KitWalletService } from "./KitWallet/KitWalletService";

export class ApiService extends FetchService implements NearApiServiceInterface {
    baseUrl: string;
    nearblocksService: NearBlocksService;
    kitWalletService: KitWalletService;

    constructor(endpoint: string, chain: Chains) {
        super();
        this.baseUrl = endpoint;
        this.nearblocksService = new NearBlocksService(chain);
        this.kitWalletService = new KitWalletService(endpoint);
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
            // Hope for kitwallet magic but with a timeout
            oldAccounts = await this.kitWalletService.getAccountsFromPublicKey({ address });
        } catch (error: unknown) {}
        const accounts = [...new Set([...newAccounts, ...oldAccounts])];

        return this.parseNearAccounts(accounts);
    }

    async getStakingDeposits({ address }: NearApiServiceParams): Promise<StakingDeposit[]> {
        try {
            return await this.nearblocksService.getAccountDeposits({ address });
        } catch (error: unknown) {
            try {
                // Hope for kitwallet magic
                return await this.kitWalletService.getStakingDeposits({ address });
            } catch (error: unknown) {
                return [];
            }
        }
    }

    async getLikelyTokens({ address, chain }: NearApiServiceParams): Promise<string[]> {
        let contractIds: string[] = [];
        try {
            contractIds = await this.nearblocksService.getLikelyTokens({ address });
        } catch (error: unknown) {
            try {
                // Hope for kitwallet magic
                contractIds = await this.kitWalletService.getLikelyTokens({ address });
            } catch (error: unknown) {}
        }
        if (chain === Chains.MAINNET) {
            if (!contractIds.includes("game.hot.tg")) {
                contractIds.push("game.hot.tg");
            }
        }
        return this.parseNearAccounts(contractIds);
    }

    async getLikelyNfts({ address }: NearApiServiceParams): Promise<string[]> {
        let contractIds: string[] = [];
        try {
            contractIds = await this.nearblocksService.getLikelyNfts({ address });
        } catch (error: unknown) {
            try {
                // Hope for kitwallet magic
                contractIds = await this.kitWalletService.getLikelyNfts({ address });
            } catch (error: unknown) {}
        }
        return this.parseNearAccounts(contractIds);
    }

    async getRecentActivity({ address }: NearApiServiceParams): Promise<Action[]> {
        try {
            return await this.nearblocksService.getRecentActivity({ address });
        } catch (error: unknown) {
            try {
                // Hope for kitwallet magic
                return await this.kitWalletService.getRecentActivity({ address });
            } catch (error: unknown) {
                return [];
            }
        }
    }

    async getActionsFromTransactions({ address }: NearApiServicePaginatedParams): Promise<Action[]> {
        return await this.getRecentActivity({ address });
    }
}
