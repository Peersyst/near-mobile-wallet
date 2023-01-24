import { Col } from "@peersyst/react-native-components";
import Typography from "module/common/component/display/Typography/Typography";
import StakeValidatorSelect, { StakeValidatorSelectProps } from "module/staking/component/input/StakeValidatorSelect/StakeValidatorSelect";
import { useSetRecoilState } from "recoil";
import stakeRecoilState from "module/staking/state/StakeState";
import { Validator } from "near-peersyst-sdk";

interface StakingSelectValidatorScreenProps extends StakeValidatorSelectProps {
    message: string;
}

const StakingSelectValidatorScreen = ({ message, onSelected, ...rest }: StakingSelectValidatorScreenProps): JSX.Element => {
    const setStakeState = useSetRecoilState(stakeRecoilState);

    const handleOnSelected = (validator: Validator) => {
        if (validator.accountId) {
            setStakeState((state) => {
                return {
                    ...state,
                    validator: validator,
                };
            });
            onSelected(validator);
        }
    };

    return (
        <Col flex={1} gap="8%" style={{ height: "100%" }}>
            <Typography color={(palette) => palette.gray["300"]} textAlign="center" variant="body3Strong">
                {message}
            </Typography>
            <StakeValidatorSelect onSelected={handleOnSelected} {...rest} />
        </Col>
    );
};

export default StakingSelectValidatorScreen;
