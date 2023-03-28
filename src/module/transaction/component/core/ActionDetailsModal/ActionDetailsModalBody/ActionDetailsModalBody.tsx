import { Col } from "@peersyst/react-native-components";
import { useTranslate } from "module/common/hook/useTranslate";
import { Action } from "near-peersyst-sdk";
import ActionDetailsAccounts from "./ActionDetailsAccounts";

export interface ActionDetailsModalBodyProps {
    action: Action;
}

const ActionDetailsModalBody = ({ action }: ActionDetailsModalBodyProps): JSX.Element => {
    return (
        <Col gap={20} flex={1}>
            <ActionDetailsAccounts action={action} />
        </Col>
    );
};

export default ActionDetailsModalBody;
