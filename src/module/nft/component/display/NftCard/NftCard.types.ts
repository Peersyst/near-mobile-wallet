export interface NftMetadata {
    title: string | null; // ex. "Arch Nemesis: Mail Carrier" or "Parcel #5055"
    description: string | null; // free-form description
    media: string | null; // URL to associated media, preferably to decentralized, content-addressed storage
    media_hash: string | null; // Base64-encoded sha256 hash of content referenced by the `media` field. Required if `media` is included.
    copies: number | null; // number of copies of this set of metadata in existence when token was minted.
    issued_at: number | null; // When token was issued or minted, Unix epoch in milliseconds
    expires_at: number | null; // When token expires, Unix epoch in milliseconds
    starts_at: number | null; // When token starts being valid, Unix epoch in milliseconds
    updated_at: number | null; // When token was last updated, Unix epoch in milliseconds
    extra: string | null; // anything extra the NFT wants to store on-chain. Can be stringified JSON.
    reference: string | null; // URL to an off-chain JSON file with more info.
    reference_hash: string | null; // Base64-encoded sha256 hash of JSON from reference field. Required if `reference` is included.
}

export interface NftEvent {
    price: number;
    receiver_id: string;
    sender_id: string;
    type: "nft_transfer";
}

export interface Nft {
    token_id: string;
    contract_id: string;
    events: NftEvent[];
    metadata: NftMetadata;
    owner_id: string;
    approved_account_ids: string[];
}

export type NftCardProps = {
    nft: Nft;
    index: number;
};
