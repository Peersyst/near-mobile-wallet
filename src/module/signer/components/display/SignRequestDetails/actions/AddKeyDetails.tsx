import { ActionDetailsProps } from "../SignRequestDetails.types";
import { AddKeyActionParams } from "../actions.types";
import { useTranslate } from "module/common/hook/useTranslate";
import ActionDetailsScaffold from "module/signer/components/layout/ActionDetailsScaffold/ActionDetailsScaffold";
import { ConnectIcon } from "icons";
import FunctionCallDetails from "../../FunctionCallDetails/FunctionCallDetails";
import SignerWalletSelector from "module/signer/containers/SignerWalletSelector/SignerWalletSelector";
import PermissionField from "../../PermissionField/PermissionField";

const AddKeyDetails = ({ params, metadata }: ActionDetailsProps): JSX.Element => {
    const {
        accessKey: { permission },
    } = params as AddKeyActionParams;

    const translate = useTranslate();

    const isFullAccess = permission === "FullAccess";

    return (
        <ActionDetailsScaffold
            header={translate("confirmConnectionWith")}
            description={translate("confirmConnectionWithDescription", { name: metadata?.name })}
            showPreview
            previewProps={{ logoUrl: metadata?.logoUrl, Icon: ConnectIcon }}
        >
            {isFullAccess ? <PermissionField type="critical" label="" /> : <FunctionCallDetails permission={permission} />}
            <SignerWalletSelector />
        </ActionDetailsScaffold>
    );
};

export default AddKeyDetails;
