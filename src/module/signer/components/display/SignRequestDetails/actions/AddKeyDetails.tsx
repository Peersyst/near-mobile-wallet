import { ActionDetailsProps } from "../SignRequestDetails.types";
import { AddKeyActionParams } from "../actions.types";
import { useTranslate } from "module/common/hook/useTranslate";
import ActionDetailsScaffold from "module/signer/components/layout/ActionDetailsScaffold/ActionDetailsScaffold";
import { ConnectIcon } from "icons";
import SignerWalletSelector from "module/signer/containers/SignerWalletSelector/SignerWalletSelector";
import ActionPermissionDetails from "../../ActionPermissionDetails/ActionPermissionDetails";

const AddKeyDetails = ({ params, metadata }: ActionDetailsProps): JSX.Element => {
    const {
        accessKey: { permission },
    } = params as AddKeyActionParams;

    const translate = useTranslate();

    const previewProps = { dAppPreview: { logoUrl: metadata?.logoUrl || "", Icon: ConnectIcon } };

    return (
        <ActionDetailsScaffold
            header={translate("confirmConnectionWith")}
            description={translate("confirmConnectionWithDescription", { name: metadata?.name })}
            showPreview
            previewProps={previewProps}
            scrollable
        >
            <ActionPermissionDetails permission={permission} />
            <SignerWalletSelector />
        </ActionDetailsScaffold>
    );
};

export default AddKeyDetails;
