import { Col, Row } from "@peersyst/react-native-components";
import Typography from "module/common/component/display/Typography/Typography";
import { useTranslate } from "module/common/hook/useTranslate";
import { ValidatorRoot, ValidatorStatusTag } from "module/staking/component/core/ValidatorInformation/ValidatorInformation.styles";
import Account from "module/wallet/component/display/Account/Account";
import Balance from "module/wallet/component/display/Balance/Balance";
import { ValidatorInformationProps } from "module/staking/component/core/ValidatorInformation/ValidatorInformation.types";
import { capitalize } from "@peersyst/react-utils";
import { convertYoctoToNear, TransactionActionKind } from "module/sdk";
import ActionIcon from "module/transaction/component/display/ActionIcon/ActionIcon";

const ValidatorInformation = ({ validator: { accountId, stakingBalance, fee, status } }: ValidatorInformationProps): JSX.Element => {
    const translate = useTranslate();

    return (
        <ValidatorRoot justifyContent="space-between">
            <Row flex={1} alignItems="center" gap={10}>
                <ActionIcon actionKind={TransactionActionKind.VALIDATOR} />
                <Col>
                    <Account style={{ width: 180 }} address={accountId} variant="body3Strong" />
                    <Row>
                        {fee && (
                            <Typography variant="body4Strong" light>
                                {fee}% {capitalize(translate("fee"))} -{" "}
                            </Typography>
                        )}
                        <ValidatorStatusTag variant="body4Strong" status={status}>
                            {translate(status === "active" ? "active" : "inactive")}
                        </ValidatorStatusTag>
                    </Row>
                </Col>
            </Row>
            <Col>
                <Typography textAlign="right" variant="body3Strong" light>
                    {translate("staking")}
                </Typography>
                {stakingBalance && (
                    <Balance
                        style={{ maxWidth: 84 }}
                        balance={convertYoctoToNear(BigInt(stakingBalance!.staked).toString())}
                        variant="body4Strong"
                        units="token"
                    />
                )}
            </Col>
        </ValidatorRoot>
    );
};

export default ValidatorInformation;
