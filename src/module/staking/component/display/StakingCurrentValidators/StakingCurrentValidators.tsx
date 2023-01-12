import { StakingCurrentValidatorsRoot } from "module/staking/component/display/StakingCurrentValidators/StakingCurrentValidators.styles";
import Typography from "module/common/component/display/Typography/Typography";
import { useTranslate } from "module/common/hook/useTranslate";
import useGetCurrentValidators from "module/staking/query/useGetCurrentValidators";
import ValidatorInformation from "module/staking/component/core/ValidatorInformation/ValidatorInformation";

const StakingCurrentValidators = (): JSX.Element => {
    const translate = useTranslate();

    const { data: validators } = useGetCurrentValidators();

    return (
        <StakingCurrentValidatorsRoot>
            <Typography variant="body1Strong">{translate("your_current_validators")}</Typography>
            {validators && validators.length > 0 ? (
                validators?.map((validator) => <ValidatorInformation key={validator.accountId} validator={validator} />)
            ) : (
                <Typography variant="body3Strong" light>
                    You are not staking with any validators
                </Typography>
            )}
        </StakingCurrentValidatorsRoot>
    );
};

export default StakingCurrentValidators;
