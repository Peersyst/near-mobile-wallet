import useTranslate from "module/common/hook/useTranslate";
import { DisconnectSiteDetailsProps } from "./DisconnectSiteDetails.types";
import ActionDetailsScaffold from "../../layout/ActionDetailsScaffold/ActionDetailsScaffold";
import useConnectedSiteLogo from "module/signer/queries/useConnectedSiteLogo";
import ActionPermissionDetails from "../ActionPermissionDetails/ActionPermissionDetails";

const DisconnectSiteDetails = ({ site }: DisconnectSiteDetailsProps): JSX.Element => {
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
                  receiverId: permission.FunctionCall.receiver_id,
                  allowance: permission.FunctionCall.allowance || undefined,
                  methodNames: permission.FunctionCall.method_names || undefined,
              };

    const { data: siteLogo } = useConnectedSiteLogo({ contractId: site.name });

    return (
        <ActionDetailsScaffold description={translate("withPermissions")} showPreview previewProps={{ logoUrl: siteLogo }} scrollable>
            <ActionPermissionDetails permission={formattedPermission} />
        </ActionDetailsScaffold>
    );
};

export default DisconnectSiteDetails;
