import Typography from "module/common/component/display/Typography/Typography";
import ValidatorInformation from "module/staking/component/display/ValidatorInformation/ValidatorInformation";
import useGetStakingValidators from "module/staking/hook/useGetStakingValidators";
import { Col } from "@peersyst/react-native-components";
import { useTranslate } from "module/common/hook/useTranslate";
import MainList from "module/main/component/display/MainList/MainList";

const StakingCurrentValidators = (): JSX.Element => {
    const translateError = useTranslate("error");
    const { stakingValidators: validators, isLoading, refetch } = useGetStakingValidators();

    return (
        <MainList
            loading={isLoading}
            data={validators}
            onRefresh={refetch}
            renderItem={({ item: validator }) => <ValidatorInformation key={validator.accountId} validator={validator} />}
            ListEmptyComponent={
                isLoading ? undefined : (
                    <Col flex={1} justifyContent="center">
                        <Typography textAlign="center" variant="body3Strong" light>
                            {translateError("not_using_validators")}
                        </Typography>
                    </Col>
                )
            }
        />
    );
};

export default StakingCurrentValidators;
