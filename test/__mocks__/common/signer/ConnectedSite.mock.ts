import { ConnectedSite } from "module/signer/components/display/ConnectedSite/ConnectedSite.types";
import { AccessKeyInfoView } from "near-api-js/lib/providers/provider";

export class ConnectedSiteMock implements ConnectedSite {
    name: string;
    accessKey: AccessKeyInfoView;

    constructor({
        name = "name",
        accessKey = { public_key: "publicKey", access_key: { permission: "FullAccess" } } as AccessKeyInfoView,
    }: Partial<ConnectedSite> = {}) {
        this.name = name;
        this.accessKey = accessKey;
    }
}
