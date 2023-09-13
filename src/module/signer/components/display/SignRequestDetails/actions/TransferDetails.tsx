import { ActionDetailsProps } from "../SignRequestDetails.types";
import { useTranslate } from "module/common/hook/useTranslate";
import { TransferActionParams } from "../actions.types";
import Balance from "module/wallet/component/display/Balance/Balance";
import Container from "module/common/component/display/Container/Container";
import ActionDetailsScaffold from "module/signer/components/layout/ActionDetailsScaffold/ActionDetailsScaffold";
import ActionDetailField from "../../ActionDetailField/ActionDetailField";
import { NearIcon, UserIcon } from "icons";
import BlockchainAddress from "module/common/component/display/BlockchainAddress/BlockchainAddress";
import { Col } from "@peersyst/react-native-components";
import { convertYoctoToNear } from "near-peersyst-sdk";

const TransferDetails = ({ params, receiverId }: ActionDetailsProps): JSX.Element => {
    const { deposit } = params as TransferActionParams;

    const translate = useTranslate();

    return (
        <ActionDetailsScaffold
            header={translate("transferAction")}
            description={translate("transferActionDescription", { receiverId })}
            showPreview
        >
            <Container>
                <Col gap={16}>
                    <ActionDetailField
                        label={translate("receiver")}
                        content={<BlockchainAddress variant="body2Strong" address={receiverId!} type="address" />}
                        LeftIcon={UserIcon}
                    />
                    <ActionDetailField
                        label={translate("deposit")}
                        content={<Balance variant="body2Strong" units="token" balance={convertYoctoToNear(deposit)} textAlign="center" />}
                        LeftIcon={NearIcon}
                    />
                </Col>
            </Container>
        </ActionDetailsScaffold>
    );
};

export default TransferDetails;
