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
import { Config } from "@ckb-lumos/config-manager";
import { isSecp256k1Blake160Address, isAcpAddress, isSecp256k1Blake160MultisigAddress } from "@ckb-lumos/common-scripts/lib/helper";

// AGGRON4 for test, LINA for main
const { AGGRON4, LINA } = config.predefined;

export enum Environments {
    Mainnet = "mainnet",
    Testnet = "testnet",
}

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
            this.setBlockHeaderMaps(header);
        }
        return this.blockHeaderHashMap.get(blockHash);
    }

    async getBlockHeaderFromNumber(blockNumber: string): Promise<Header> {
        if (!this.blockHeaderNumberMap.has(blockNumber)) {
            const header = await this.rpc.get_header_by_number(blockNumber);
            this.setBlockHeaderMaps(header);
        }
        return this.blockHeaderNumberMap.get(blockNumber);
    }

    async getCell(outPoint: OutPoint): Promise<CellWithStatus> {
        return this.rpc.get_live_cell(outPoint, true);
    }

    async getTransactionFromHash(transactionHash: string, useMap = true): Promise<TransactionWithStatus> {
        if (!useMap || !this.transactionMap.has(transactionHash)) {
            const transaction = await this.rpc.get_transaction(transactionHash);
            this.transactionMap.set(transactionHash, transaction);
        }
        return this.transactionMap.get(transactionHash);
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

    isAddress(address: string): boolean {
        try {
            return (
                isSecp256k1Blake160Address(address, this.config) ||
                isAcpAddress(address, this.config) ||
                isSecp256k1Blake160MultisigAddress(address, this.config)
            );
        } catch (err) {
            return false;
        }

        return false;
    }
}
