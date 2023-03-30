import Typography from "module/common/component/display/Typography/Typography";
import useFormatDate from "module/common/hook/useFormatDate";
import { Action } from "near-peersyst-sdk";
import { Col } from "@peersyst/react-native-components";
import ActionIcon from "../../display/ActionIcon/ActionIcon";
import ActionLabel from "../../display/ActionLabel/ActionLabel";
import getAmountAndTokenNameFromAction from "../../display/ActionCard/utils/getAmountAndTokenNameFromAction";
import ActionAmount from "../../display/ActionAmount/ActionAmount";

export interface ActionDetailsModalHeaderProps {
    action: Action;
}

const ActionDetailsModalHeader = ({ action }: ActionDetailsModalHeaderProps): JSX.Element => {
    const {
        actionKind,
        transaction: { blockTimestamp },
    } = action;
    const formatDate = useFormatDate();
    const formattedDate = formatDate(Number(blockTimestamp));
    const { amount, tokenName } = getAmountAndTokenNameFromAction(action) || {};

    return (
        <Col alignItems="center" gap={10}>
            <ActionIcon type={actionKind} />
            <Col gap={5} alignItems="center">
                {amount !== undefined && <ActionAmount variant="body1Strong" actionKind={actionKind} amount={amount} units={tokenName} />}
                <ActionLabel variant="body1Strong" action={action} numberOfLines={2} textAlign="center" />
                {blockTimestamp && <Typography variant="body4Regular">{formattedDate}</Typography>}
            </Col>
        </Col>
    );
};

export default ActionDetailsModalHeader;
