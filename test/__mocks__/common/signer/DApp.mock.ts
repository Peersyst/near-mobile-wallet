import { DApp, DAppTag } from "module/signer/types";

export class DAppMock implements DApp {
    name: string;
    description: string;
    url: string;
    logoUrl: string;
    tag: DAppTag;
    contractId: string;

    constructor({
        name = "name",
        description = "description",
        url = "url",
        logoUrl = "logoUrl",
        tag = DAppTag.DEX,
        contractId = "contractId",
    }: Partial<DApp> = {}) {
        this.name = name;
        this.description = description;
        this.url = url;
        this.logoUrl = logoUrl;
        this.tag = tag;
        this.contractId = contractId;
    }
}
