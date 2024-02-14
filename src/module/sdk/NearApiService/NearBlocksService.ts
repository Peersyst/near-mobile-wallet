import { config } from "config";
import { Chains } from "../NearSdkService";
import { FetchService } from "./FetchService";
import { NearApiServiceParams, NearblocksAccessKeyResponseDto } from "./NearApiService.types";

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
}
