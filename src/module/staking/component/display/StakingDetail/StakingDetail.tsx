import { Col, Row, Skeleton, useModal } from "@peersyst/react-native-components";
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
    isLoading?: boolean;
}

const StakingDetail = ({ title, amount = "0", stakeable, isLoading }: StakingDetailProps): JSX.Element => {
    const translate = useTranslate();
    const { showModal } = useModal();

    return (
        <StakingDetailRoot flex={1} gap={12} justifyContent="space-between" alignItems="center">
            <Row gap={12} alignItems="center">
                <ActionIcon actionKind={TransactionActionKind.STAKE} />
                <Col gap={3}>
                    <Typography variant="body3Regular">{title}</Typography>
                    <Skeleton loading={isLoading} width={100} height={20}>
                        <Balance balance={amount} variant="body3Strong" units="token" />
                    </Skeleton>
                    <Skeleton loading={isLoading} width={100} height={20}>
                        <FiatBalance balance={amount} variant="body4Strong" light />
                    </Skeleton>
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
