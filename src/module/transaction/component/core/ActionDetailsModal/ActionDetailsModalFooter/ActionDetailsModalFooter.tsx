import { Row, RowProps } from "@peersyst/react-native-components";
import useTranslate from "module/common/hook/useTranslate";
import ExplorerButton from "module/transaction/component/input/ExplorerButton/ExplorerButton";
import ShareTxHashButton from "module/transaction/component/input/ShareTxHashButton/ShareTxHashButton";
import { Action } from "near-peersyst-sdk";

export interface ActionDetailsModalFooterProps {
    style?: RowProps["style"];
    action: Action;
}

function ActionDetailsModalFooter({ action, ...rest }: ActionDetailsModalFooterProps) {
    const translate = useTranslate();
    const actionHash = action.transaction.transactionHash;

    return (
        <Row gap={16} {...rest}>
            <ExplorerButton label={translate("explorer")} variant="outlined" style={{ flex: 1 }} type="tx" address={actionHash} />
            <ShareTxHashButton variant="primary" txHash={actionHash} style={{ flex: 1 }} />
        </Row>
    );
}

export default ActionDetailsModalFooter;
