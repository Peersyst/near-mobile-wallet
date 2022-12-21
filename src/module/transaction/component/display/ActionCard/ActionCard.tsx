import { Col, Row } from "@peersyst/react-native-components";
import TransactionAmount from "module/transaction/component/display/TransactionAmount/TransactionAmount";
import { useRecoilValue } from "recoil";
import settingsState from "module/settings/state/SettingsState";
import { useGetTokenPrice } from "module/token/query/useGetTokenPrice";
import { ActionCardProps } from "./ActionCard.types";
import ActionIcon from "../ActionIcon/ActionIcon";
import Typography from "module/common/component/display/Typography/Typography";
import Balance from "module/wallet/component/display/Balance/Balance";
import MainListCard from "module/main/component/display/MainListCard/MainListCard";
import useFormatDate from "module/common/hook/useFormatDate";
import ActionLabel from "../ActionLabel/ActionLabel";
import getAmountFromAction from "./utils/getAmountFromAction";

const ActionCard = ({ action }: ActionCardProps): JSX.Element => {
    const { fiat } = useRecoilValue(settingsState);
    const { data: tokenValue } = useGetTokenPrice(fiat, "nervos-network");
    const {
        actionKind,
        transaction: { blockTimestamp },
    } = action;
    const amount = getAmountFromAction(action);
    const formattedDate = useFormatDate(blockTimestamp);

    return (
        <MainListCard gap="4%" alignItems="center">
            <ActionIcon actionKind={actionKind} />
            <Col gap={2} flex={1}>
                <Row justifyContent="space-between">
                    <ActionLabel variant="body3Strong" action={action} numberOfLines={1} style={{ maxWidth: showAmount ? "45%" : "90%" }} />
                    {amount && (
                        <TransactionAmount variant="body3Strong" type={type} amount={amount} units={token} style={{ maxWidth: "50%" }} />
                    )}
                </Row>
                <Row justifyContent="space-between" alignItems="center">
                    <Typography variant="body4Strong" color={(p) => p.gray[300]}>
                        {formattedDate}
                    </Typography>
                    {amount && (
                        <Balance
                            options={{ maximumFractionDigits: 2, minimumFractionDigits: 2 }}
                            action="round"
                            color={(p) => p.gray[300]}
                            balance={tokenValue * amount}
                            units={fiat}
                            variant="body4Strong"
                        />
                    )}
                </Row>
            </Col>
        </MainListCard>
    );
};

export default ActionCard;
