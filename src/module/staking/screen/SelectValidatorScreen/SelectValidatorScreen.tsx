import { Col } from "@peersyst/react-native-components";
import Typography from "module/common/component/display/Typography/Typography";
import StakeValidatorSelect from "module/staking/component/input/StakeValidatorSelect/StakeValidatorSelect";
import { useSetRecoilState } from "recoil";
import stakeRecoilState from "module/staking/state/StakeState";
import { Validator } from "near-peersyst-sdk";

interface SelectValidatorScreenProps {
    message: string;
    validators: Validator[] | undefined;
    loading: boolean;
    onFinish: () => void;
    withSearch?: boolean;
}

const SelectValidatorScreen = ({ message, validators, loading, onFinish, ...rest }: SelectValidatorScreenProps): JSX.Element => {
    const setStakeState = useSetRecoilState(stakeRecoilState);

    const onSelected = (validator: Validator) => {
        if (validator.accountId) {
            setStakeState((state) => {
                return {
                    ...state,
                    validator: validator,
                };
            });
            onFinish(); //callback
        }
    };

    return (
        <Col flex={1} gap={24} style={{ height: "100%" }}>
            <Typography color={(palette) => palette.gray["300"]} textAlign="center" variant="body3Strong">
                {message}
            </Typography>
            <StakeValidatorSelect validators={validators} loading={loading} onSelected={onSelected} {...rest} />
        </Col>
    );
};

export default SelectValidatorScreen;
