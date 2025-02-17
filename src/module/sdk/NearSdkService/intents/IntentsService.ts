import { FailoverRpcProvider, JsonRpcProvider } from "near-api-js/lib/providers";
import { CodeResult } from "near-api-js/lib/providers/provider";
import { INTENTS_TOKEN_LIST } from "./intents.constants";
import { extractTokenIds } from "./utils/extractTokenIds";
import { IntentsChainTokenBalance, IntentsTokenBalance, IntentsTokenChainInfo } from "./intents.types";
import { getEmptyIntentsTokenBalance } from "./utils/getEmptyIntentsTokenBalance";
import { addBalances } from "./utils/addBalances";
import { DepositStatus, PoaBridgeClientService } from "./PoaBridgeClient";

export class IntentsService {
    private readonly poaBridgeClientService: PoaBridgeClientService;
    private readonly provider: FailoverRpcProvider;
    private readonly supportedTokens = INTENTS_TOKEN_LIST;
    private cachedTokenIds: string[] | null = null;

    constructor(rpcUrls: string[]) {
        this.provider = new FailoverRpcProvider(rpcUrls.map((url) => new JsonRpcProvider({ url })));
        this.poaBridgeClientService = new PoaBridgeClientService();
    }

    private getTokenIds(): string[] {
        if (!this.cachedTokenIds) {
            this.cachedTokenIds = extractTokenIds(this.supportedTokens);
        }
        return this.cachedTokenIds;
    }

    /**
     * Get the total balance of the tokens for the given account.
     * @param accountId The account ID to get the token balances for.
     * @returns A list of token balances.
     */
    public async getIntentsTokenBalances(accountId: string): Promise<IntentsTokenBalance[]> {
        const [depositedBalances, transitBalances] = await Promise.all([
            this.fetchDepositedBalances(accountId),
            this.fetchTransitBalances(accountId),
        ]);
        return this.computeTotalIntentsBalances(depositedBalances, transitBalances);
    }

    /**
     * Gets the total balance of the tokens for the given account.
     * @param depositedBalances The deposited balances for the account.
     * @param transitBalances The transit balances for the account.
     * @returns An array of token balances.
     */
    private computeTotalIntentsBalances(
        depositedBalances: Map<string, string>,
        transitBalances: Map<string, string>,
    ): IntentsTokenBalance[] {
        let balances: IntentsTokenBalance[] = [];

        for (const token of this.supportedTokens) {
            const totalBalance: IntentsTokenBalance = getEmptyIntentsTokenBalance(token);

            for (const chainToken of token.groupedTokens || []) {
                const chainBalance: IntentsChainTokenBalance = this.computeChainTokenBalance(
                    chainToken,
                    transitBalances.get(chainToken.defuseAssetId),
                    depositedBalances.get(chainToken.defuseAssetId),
                );

                this.aggregateTokenBalances(totalBalance, chainBalance);
            }

            if (totalBalance.totalBalance !== "0") {
                balances.push(totalBalance);
            }
        }
        return balances;
    }

    /**
     * Compute the total balance of the token on the chain.
     * @param tokenInChainInfo The token information on the chain.
     * @param transitBalance The transit balance of the token.
     * @param depositedBalance The deposited balance of the token.
     * @returns The total balance of the token on the chain.
     */
    private computeChainTokenBalance(
        tokenInChainInfo: IntentsTokenChainInfo,
        transitBalance: string | undefined,
        depositedBalance: string | undefined,
    ): IntentsChainTokenBalance {
        return {
            ...tokenInChainInfo,
            transitBalance: transitBalance || "0",
            depositedBalance: depositedBalance || "0",
            totalBalance: addBalances(transitBalance || "0", depositedBalance || "0"),
        };
    }

    /**
     * If the account has a balance for the given token, aggregate it into the total balance of the token.
     * @param intentsTokenBalance The token balance to aggregate the chain balance into.
     * @param chainTokenBalance The chain balance to aggregate into the token balance.
     */
    private aggregateTokenBalances(intentsTokenBalance: IntentsTokenBalance, chainTokenBalance: IntentsChainTokenBalance): void {
        if (chainTokenBalance.totalBalance === "0") return;

        intentsTokenBalance.chainBalances.push(chainTokenBalance);
        intentsTokenBalance.totalTransitBalance = addBalances(intentsTokenBalance.totalTransitBalance, chainTokenBalance.transitBalance);
        intentsTokenBalance.totalDepositedBalance = addBalances(
            intentsTokenBalance.totalDepositedBalance,
            chainTokenBalance.depositedBalance,
        );
        intentsTokenBalance.totalBalance = addBalances(intentsTokenBalance.totalBalance, chainTokenBalance.totalBalance);
    }

    /**
     * Get the deposited balances for the given account.
     * @param accountId The account ID to get the deposited balances for.
     * @returns A map of token IDs to deposited balances.
     */
    private async fetchDepositedBalances(accountId: string): Promise<Map<string, string>> {
        const tokenIds = this.getTokenIds();
        let balances: string[] = [];

        try {
            const output = await this.provider.query<CodeResult>({
                request_type: "call_function",
                account_id: "intents.near",
                method_name: "mt_batch_balance_of",
                args_base64: Buffer.from(JSON.stringify({ account_id: accountId, token_ids: tokenIds })).toString("base64"),
                finality: "optimistic",
            });

            balances = JSON.parse(Buffer.from(output.result).toString());
        } catch {}

        return new Map(tokenIds.map((tokenId, index) => [tokenId, balances[index] || "0"]));
    }

    /**
     * Get the transit balances for the given account.
     * @param accountId The account ID to get the transit balances for.
     * @returns A map of token IDs to transit balances.
     */
    private async fetchTransitBalances(accountId: string): Promise<Map<string, string>> {
        const tokenIds = this.getTokenIds();
        let deposits: DepositStatus[] = [];

        try {
            deposits = (await this.poaBridgeClientService.getDepositStatus({ account_id: accountId })).deposits;
        } catch {}

        const result = new Map<string, string>();
        for (const deposit of deposits) {
            const tokenId = `nep141:${deposit.near_token_id}`;
            if (tokenIds.includes(tokenId) && deposit.status === "PENDING") {
                result.set(tokenId, BigInt(deposit.amount).toString());
            }
        }
        return result;
    }
}
