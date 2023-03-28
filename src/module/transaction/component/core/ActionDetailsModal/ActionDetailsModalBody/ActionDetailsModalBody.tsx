import { Col } from "@peersyst/react-native-components";
import BlockchainAddress from "module/common/component/display/BlockchainAddress/BlockchainAddress";
import { useTranslate } from "module/common/hook/useTranslate";
import { Action } from "near-peersyst-sdk";
import ActionDetailsAccounts from "./ActionDetailsAccounts";
import ActionDetail from "./TransactionDetail";

export interface ActionDetailsModalBodyProps {
    action: Action;
}

const ActionDetailsModalBody = ({ action }: ActionDetailsModalBodyProps): JSX.Element => {
    const translate = useTranslate();
    return (
        <Col gap={20} flex={1} style={{ maxWidth: "85%" }}>
            <ActionDetailsAccounts action={action} />
            <ActionDetail title={translate("hash")}>
                <BlockchainAddress address={action.transactionHash} type="tx" variant="body3Regular" action="link" showCopyIcon />
            </ActionDetail>
        </Col>
    );
};

export default ActionDetailsModalBody;
