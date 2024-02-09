import { Col, Row } from "@peersyst/react-native-components";
import Typography from "module/common/component/display/Typography/Typography";
import useTranslate from "module/common/hook/useTranslate";
import { ValidatorRoot, ValidatorStatusTag } from "module/staking/component/display/ValidatorInformation/ValidatorInformation.styles";
import Account from "module/wallet/component/display/Account/Account";
import { ValidatorInformationProps } from "module/staking/component/display/ValidatorInformation/ValidatorInformation.types";
import { capitalize } from "@peersyst/react-utils";
import CardIcon from "module/common/component/display/CardIcon/CardIcon";
import { UserCheckIcon } from "icons";
import Button from "module/common/component/input/Button/Button";
import ValidatorStakingBalance from "module/staking/component/display/ValidatorInformation/ValidatorStakingBalance/ValidatorStakingBalance";

const ValidatorInformation = ({
    validator: { accountId, stakingBalance, fee, active },
    showEdit,
    onEdit,
    ...rest
}: ValidatorInformationProps): JSX.Element => {
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
            <Col style={{ maxWidth: "35%" }}>
                {showEdit ? (
                    <Button variant="outlined" size="sm" onPress={onEdit}>
                        {translate("edit")}
                    </Button>
                ) : (
                    <ValidatorStakingBalance stakingBalance={stakingBalance} {...rest} />
                )}
            </Col>
        </ValidatorRoot>
    );
};

export default ValidatorInformation;
