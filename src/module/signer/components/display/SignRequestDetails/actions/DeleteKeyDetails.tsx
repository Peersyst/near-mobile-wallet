import { ActionDetailsProps } from "../SignRequestDetails.types";
import { DeleteKeyActionParams } from "../actions.types";
import Container from "module/common/component/display/Container/Container";
import { useTranslate } from "module/common/hook/useTranslate";
import ActionDetailsScaffold from "module/signer/components/layout/ActionDetailsScaffold/ActionDetailsScaffold";
import ActionDetailField from "../../ActionDetailField/ActionDetailField";
import { CircleErrorIcon, LockIcon } from "icons";
import { formatPublicKey } from "module/signer/utils/formatPublicKey";

const DeleteKeyDetails = ({ params, metadata }: ActionDetailsProps): JSX.Element => {
    const { publicKey } = params as DeleteKeyActionParams;

    const previewProps = { dAppPreview: { logoUrl: metadata?.logoUrl || "", Icon: CircleErrorIcon } };

    const translate = useTranslate();

    return (
        <ActionDetailsScaffold
            header={translate("confirmDisconnect")}
            description={translate("confirmDisconnectDescription")}
            showPreview
            previewProps={previewProps}
        >
            <Container>
                <ActionDetailField
                    label={translate("accessKey")}
                    content={formatPublicKey(publicKey, { digits: 12 })}
                    LeftIcon={LockIcon}
                />
            </Container>
        </ActionDetailsScaffold>
    );
};

export default DeleteKeyDetails;
