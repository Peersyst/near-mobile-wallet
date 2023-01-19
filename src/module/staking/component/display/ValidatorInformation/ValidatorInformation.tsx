import { Col, Row } from "@peersyst/react-native-components";
import Typography from "module/common/component/display/Typography/Typography";
import { useTranslate } from "module/common/hook/useTranslate";
import Account from "module/wallet/component/display/Account/Account";
import Balance from "module/wallet/component/display/Balance/Balance";
import { capitalize } from "@peersyst/react-utils";
import CardIcon from "module/common/component/display/CardIcon/CardIcon";
import { UserCheckIcon } from "icons";
import { ValidatorInformationProps } from "./ValidatorInformation.types";
import { ValidatorRoot, ValidatorStatusTag } from "./ValidatorInformation.styles";

const ValidatorInformation = ({ validator: { accountId, stakingBalance, fee, active } }: ValidatorInformationProps): JSX.Element => {
    const translate = useTranslate();

    return (
        <ValidatorRoot justifyContent="space-between">
            <Row flex={1} alignItems="center" gap={10}>
                <CardIcon active={false} Icon={UserCheckIcon} darkInactive />
                <Col>
                    <Account style={{ width: 180 }} address={accountId} variant="body3Strong" />
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
            <Col>
                <Typography textAlign="right" variant="body3Strong" light>
                    {translate("staking")}
                </Typography>
                {stakingBalance && (
                    <Balance style={{ maxWidth: 100 }} balance={stakingBalance.staked} variant="body3Strong" units="token" />
                )}
            </Col>
        </ValidatorRoot>
    );
};

export default ValidatorInformation;
