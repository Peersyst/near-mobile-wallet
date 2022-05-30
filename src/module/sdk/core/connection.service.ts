import { RPC, config, Script, helpers, OutPoint, Indexer } from "@ckb-lumos/lumos";
import {
    TransactionWithStatus,
    Header,
    ChainInfo,
    CellWithStatus,
    Indexer as IndexerType,
    CellProvider,
    CellCollector,
    QueryOptions,
} from "@ckb-lumos/base";
import { Config, ScriptConfig } from "@ckb-lumos/config-manager";
import { isSecp256k1Blake160Address, isAcpAddress, isSecp256k1Blake160MultisigAddress } from "@ckb-lumos/common-scripts/lib/helper";

// AGGRON4 for test, LINA for main
const { AGGRON4, LINA } = config.predefined;

export enum Environments {
    Mainnet = "mainnet",
    Testnet = "testnet",
}

const OnepassConfig: { [key in Environments]: ScriptConfig } = {
    [Environments.Mainnet]: {
        CODE_HASH: "0xd01f5152c267b7f33b9795140c2467742e8424e49ebe2331caec197f7281b60a",
        HASH_TYPE: "type",
        TX_HASH: "0x86a5e91ad93475caf30a3d3b0258786dd463984f71e8471abc5574f206f6207a",
        INDEX: "0x0",
        DEP_TYPE: "code",
    },
    [Environments.Testnet]: {
        CODE_HASH: "0x3e1eb7ed4809b2d60650be96a40abfbdafb3fb942b7b37ec7709e64e2cd0a783",
        HASH_TYPE: "type",
        TX_HASH: "0x8b98ede6bf7b5baba767b1d2d46a13749fc810375b14152abbc259a7fc98e46d",
        INDEX: "0x0",
        DEP_TYPE: "code",
    },
};

class CustomCellProvider implements CellProvider {
    public readonly uri: string;

    constructor(private readonly indexer: IndexerType, private readonly myQueryOptions: QueryOptions) {
        this.uri = indexer.uri;
    }

    collector(queryOptions: QueryOptions): CellCollector {
        return this.indexer.collector({ ...queryOptions, ...this.myQueryOptions });
    }
}

export class ConnectionService {
    private readonly ckbUrl: string;
    private readonly indexerUrl: string;
    private readonly env: Environments;
    private readonly rpc: RPC;
    private readonly indexer: IndexerType;
    private readonly config: Config;
    private blockHeaderNumberMap = new Map<string, Header>();
    private blockHeaderHashMap = new Map<string, Header>();
    private transactionMap = new Map<string, TransactionWithStatus>();

    constructor(ckbUrl: string, indexerUrl: string, env: Environments) {
        this.ckbUrl = ckbUrl;
        this.indexerUrl = indexerUrl;
        this.env = env;
        this.rpc = new RPC(this.ckbUrl);
        this.indexer = new Indexer(this.indexerUrl, this.ckbUrl);
        this.config = env === Environments.Mainnet ? LINA : AGGRON4;
        config.initializeConfig(this.config);
    }

    async getBlockchainInfo(): Promise<ChainInfo> {
        return this.rpc.get_blockchain_info();
    }

    setBlockHeaderMaps(header: Header): void {
        this.blockHeaderHashMap.set(header.hash, header);
        this.blockHeaderNumberMap.set(header.number, header);
    }

    async getCurrentBlockHeader(): Promise<Header> {
        const lastBlockHeader = await this.rpc.get_tip_header();
        this.setBlockHeaderMaps(lastBlockHeader);
        return lastBlockHeader;
    }

    async getBlockHeaderFromHash(blockHash: string): Promise<Header> {
        if (!this.blockHeaderHashMap.has(blockHash)) {
            const header = await this.rpc.get_header(blockHash);
            this.setBlockHeaderMaps(header!);
        }
        return this.blockHeaderHashMap.get(blockHash)!;
    }

    async getBlockHeaderFromNumber(blockNumber: string): Promise<Header> {
        if (!this.blockHeaderNumberMap.has(blockNumber)) {
            const header = await this.rpc.get_header_by_number(blockNumber);
            this.setBlockHeaderMaps(header!);
        }
        return this.blockHeaderNumberMap.get(blockNumber)!;
    }

    async getCell(outPoint: OutPoint): Promise<CellWithStatus> {
        return this.rpc.get_live_cell(outPoint, true);
    }

    async getTransactionFromHash(transactionHash: string, useMap = true): Promise<TransactionWithStatus> {
        if (!useMap || !this.transactionMap.has(transactionHash)) {
            const transaction = await this.rpc.get_transaction(transactionHash);
            this.transactionMap.set(transactionHash, transaction!);
        }
        return this.transactionMap.get(transactionHash)!;
    }

    getConfig(): Config {
        return this.config;
    }

    getConfigAsObject(): helpers.Options {
        return { config: this.config };
    }

    getRPC(): RPC {
        return this.rpc;
    }

    getEnvironment(): Environments {
        return this.env;
    }

    getIndexer(): IndexerType {
        return this.indexer;
    }

    getCellProvider(queryOptions: QueryOptions = {}): CellProvider {
        return new CustomCellProvider(this.indexer, queryOptions);
    }

    getEmptyCellProvider(queryOptions: QueryOptions = {}): CellProvider {
        return this.getCellProvider({ ...queryOptions, type: "empty" });
    }

    getCKBUrl(): string {
        return this.ckbUrl;
    }

    getIndexerUrl(): string {
        return this.indexerUrl;
    }

    getAddressFromLock(lock: Script): string {
        // return helpers.generateAddress(lock, { config: this.config });
        return helpers.encodeToAddress(lock, { config: this.config });
    }

    getLockFromAddress(address: string): Script {
        return helpers.parseAddress(address, { config: this.config });
    }

    static getLockFromAddress(address: string, config: Config): Script {
        return helpers.parseAddress(address, { config });
    }

    isAddress(address: string): boolean {
        try {
            return (
                isSecp256k1Blake160Address(address, this.config) ||
                isAcpAddress(address, this.config) ||
                isSecp256k1Blake160MultisigAddress(address, this.config) ||
                this.isOnepassAddress(address)
            );
        } catch (err) {
            return false;
        }
    }

    isOnepassAddress(address: string): boolean {
        const lock = this.getLockFromAddress(address);
        return lock.code_hash === OnepassConfig[this.env].CODE_HASH && lock.hash_type === OnepassConfig[this.env].HASH_TYPE;
    }

    static isAddress(network: Environments, address: string): boolean {
        const config = network === Environments.Mainnet ? LINA : AGGRON4;
        try {
            return (
                isSecp256k1Blake160Address(address, config) ||
                isAcpAddress(address, config) ||
                isSecp256k1Blake160MultisigAddress(address, config) ||
                ConnectionService.isOnepassAddress(network, address)
            );
        } catch (err) {
            return false;
        }
    }

    static isOnepassAddress(network: Environments, address: string): boolean {
        const config = network === Environments.Mainnet ? LINA : AGGRON4;
        const lock = ConnectionService.getLockFromAddress(address, config);
        return lock.code_hash === OnepassConfig[network].CODE_HASH && lock.hash_type === OnepassConfig[network].HASH_TYPE;
    }
}
