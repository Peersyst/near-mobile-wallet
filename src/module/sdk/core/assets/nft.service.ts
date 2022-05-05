import { Cell } from "@ckb-lumos/lumos";
import * as NrcSdk from "@rather-labs/nrc-721-sdk";
import { Logger } from "../../utils/logger";
import { ConnectionService } from "../connection.service";
import { ScriptType } from "../transaction.service";
import { NftScript, NftSdk } from "./nft.types";

export interface Nft {
    tokenId: string;
    tokenUri: string;
    data: any;
    nftName: string;
    nftSymbol: string;
    nftExtraData: string;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class NftService {
    private readonly connection: ConnectionService;
    private readonly logger = new Logger(NftService.name);
    private nftSdk: NftSdk = null;
    private initializing = false;

    constructor(connectionService: ConnectionService) {
        this.connection = connectionService;
    }

    async initialize() {
        if (!this.nftSdk && !this.initializing) {
            this.initializing = true;
            this.nftSdk = await NrcSdk.initialize({
                nodeUrl: this.connection.getCKBUrl(),
                indexerUrl: this.connection.getIndexerUrl(),
            });
            this.logger.info("NftService initialized");
        } else if (!this.nftSdk) {
            while (!this.nftSdk) {
                await sleep(100);
            }
        }
    }

    async isScriptNftScript(scriptType: ScriptType): Promise<boolean> {
        await this.initialize();

        let isNftCell: boolean;
        try {
            isNftCell = await this.nftSdk.nftCell.isCellNRC721(scriptType);
        } catch (error) {
            isNftCell = false;
        }

        return isNftCell;
    }

    private cellToNftScript(cell: Cell): NftScript {
        if (!cell.cell_output.type) {
            return null;
        }

        return {
            codeHash: cell.cell_output.type.code_hash,
            args: cell.cell_output.type.args,
            hashType: cell.cell_output.type.hash_type,
        };
    }

    private async getNftFromCell(cell: Cell): Promise<Nft | null> {
        const cellTypeScript = this.cellToNftScript(cell);

        let isNftCell: boolean;
        try {
            isNftCell = await this.nftSdk.nftCell.isCellNRC721(cellTypeScript);
        } catch (error) {
            isNftCell = false;
        }

        if (cellTypeScript && isNftCell) {
            const nft = await this.nftSdk.nftCell.read(cellTypeScript);

            return {
                tokenId: nft.tokenId,
                tokenUri: nft.tokenUri,
                data: JSON.parse(nft.data),
                nftName: nft.factoryData.name,
                nftSymbol: nft.factoryData.symbol,
                nftExtraData: nft.factoryData.extraData,
            };
        }

        return null;
    }

    async getBalance(address: string): Promise<Nft[]> {
        await this.initialize();

        const collector = this.connection.getIndexer().collector({
            lock: this.connection.getLockFromAddress(address),
        });

        const nfts: Nft[] = [];
        for await (const cell of collector.collect()) {
            const nft = await this.getNftFromCell(cell);
            if (nft) {
                nfts.push(nft);
            }
        }

        return nfts;
    }

    async getBalanceFromCells(cells: Cell[]): Promise<Nft[]> {
        await this.initialize();

        const nfts: Nft[] = [];
        for await (const cell of cells) {
            const nft = await this.getNftFromCell(cell);
            if (nft) {
                nfts.push(nft);
            }
        }

        return nfts;
    }
}
