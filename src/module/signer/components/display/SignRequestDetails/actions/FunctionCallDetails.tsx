import { ActionDetailsProps } from "../SignRequestDetails.types";
import { FunctionCallActionParams } from "../actions.types";
import Container from "module/common/component/display/Container/Container";
import { useTranslate } from "module/common/hook/useTranslate";
import ActionDetailsScaffold from "module/signer/components/layout/ActionDetailsScaffold/ActionDetailsScaffold";
import ActionDetailField from "../../ActionDetailField/ActionDetailField";
import { ClipboardListIcon, NearIcon } from "icons";
import Balance from "module/wallet/component/display/Balance/Balance";
import { convertYoctoToNear } from "near-peersyst-sdk";
import { Col } from "@peersyst/react-native-components";

const FunctionCallDetails = ({ params, receiverId }: ActionDetailsProps): JSX.Element => {
    const { methodName, deposit, gas } = params as FunctionCallActionParams;

    const translate = useTranslate();

    return (
        <ActionDetailsScaffold
            header={translate("callSmartContract")}
            description={translate("callSmartContractDescription", { contract: receiverId })}
            showPreview
        >
            <Container>
                <Col gap={16}>
                    {receiverId && <ActionDetailField label={translate("contract")} content={receiverId} leftIcon={ClipboardListIcon} />}
                    <ActionDetailField label={translate("methodName")} content={methodName} leftIcon={ClipboardListIcon} />
                    <ActionDetailField
                        label={translate("gas")}
                        content={<Balance variant="body2Strong" balance={convertYoctoToNear(gas)} units="token" />}
                        leftIcon={NearIcon}
                    />
                    <ActionDetailField
                        label={translate("deposit")}
                        content={<Balance variant="body2Strong" balance={convertYoctoToNear(deposit)} units="token" />}
                        leftIcon={NearIcon}
                    />
                </Col>
            </Container>
        </ActionDetailsScaffold>
    );
};

export default FunctionCallDetails;
