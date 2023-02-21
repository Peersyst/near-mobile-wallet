import BaseMock from "mocks/common/base.mock";
import { Token, TokenMetadata } from "near-peersyst-sdk";

export class TokenMetadataMock extends BaseMock implements TokenMetadata {
    spec: string;
    name: string;
    symbol: string;
    icon: string;
    reference: string | null;
    reference_hash: string | null;
    decimals: string;
    constructor({ spec, name, symbol, icon, reference, reference_hash, decimals }: Partial<TokenMetadata> = {}) {
        super();
        this.spec = spec || "ft-1.0.0";
        this.name = name || "Bitcoin";
        this.symbol = symbol || "BTC";
        this.icon = icon || "https://example.com/icon.png";
        this.reference = reference || null;
        this.reference_hash = reference_hash || null;
        this.decimals = decimals || "8";
    }
}

export interface TokenMockType {
    balance: Token["balance"];
    metadata: TokenMetadataMock;
}

export class TokenMock extends BaseMock implements Token {
    balance: string;
    metadata: TokenMetadataMock;

    constructor({ metadata = new TokenMetadataMock(), balance = "200" }: Partial<TokenMockType> = {}) {
        super();
        this.metadata = metadata;
        this.balance = balance;
    }
}

export interface TokensMockParmas {
    tokens: TokenMock[];
    length: number;
}

export class TokensMock extends BaseMock {
    tokens: TokenMock[];
    constructor({ length = 1, tokens }: Partial<TokensMockParmas> = {}) {
        super();
        this.tokens = tokens || new Array(length).fill(0).map(() => new TokenMock());
    }
}
