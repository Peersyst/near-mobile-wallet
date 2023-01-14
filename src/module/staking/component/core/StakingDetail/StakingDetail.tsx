import { Col, Row, useModal } from "@peersyst/react-native-components";
import Typography from "module/common/component/display/Typography/Typography";
import Button from "module/common/component/input/Button/Button";
import { useTranslate } from "module/common/hook/useTranslate";
import { CircleNearIcon, StakingDetailRoot } from "module/staking/component/core/StakingDetail/StakingDetail.styles";
import Balance from "module/wallet/component/display/Balance/Balance";
import UnstakeModal from "module/staking/component/core/UnstakeModal/UnstakeModal";
import { alpha } from "@peersyst/react-utils";
import { IconCircleWrapper } from "module/common/component/display/IconCircleWrapper/IconCircleWrapper.styles";
import { useTheme } from "@peersyst/react-native-styled";
import { convertYoctoToNear } from "module/sdk";
import useNativeTokenConversion from "module/common/hook/useNativeTokenConversion";
import { useRecoilValue } from "recoil";
import settingsState from "module/settings/state/SettingsState";

export interface StakingDetailProps {
    title: string;
    amount: number | undefined;
    stakeable?: boolean;
}

const StakingDetail = ({ title, amount, stakeable }: StakingDetailProps): JSX.Element => {
    const translate = useTranslate();
    const { showModal } = useModal();
    const theme = useTheme();

    const { fiat } = useRecoilValue(settingsState);
    const { value: fiatValue } = useNativeTokenConversion(convertYoctoToNear(BigInt(amount ?? 0).toString()), fiat);

    return (
        <StakingDetailRoot flex={1} gap={12} justifyContent="space-between" alignItems="center">
            <Row gap={12} alignItems="center">
                <IconCircleWrapper size={44} backgroundColor={alpha(theme.palette.primary, 0.12)}>
                    <CircleNearIcon />
                </IconCircleWrapper>
                <Col>
                    <Typography variant="body3Regular">{title}</Typography>
                    <Balance
                        balance={convertYoctoToNear(BigInt(amount ?? 0).toString())}
                        options={{ maximumFractionDigits: 3 }}
                        variant="body3Strong"
                        units="token"
                    />
                    <Balance balance={fiatValue} variant="body4Strong" units="usd" options={{ maximumFractionDigits: 2 }} light />
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
