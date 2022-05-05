// TODO change @nervosnetwork/ckb-sdk-core Cell and RawTransaction types
import { Cell, RawTransaction } from "@ckb-lumos/lumos";

export interface NftScript {
    args: string;
    codeHash: string;
    hashType: string;
}

export interface MintNftParams {
    name: string;
    symbol: string;
    baseTokenUri: string;
    sourceAddress: string;
    targetAddress: string;
    extraData: Buffer;
    fee?: number;
    factoryContractTypeScript?: NftScript;
    factoryContractDep?: NftScript;
    extraDeps?: string[];
}

export interface MintNftResponse {
    rawTransaction: RawTransaction;
    typeScript: NftScript;
    usedCapacity: bigint;
    inputCells: Cell[];
}

export interface FactoryData {
    name: string;
    symbol: string;
    baseTokenUri: string;
    extraData: string;
}

export interface ReadFactoryResponse {
    data: FactoryData;
    rawCell: Cell;
}

export interface FactoryConstants {
    TYPE_CODE_HASH_SIZE: number;
    TYPE_ARGS_SIZE: number;
}

export interface CreateNewTypeScriptParams {
    rawTransaction: RawTransaction;
    factoryTypeScript: NftScript;
    nftTypeCodeHash: string;
    outputIndex: string;
}

export interface MintParams {
    nftContractTypeScript: NftScript;
    factoryTypeScript: NftScript;
    sourceAddress: string;
    targetAddress: string;
    nftContractDep?: NftScript;
    extraDeps?: string[];
    fee?: number;
    data?: any;
}

export interface MintResponse {
    rawTransaction: RawTransaction;
    nftTypeScript: NftScript;
    usedCapacity: bigint;
    inputCells: Cell[];
}

export interface ReadNftResponse {
    tokenId: string;
    tokenUri: string;
    data: string;
    factoryData: FactoryData;
    rawCell: Cell;
}

export interface NftFactoryCell {
    mint: (mintData: MintNftParams) => Promise<MintNftResponse>;
    readOne: (typeScript: NftScript) => Promise<ReadFactoryResponse>;
    isCellNRC721: (factoryTypeScript: NftScript) => Promise<boolean>;
    CONSTANTS: FactoryConstants;
}

export interface NftSdkCell {
    getAllFactoryNftsByAdress: ({ userAdress, factoryTypeScript }: { userAdress: string; factoryTypeScript: NftScript }) => Promise<Cell[]>;
    createNewTypeScript: (params: CreateNewTypeScriptParams) => NftScript;
    mint: (params: MintParams) => Promise<MintResponse>;
    read: (nftTypeScript: NftScript) => Promise<ReadNftResponse>;
    isCellNRC721: (nftTypeScript: NftScript) => Promise<boolean>;
}

export interface NftSdkUtils {
    getCellOccupiedCapacity: (cell: Cell, data: string) => number;
    bigNumberCKBToShannon: (amount: number | StringConstructor) => bigint;
    serializeInputCell: (inputCell: Cell) => Buffer;
    hxShannonToCKB: (hexNumber: string) => number;
    CKBToShannon: (amount: number) => bigint;
    shannonToCKB: (amount: number) => number;
    hexToBytes: (hexString: string) => number[];
}

export interface NftSdk {
    factoryCell: NftFactoryCell;
    nftCell: NftSdkCell;
    utils: NftSdkUtils;
}
