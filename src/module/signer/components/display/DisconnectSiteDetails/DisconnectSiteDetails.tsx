import { useTranslate } from "module/common/hook/useTranslate";
import ActionDetailsScaffold from "../../layout/ActionDetailsScaffold/ActionDetailsScaffold";
import { DisconnectSiteDetailsProps } from "./DisconnectSiteDetails.types";
import ActionPermissionDetails from "../ActionPermissionDetails/ActionPermissionDetails";
import useConnectedSiteLogo from "module/signer/queries/useConnectedSiteLogo";

const DisconnectSiteDetails = ({ site }: DisconnectSiteDetailsProps) => {
    const translate = useTranslate();

    const {
        accessKey: {
            access_key: { permission },
        },
    } = site;

    const formattedPermission =
        permission === "FullAccess"
            ? "FullAccess"
            : {
                  allowance: permission.FunctionCall.allowance,
                  receiverId: permission.FunctionCall.receiver_id,
                  methodNames: permission.FunctionCall.method_names,
              };

    const { data: siteLogo } = useConnectedSiteLogo(site.name);

    return (
        <ActionDetailsScaffold description={translate("withPermissions")} showPreview previewProps={{ logoUrl: siteLogo }}>
            <ActionPermissionDetails permission={formattedPermission} />
        </ActionDetailsScaffold>
    );
};

export default DisconnectSiteDetails;
