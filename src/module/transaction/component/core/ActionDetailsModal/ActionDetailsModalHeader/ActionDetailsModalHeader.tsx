import { Col } from "@peersyst/react-native-components";
import ActionIcon from "../../../display/ActionIcon/ActionIcon";
import ActionLabel from "../../../display/ActionLabel/ActionLabel";
import getAmountAndTokenNameFromAction from "../../../display/ActionCard/utils/getAmountAndTokenNameFromAction";
import ActionAmount from "../../../display/ActionAmount/ActionAmount";
import FiatBalance from "module/wallet/component/display/FiatBalance/FiatBalance";
import { useMemo } from "react";
import { ACTIVE_ACTIONS } from "module/transaction/utils/activeActions";
import { ActionDetailsModalHeaderProps } from "./ActionDetailsModalHeader.types";
import { ActionDetailsModalHeaderRoot } from "./ActionDetailsModalHeader.styles";

const ActionDetailsModalHeader = ({ action }: ActionDetailsModalHeaderProps): JSX.Element => {
    const { actionKind } = action;
    const { amount, tokenName } = getAmountAndTokenNameFromAction(action) || {};
    const isActive = useMemo(() => ACTIVE_ACTIONS.includes(action.actionKind), [action]);

    return (
        <ActionDetailsModalHeaderRoot isActive={isActive}>
            <ActionIcon type={actionKind} />
            <Col justifyContent="flex-start" flex={1}>
                <ActionLabel style={{ flex: 1 }} variant="body3Strong" action={action} numberOfLines={amount ? 1 : 2} />
                {amount && <ActionAmount variant="body1Strong" actionKind={actionKind} amount={amount} units={tokenName} />}
                {amount && <FiatBalance color="gray.300" balance={amount} variant="body3Strong" />}
            </Col>
        </ActionDetailsModalHeaderRoot>
    );
};

export default ActionDetailsModalHeader;
