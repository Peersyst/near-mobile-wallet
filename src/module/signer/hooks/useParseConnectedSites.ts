import { AccessKeyInfoView } from "near-api-js/lib/providers/provider";
import { ConnectedSite } from "../components/display/ConnectedSite/ConnectedSite.types";
import useServiceInstance from "../../wallet/hook/useServiceInstance";
import { useTranslate } from "module/common/hook/useTranslate";
import { useCallback } from "react";

export default function useParsedConnectedSites() {
    const translate = useTranslate();
    const { serviceInstance } = useServiceInstance();

    const parseConnectedSites = useCallback(
        (accessKeys: AccessKeyInfoView[]) => {
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
                        accessKey: accessKey,
                        name: parseAccessKeyName(accessKey),
                    };
                })
                .filter((site) => site !== undefined) as ConnectedSite[];
            return connectedSites;
        },
        [translate, serviceInstance],
    );

    return parseConnectedSites;
}
