import { Col, Row, useModal } from "@peersyst/react-native-components";
import Typography from "module/common/component/display/Typography/Typography";
import Button from "module/common/component/input/Button/Button";
import { useTranslate } from "module/common/hook/useTranslate";
import { CircleNearIcon, StakingDetailRoot } from "module/staking/component/core/StakingDetail/StakingDetail.styles";
import Balance from "module/wallet/component/display/Balance/Balance";
import UnstakeModal from "module/staking/component/core/UnstakeModal/UnstakeModal";
import config from "config/config";
import { alpha } from "@peersyst/react-utils";
import { IconCircleWrapper } from "module/common/component/display/IconCircleWrapper/IconCircleWrapper.styles";
import { useTheme } from "@peersyst/react-native-styled";

export interface StakingDetailProps {
    title: string;
    amount: number | undefined;
    stakeable?: boolean;
}

const StakingDetail = ({ title, amount, stakeable }: StakingDetailProps): JSX.Element => {
    const translate = useTranslate();
    const { showModal } = useModal();
    const theme = useTheme();

    return (
        <StakingDetailRoot flex={1} gap={12} justifyContent="space-between" alignItems="center">
            <Row gap={12} alignItems="center">
                <IconCircleWrapper size={44} backgroundColor={alpha(theme.palette.primary, 0.12)}>
                    <CircleNearIcon />
                </IconCircleWrapper>
                <Col>
                    <Typography variant="body3Regular">{title}</Typography>
                    <Typography variant="body3Strong">
                        <Balance isLoading={false} balance={amount ?? 0} variant="body3Strong" /> {config.tokenName}
                    </Typography>
                    <Typography variant="body4Strong" light>
                        ≈ {amount} {config.tokenName}
                    </Typography>
                </Col>
            </Row>
            {stakeable && (
                <Row>
                    <Button variant="outlined" size="sm" onPress={() => showModal(UnstakeModal)}>
                        {translate("unstake")}
                    </Button>
                </Row>
            )}
        </StakingDetailRoot>
    );
};

export default StakingDetail;
