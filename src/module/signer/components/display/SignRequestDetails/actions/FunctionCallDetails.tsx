import { ActionDetailsProps } from "../SignRequestDetails.types";
import { FunctionCallActionParams } from "../actions.types";
import Container from "module/common/component/display/Container/Container";
import { useTranslate } from "module/common/hook/useTranslate";
import ActionDetailsScaffold from "module/signer/components/layout/ActionDetailsScaffold/ActionDetailsScaffold";
import ActionDetailField from "../../ActionDetailField/ActionDetailField";
import { ClipboardListIcon, ConnectIcon, NearIcon } from "icons";
import Balance from "module/wallet/component/display/Balance/Balance";
import { convertYoctoToNear } from "near-peersyst-sdk";
import { Col } from "@peersyst/react-native-components";

const FunctionCallDetails = ({ params, metadata, receiverId }: ActionDetailsProps): JSX.Element => {
    const { methodName, deposit, gas } = params as FunctionCallActionParams;
    const previewProps = { dAppPreview: { logoUrl: metadata?.logoUrl || "", Icon: ConnectIcon } };

    const translate = useTranslate();

    return (
        <ActionDetailsScaffold
            header={translate("callSmartContract")}
            description={translate("callSmartContractDescription", { contract: receiverId })}
            showPreview
            previewProps={previewProps}
        >
            <Container>
                <Col gap={16}>
                    {receiverId && <ActionDetailField label={translate("contract")} content={receiverId} LeftIcon={ClipboardListIcon} />}
                    <ActionDetailField label={translate("methodName")} content={methodName} LeftIcon={ClipboardListIcon} />
                    <ActionDetailField
                        label={translate("gas")}
                        content={<Balance variant="body2Strong" balance={convertYoctoToNear(gas)} units="token" />}
                        LeftIcon={NearIcon}
                    />
                    <ActionDetailField
                        label={translate("deposit")}
                        content={<Balance variant="body2Strong" balance={convertYoctoToNear(deposit)} units="token" />}
                        LeftIcon={NearIcon}
                    />
                </Col>
            </Container>
        </ActionDetailsScaffold>
    );
};

export default FunctionCallDetails;
