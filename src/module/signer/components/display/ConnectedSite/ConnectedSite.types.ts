import { AccessKeyInfoView } from "near-api-js/lib/providers/provider";

export interface ConnectedSite {
    name: string;
    accessKey: AccessKeyInfoView;
}

export interface ConnectedSiteProps {
    site: ConnectedSite;
}
