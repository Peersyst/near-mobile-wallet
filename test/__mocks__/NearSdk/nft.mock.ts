import BaseMock from "mocks/common/base.mock";
import { NftMetadata, NftToken, NftTokenMetadata } from "near-peersyst-sdk";

export class NftTokenMetadataMock extends BaseMock implements NftTokenMetadata {
    title: string;
    description: string;
    media: string | null; // data:image
    media_url: string | null; // Image url
    media_hash: string | null;
    copies: number;
    issued_at: number | null;
    expires_at: number | null;
    starts_at: number | null;
    updated_at: number | null;
    extra: string | null;
    reference: string | null; // Extra metadata url
    reference_hash: string | null;
    constructor({
        title,
        description,
        media,
        media_hash,
        issued_at,
        starts_at,
        media_url,
        copies,
        expires_at,
        extra,
        updated_at,
        reference,
        reference_hash,
    }: Partial<NftTokenMetadata> = {}) {
        super();
        this.title = title || "title";
        this.description = description || "description";
        this.media = media || null;
        this.media_hash = media_hash || null;
        this.media_url = media_url || null;
        this.copies = copies || 1;
        this.expires_at = expires_at || null;
        this.extra = extra || null;
        this.updated_at = updated_at || null;
        this.reference = reference || null;
        this.reference_hash = reference_hash || null;
        this.issued_at = issued_at || null;
        this.starts_at = starts_at || null;
    }
}

export class NftMetadataMock extends BaseMock implements NftMetadata {
    spec: string;
    name: string;
    symbol: string;
    icon: string; // Image in svg
    reference: string | null;
    reference_hash: string | null;
    base_uri: string | null;
    media?: string;
    constructor({ spec, name, symbol, icon, reference, reference_hash, base_uri, media }: Partial<NftMetadata> = {}) {
        super();
        this.spec = spec || "nft-1.0.0";
        this.name = name || "name";
        this.symbol = symbol || "symbol";
        this.icon = icon || "icon";
        this.reference = reference || null;
        this.reference_hash = reference_hash || null;
        this.base_uri = base_uri || null;
        this.media = media || undefined;
    }
}

export interface NftTokenMockType extends Omit<NftToken, "metadata" | "collection_metadata"> {
    metadata: NftTokenMetadataMock;
    collection_metadata?: NftMetadataMock;
    contractId: string;
}

export class NftTokenMock extends BaseMock implements NftTokenMockType {
    token_id: string;
    owner_id: string;
    metadata: NftTokenMetadataMock;
    approved_account_ids?: any;
    royalty?: { [key: string]: number };
    collection_metadata?: NftMetadataMock;
    contractId: string;
    constructor({
        token_id,
        owner_id,
        metadata,
        approved_account_ids,
        royalty,
        collection_metadata,
        contractId,
    }: Partial<NftTokenMockType> = {}) {
        super();
        this.token_id = token_id || "token_id";
        this.owner_id = owner_id || "owner_id";
        this.metadata = metadata || new NftTokenMetadataMock();
        this.approved_account_ids = approved_account_ids || undefined;
        this.royalty = royalty || undefined;
        this.collection_metadata = collection_metadata || new NftMetadataMock();
        this.contractId = contractId || "contractId";
    }
}

export interface NftTokensMockParmas {
    nfts: NftTokenMock[];
    length: number;
}

export class NftTokensMock extends BaseMock {
    nfts: NftTokenMock[];
    constructor({ length = 1, nfts }: Partial<NftTokensMockParmas> = {}) {
        super();
        this.nfts = nfts || new Array(length).fill(0).map(() => new NftTokenMock());
    }
}
