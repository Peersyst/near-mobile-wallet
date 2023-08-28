import { DApp, DAppTag } from "module/signer/components/display/DApp/DApp.types";

export class DAppMock implements DApp {
    name: string;
    description: string;
    url: string;
    logoUrl: string;
    tag: DAppTag;

    constructor({ name = "name", description = "description", url = "url", logoUrl = "logoUrl", tag = DAppTag.DEX }: Partial<DApp> = {}) {
        this.name = name;
        this.description = description;
        this.url = url;
        this.logoUrl = logoUrl;
        this.tag = tag;
    }
}
