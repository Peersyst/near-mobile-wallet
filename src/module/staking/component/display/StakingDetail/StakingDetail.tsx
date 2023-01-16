import { Col, Row, useModal } from "@peersyst/react-native-components";
import Typography from "module/common/component/display/Typography/Typography";
import Button from "module/common/component/input/Button/Button";
import { useTranslate } from "module/common/hook/useTranslate";
import Balance from "module/wallet/component/display/Balance/Balance";
import UnstakeModal from "module/staking/component/core/UnstakeModal/UnstakeModal";
import ActionIcon from "module/transaction/component/display/ActionIcon/ActionIcon";
import { TransactionActionKind } from "near-peersyst-sdk";
import FiatBalance from "module/wallet/component/display/FiatBalance/FiatBalance";
import { StakingDetailRoot } from "./StakingDetail.styles";

export interface StakingDetailProps {
    title: string;
    amount: string | undefined;
    stakeable?: boolean;
}

const StakingDetail = ({ title, amount = "0", stakeable }: StakingDetailProps): JSX.Element => {
    const translate = useTranslate();
    const { showModal } = useModal();

    return (
        <StakingDetailRoot flex={1} gap={12} justifyContent="space-between" alignItems="center">
            <Row gap={12} alignItems="center">
                <ActionIcon actionKind={TransactionActionKind.STAKE} />
                <Col>
                    <Typography variant="body3Regular">{title}</Typography>
                    <Balance balance={amount} options={{ maximumFractionDigits: 3 }} variant="body3Strong" units="token" />
                    <FiatBalance balance={amount} variant="body3Strong" options={{ maximumFractionDigits: 2 }} light />
                </Col>
            </Row>
            {stakeable && (
                <Row alignItems="center">
                    <Button variant="outlined" size="sm" onPress={() => showModal(UnstakeModal)}>
                        {translate("unstake")}
                    </Button>
                </Row>
            )}
        </StakingDetailRoot>
    );
};

export default StakingDetail;
