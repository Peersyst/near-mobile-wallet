import { Col, useSetTab } from "@peersyst/react-native-components";
import { useTranslate } from "module/common/hook/useTranslate";
import Typography from "module/common/component/display/Typography/Typography";
import StakeValidatorSelect from "module/staking/component/input/StakeValidatorSelect/StakeValidatorSelect";
import { useSetRecoilState } from "recoil";
import stakeRecoilState from "module/staking/state/StakeState";
import { SendScreens } from "module/staking/component/core/AddStakeModal/AddStakeModal";
import { StakingValidator } from "module/staking/hook/useGetStakingValidators";
import useSelectedWallet from "module/wallet/hook/useSelectedWallet";
import useGetAllValidators from "module/staking/query/useGetAllValidators";
import { ValidatorSelectProvider } from "module/staking/component/context/ValidatorSelectContext";

export interface SendForm {
    accountId: string;
}

const SelectValidatorScreen = () => {
    const translate = useTranslate();
    const setStakeState = useSetRecoilState(stakeRecoilState);
    const setTab = useSetTab();
    const { index } = useSelectedWallet();
    const { isLoading, data } = useGetAllValidators(index);

    const onSelected = (validator: StakingValidator) => {
        if (validator.accountId) {
            setStakeState((state) => {
                return {
                    ...state,
                    validator: validator,
                };
            });
            setTab(SendScreens.CONFIRM_VALIDATOR);
        }
    };

    return (
        <Col flex={1} gap={24} style={{ height: "100%" }}>
            <Typography color={(palette) => palette.gray["300"]} textAlign="center" variant="body3Strong">
                {translate("enter_new_validator")}
            </Typography>
            <ValidatorSelectProvider value={{ validators: data, isLoading: isLoading, onSelected: onSelected }}>
                <StakeValidatorSelect />
            </ValidatorSelectProvider>
        </Col>
    );
};

export default SelectValidatorScreen;
