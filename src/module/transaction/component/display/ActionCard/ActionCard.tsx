import { Col, Row } from "@peersyst/react-native-components";
import { ActionCardProps } from "./ActionCard.types";
import ActionIcon from "../ActionIcon/ActionIcon";
import Typography from "module/common/component/display/Typography/Typography";
import MainListCard from "module/main/component/display/MainListCard/MainListCard";
import useFormatDate from "module/common/hook/useFormatDate";
import ActionLabel from "../ActionLabel/ActionLabel";
import ActionAmount from "module/transaction/component/display/ActionAmount/TransactionAmount";
import getAmountAndTokenNameFromAction from "./utils/getAmountAndTokenNameFromAction";
import FiatBalance from "module/wallet/component/display/FiatBalance/FiatBalance";

const ActionCard = ({ action }: ActionCardProps): JSX.Element => {
    const {
        actionKind,
        transaction: { blockTimestamp },
    } = action;
    const { amount, tokenName } = getAmountAndTokenNameFromAction(action) || {};
    const formattedDate = useFormatDate(blockTimestamp);

    return (
        <MainListCard gap="4%" alignItems="center">
            <ActionIcon actionKind={actionKind} />
            <Col gap={2} flex={1}>
                <Row justifyContent="space-between">
                    <ActionLabel variant="body3Strong" action={action} numberOfLines={1} style={{ maxWidth: amount ? "45%" : "90%" }} />
                    {amount && (
                        <ActionAmount
                            variant="body3Strong"
                            actionKind={actionKind}
                            amount={amount}
                            units={tokenName}
                            style={{ maxWidth: "50%" }}
                        />
                    )}
                </Row>
                <Row justifyContent="space-between" alignItems="center">
                    <Typography variant="body4Strong" color={(p) => p.gray[300]}>
                        {formattedDate}
                    </Typography>
                    {amount && <FiatBalance color={(p) => p.gray[300]} balance={amount} variant="body4Strong" tokenUnits={tokenName} />}
                </Row>
            </Col>
        </MainListCard>
    );
};

export default ActionCard;
