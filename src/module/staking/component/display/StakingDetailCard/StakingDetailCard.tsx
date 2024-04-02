import { Col, Row, Skeleton } from "@peersyst/react-native-components";
import Typography from "module/common/component/display/Typography/Typography";
import Button from "module/common/component/input/Button/Button";
import useTranslate from "module/common/hook/useTranslate";
import Balance from "module/wallet/component/display/Balance/Balance";
import ActionIcon from "module/transaction/component/display/ActionIcon/ActionIcon";
import { TransactionActionKind } from "near-peersyst-sdk";
import FiatBalance from "module/wallet/component/display/FiatBalance/FiatBalance";
import { StakingDetailRoot } from "./StakingDetailCard.styles";

export interface StakingDetailCardProps {
    title: string;
    amount: string | undefined;
    enabled?: boolean;
    action?: "unstake" | "withdraw";
    onAction?: () => void;
    isLoading?: boolean;
}

const StakingDetailCard = ({ title, amount = "0", enabled = false, action, onAction, isLoading }: StakingDetailCardProps): JSX.Element => {
    const translate = useTranslate();

    return (
        <StakingDetailRoot flex={1} gap={12} justifyContent="space-between" alignItems="center">
            <Row gap={12} alignItems="center">
                <ActionIcon type={TransactionActionKind.STAKE} />
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
            {enabled && action && (
                <Row alignItems="center">
                    <Button variant="outlined" size="sm" onPress={onAction}>
                        {translate(action)}
                    </Button>
                </Row>
            )}
        </StakingDetailRoot>
    );
};

export default StakingDetailCard;
