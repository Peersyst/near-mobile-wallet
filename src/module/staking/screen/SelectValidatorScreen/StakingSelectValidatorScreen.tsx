import { Col } from "@peersyst/react-native-components";
import Typography from "module/common/component/display/Typography/Typography";
import StakeValidatorSelect, { StakeValidatorSelectProps } from "module/staking/component/input/StakeValidatorSelect/StakeValidatorSelect";
import { useSetRecoilState } from "recoil";
import stakeRecoilState from "module/staking/state/StakeState";
import { Validator } from "near-peersyst-sdk";
import useHaveNearInAccount from "module/common/hook/useHaveNearInAccount";
import YouDontHaveNearCard from "module/wallet/component/display/YouDontHaveNearCard/YouDontHaveNearCard";

interface StakingSelectValidatorScreenProps extends StakeValidatorSelectProps {
    message: string;
    setAvailableAsAmount?: boolean;
}

const StakingSelectValidatorScreen = ({
    message,
    onSelected,
    setAvailableAsAmount = false,
    ...rest
}: StakingSelectValidatorScreenProps): JSX.Element => {
    const setStakeState = useSetRecoilState(stakeRecoilState);
    const haveNearInAccount = useHaveNearInAccount();

    const handleOnSelected = (validator: Validator) => {
        if (validator.accountId) {
            setStakeState((state) => {
                return {
                    ...state,
                    validator: validator,
                    ...(setAvailableAsAmount && { amount: validator.stakingBalance?.available }),
                };
            });
            onSelected(validator);
        }
    };

    return (
        <Col flex={1} style={{ position: "absolute", height: "100%", width: "100%" }} gap="8%">
            <Typography color="gray.300" textAlign="center" variant="body3Strong">
                {message}
            </Typography>
            <StakeValidatorSelect onSelected={handleOnSelected} {...rest} />
            {!haveNearInAccount && <YouDontHaveNearCard />}
        </Col>
    );
};

export default StakingSelectValidatorScreen;
