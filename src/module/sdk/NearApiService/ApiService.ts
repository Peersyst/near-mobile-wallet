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

    private async getRequestsInParallel<NBR, FNR>(
        nearBlocksRequest: Promise<NBR>,
        fastNearRequest: Promise<FNR>,
    ): Promise<[NBR | undefined, FNR | undefined]> {
        //Check if `allSettled` method is supported
        if (typeof Promise.allSettled !== "function") return [await nearBlocksRequest, await fastNearRequest];

        const responseArray: [NBR | undefined, FNR | undefined] = [undefined, undefined];
        const results = await Promise.allSettled([nearBlocksRequest, fastNearRequest]);

        for (const [index, result] of results.entries()) {
            if (result.status === "fulfilled") {
                responseArray[index] = result.value;
            } else {
                // eslint-disable-next-line no-console
                console.error("Error in api service", JSON.stringify(result.reason));
            }
        }

        return responseArray;
    }

    /**
     * NearApiServiceInterface methods
     */

    async getAccountsFromPublicKey({ address }: NearApiServiceParams): Promise<string[]> {
        const [nearBlocksAccounts = [], fastNearAccounts = []] = await this.getRequestsInParallel(
            this.nearblocksService.getAccountsFromPublicKey({ address }),
            this.fastNearService.getAccountsFromPublicKey({ address }),
        );
        const accounts = [...new Set([...nearBlocksAccounts, ...fastNearAccounts])];

        return this.parseNearAccounts(accounts);
    }

    async getStakingDeposits({ address }: NearApiServiceParams): Promise<StakingDeposit[]> {
        const stakingDeposits: StakingDeposit[] = [];
        const stakingDepositSet: Set<string> = new Set();

        const [nearBlocksStakingDeposits = [], fastNearStakingDeposits = []] = await this.getRequestsInParallel(
            this.nearblocksService.getStakingDeposits({ address }),
            this.fastNearService.getStakingDeposits({ address }),
        );

        for (const stakingDeposit of nearBlocksStakingDeposits) {
            stakingDepositSet.add(stakingDeposit.validatorId);
            stakingDeposits.push(stakingDeposit);
        }

        for (const stakingDeposit of fastNearStakingDeposits) {
            if (!stakingDepositSet.has(stakingDeposit.validatorId)) {
                stakingDeposits.push(stakingDeposit);
            }
        }
        return stakingDeposits;
    }

    async getLikelyTokens({ address, chain }: NearApiServiceParams): Promise<string[]> {
        const [nearBlocksContractsIds = [], fastNearContractsIds = []] = await this.getRequestsInParallel(
            this.nearblocksService.getLikelyTokens({ address }),
            this.fastNearService.getLikelyTokens({ address }),
        );

        const contractIdsSet = new Set([...nearBlocksContractsIds, ...fastNearContractsIds]);

        if (chain === Chains.MAINNET) {
            if (!contractIdsSet.has("game.hot.tg")) {
                contractIdsSet.add("game.hot.tg");
            }
        }
        return this.parseNearAccounts([...contractIdsSet]);
    }

    async getLikelyNfts({ address }: NearApiServiceParams): Promise<string[]> {
        const [nearBlocksContractsIds = [], fastNearContractsIds = []] = await this.getRequestsInParallel(
            this.nearblocksService.getLikelyNfts({ address }),
            this.fastNearService.getLikelyNfts({ address }),
        );

        const contractIds = [...new Set([...nearBlocksContractsIds, ...fastNearContractsIds])];

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
