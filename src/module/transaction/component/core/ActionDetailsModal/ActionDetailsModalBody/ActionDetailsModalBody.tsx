import { Col } from "@peersyst/react-native-components";
import BlockchainAddress from "module/common/component/display/BlockchainAddress/BlockchainAddress";
import useTranslate from "module/common/hook/useTranslate";
import { Action } from "near-peersyst-sdk";
import ActionDetail from "./ActionDetail";
import useFormatDate from "module/common/hook/useFormatDate";
import Typography from "module/common/component/display/Typography/Typography";

export interface ActionDetailsModalBodyProps {
    action: Action;
}

const ActionDetailsModalBody = ({ action }: ActionDetailsModalBodyProps): JSX.Element => {
    const translate = useTranslate();
    const { transaction } = action;
    const formatDate = useFormatDate();
    const formattedDate = formatDate(Number(transaction.blockTimestamp));

    return (
        <Col gap={24} flex={1} style={{ maxWidth: "85%" }}>
            {transaction.signerAccountId && (
                <ActionDetail title={translate("date")}>
                    <Typography variant="body3Strong">{formattedDate}</Typography>
                </ActionDetail>
            )}
            {transaction.signerAccountId && (
                <ActionDetail title={translate("sender")}>
                    <BlockchainAddress
                        gap={6}
                        showCopyIcon
                        action="link"
                        address={transaction.signerAccountId}
                        type="address"
                        variant="body3Strong"
                    />
                </ActionDetail>
            )}
            {transaction.receiverAccountId && (
                <ActionDetail title={translate("receiver")}>
                    <BlockchainAddress
                        gap={6}
                        showCopyIcon
                        action="link"
                        address={transaction.receiverAccountId}
                        type="address"
                        variant="body3Strong"
                    />
                </ActionDetail>
            )}
            <ActionDetail title={translate("hash")}>
                <BlockchainAddress gap={6} address={action.transactionHash} type="tx" variant="body3Strong" action="link" showCopyIcon />
            </ActionDetail>
        </Col>
    );
};

export default ActionDetailsModalBody;
