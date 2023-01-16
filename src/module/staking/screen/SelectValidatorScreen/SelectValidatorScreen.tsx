import { Col, useSetTab } from "@peersyst/react-native-components";
import { useTranslate } from "module/common/hook/useTranslate";
import Typography from "module/common/component/display/Typography/Typography";
import StakeValidatorSelect from "module/staking/component/input/StakeValidatorSelect/StakeValidatorSelect";
import { useSetRecoilState } from "recoil";
import stakeRecoilState from "module/staking/state/StakeState";
import { Validator } from "near-peersyst-sdk";
import { SendScreens } from "module/staking/component/core/AddStakeModal/AddStakeModal";

export interface SendForm {
    accountId: string;
}

const SelectValidatorScreen = () => {
    const translate = useTranslate();
    const setStakeState = useSetRecoilState(stakeRecoilState);
    const setTab = useSetTab();

    const onSelected = (validator: Validator) => {
        if (validator.accountId) {
            setStakeState(validator);
            setTab(SendScreens.CONFIRM_VALIDATOR);
        }
    };

    return (
        <Col flex={1} gap={24} style={{ height: "100%" }}>
            <Typography color={(palette) => palette.gray["300"]} textAlign="center" variant="body3Strong">
                {translate("enter_new_validator")}
            </Typography>
            <StakeValidatorSelect onSelected={onSelected} />
        </Col>
    );
};

export default SelectValidatorScreen;
