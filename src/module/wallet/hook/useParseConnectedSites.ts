import { AccessKeyInfoView } from "near-api-js/lib/providers/provider";
import { ConnectedSite } from "../component/display/ConnectedSite/ConnectedSite.types";
import useServiceInstance from "./useServiceInstance";
import { useTranslate } from "module/common/hook/useTranslate";

export default function useParsedConnectedSites() {
    const translate = useTranslate();
    const { serviceInstance } = useServiceInstance();

    const parseConnectedSites = (accessKeys: AccessKeyInfoView[]) => {
        const publicKey = serviceInstance.getPublicKey();
        const parseAccessKeyName = (accessKey: AccessKeyInfoView) => {
            const { access_key } = accessKey;

            if (access_key.permission === "FullAccess") return translate("unknownAccount");
            return access_key.permission.FunctionCall.receiver_id;
        };

        const connectedSites = accessKeys
            .map((accessKey: AccessKeyInfoView) => {
                if (accessKey.public_key === publicKey.toString()) return undefined;
                return {
                    publicKey: accessKey.public_key,
                    name: parseAccessKeyName(accessKey),
                };
            })
            .filter((site) => site !== undefined) as ConnectedSite[];
        return connectedSites;
    };

    return parseConnectedSites;
}
