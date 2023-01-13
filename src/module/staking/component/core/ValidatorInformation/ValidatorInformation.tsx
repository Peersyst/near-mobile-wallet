import { UserCheckIcon } from "icons";
import { Col, Row, useConfig } from "@peersyst/react-native-components";
import { IconCircleWrapper } from "module/common/component/display/IconCircleWrapper/IconCircleWrapper.styles";
import { useTheme } from "@peersyst/react-native-styled";
import Typography from "module/common/component/display/Typography/Typography";
import { useTranslate } from "module/common/hook/useTranslate";
import { ValidatorRoot, ValidatorStatusTag } from "module/staking/component/core/ValidatorInformation/ValidatorInformation.styles";
import Account from "module/wallet/component/display/Account/Account";
import Balance from "module/wallet/component/display/Balance/Balance";
import { ValidatorInformationProps } from "module/staking/component/core/ValidatorInformation/ValidatorInformation.types";
import { capitalize } from "@peersyst/react-utils";

const ValidatorInformation = ({ validator: { accountId, stakingBalance, fee = 0 } }: ValidatorInformationProps): JSX.Element => {
    const theme = useTheme();
    const translate = useTranslate();

    const tokenName = useConfig("tokenName");

    return (
        <ValidatorRoot justifyContent="space-between">
            <Row flex={1} alignItems="center" gap={10}>
                <IconCircleWrapper size={44} backgroundColor={theme.palette.overlay["8%"]}>
                    <UserCheckIcon />
                </IconCircleWrapper>
                <Col>
                    <Account address={accountId} variant="body3Strong" />
                    <Typography variant="body4Strong" light>
                        {fee}% {capitalize(translate("fee"))} - {/* This field is pending */}
                        <ValidatorStatusTag variant="body4Strong" status="active">
                            active
                        </ValidatorStatusTag>
                    </Typography>
                </Col>
            </Row>
            <Col>
                {/* This field is pending */}
                <Typography textAlign="right" variant="body3Strong" light>
                    staking
                </Typography>
                <Row>
                    <Balance style={{ maxWidth: 84 }} balance={stakingBalance!.staked} variant="body3Strong" />
                    <Typography variant="body3Strong">{" " + tokenName}</Typography>
                </Row>
            </Col>
        </ValidatorRoot>
    );
};

export default ValidatorInformation;
