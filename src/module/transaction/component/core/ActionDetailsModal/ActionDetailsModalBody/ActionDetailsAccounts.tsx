import { Col } from "@peersyst/react-native-components";
import BlockchainAddress from "module/common/component/display/BlockchainAddress/BlockchainAddress";
import { useTranslate } from "module/common/hook/useTranslate";
import { Action } from "near-peersyst-sdk";
import ActionDetail from "./TransactionDetail";

export interface ActionDetailsAccountsProps {
    action: Action;
}

const ActionDetailsAccounts = ({ action }: ActionDetailsAccountsProps): JSX.Element => {
    const translate = useTranslate();
    const { transaction } = action;
    return (
        <Col gap={20} flex={1}>
            {transaction.signerAccountId && (
                <ActionDetail title={translate("sender")}>
                    <BlockchainAddress
                        showCopyIcon
                        action="link"
                        address={transaction.signerAccountId}
                        type="address"
                        variant="body3Regular"
                    />
                </ActionDetail>
            )}
            {transaction.receiverAccountId && (
                <ActionDetail title={translate("receiver")}>
                    <BlockchainAddress
                        showCopyIcon
                        action="link"
                        address={transaction.receiverAccountId}
                        type="address"
                        variant="body3Regular"
                    />
                </ActionDetail>
            )}
        </Col>
    );
};

export default ActionDetailsAccounts;
