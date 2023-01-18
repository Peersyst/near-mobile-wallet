import { UserCheckIcon } from "icons";
import { Col, Row } from "@peersyst/react-native-components";
import { IconCircleWrapper } from "module/common/component/display/IconCircleWrapper/IconCircleWrapper.styles";
import { useTheme } from "@peersyst/react-native-styled";
import Typography from "module/common/component/display/Typography/Typography";
import { useTranslate } from "module/common/hook/useTranslate";
import { ValidatorRoot, ValidatorStatusTag } from "module/staking/component/core/ValidatorInformation/ValidatorInformation.styles";
import Account from "module/wallet/component/display/Account/Account";
import Balance from "module/wallet/component/display/Balance/Balance";
import { ValidatorInformationProps } from "module/staking/component/core/ValidatorInformation/ValidatorInformation.types";
import { capitalize } from "@peersyst/react-utils";
import { convertYoctoToNear } from "module/sdk";

const ValidatorInformation = ({ validator: { accountId, stakingBalance, fee, active } }: ValidatorInformationProps): JSX.Element => {
    const theme = useTheme();
    const translate = useTranslate();

    return (
        <ValidatorRoot justifyContent="space-between">
            <Row flex={1} alignItems="center" gap={10}>
                <IconCircleWrapper size={44} backgroundColor={theme.palette.overlay["8%"]}>
                    <UserCheckIcon />
                </IconCircleWrapper>
                <Col>
                    <Account address={accountId} variant="body3Strong" />
                    <Row>
                        {fee && (
                            <Typography variant="body4Strong" light>
                                {fee}% {capitalize(translate("fee"))} -{" "}
                            </Typography>
                        )}
                        <ValidatorStatusTag variant="body4Strong" active={active}>
                            {translate(active ? "active" : "inactive")}
                        </ValidatorStatusTag>
                    </Row>
                </Col>
            </Row>
            <Col flex={1} alignItems="flex-end">
                <Typography textAlign="right" variant="body3Strong" light>
                    {translate("staking")}
                </Typography>
                {stakingBalance && (
                    <Row>
                        <Balance
                            style={{ maxWidth: 84 }}
                            balance={convertYoctoToNear(BigInt(stakingBalance!.staked).toString())}
                            variant="body4Strong"
                            textAlign="right"
                            units="token"
                        />
                    </Row>
                )}
            </Col>
        </ValidatorRoot>
    );
};

export default ValidatorInformation;
