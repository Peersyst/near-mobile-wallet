import { StakingCurrentValidatorsRoot } from "module/staking/component/display/StakingCurrentValidators/StakingCurrentValidators.styles";
import Typography from "module/common/component/display/Typography/Typography";
import { useTranslate } from "module/common/hook/useTranslate";
import ValidatorInformation from "module/staking/component/core/ValidatorInformation/ValidatorInformation";
import useGetStakingValidators from "module/staking/hook/useGetStakingValidators";
import { Col } from "@peersyst/react-native-components";

const StakingCurrentValidators = (): JSX.Element => {
    const translate = useTranslate();

    const { stakingValidators: validators } = useGetStakingValidators();

    return (
        <StakingCurrentValidatorsRoot>
            <Typography variant="body1Strong">{translate("your_current_validators")}</Typography>
            {validators && validators.length > 0 ? (
                validators?.map((validator) => <ValidatorInformation key={validator.accountId} validator={validator} />)
            ) : (
                <Col flex={1} justifyContent="center">
                    <Typography textAlign="center" variant="body3Strong" light>
                        You are not staking with any validators
                    </Typography>
                </Col>
            )}
        </StakingCurrentValidatorsRoot>
    );
};

export default StakingCurrentValidators;
