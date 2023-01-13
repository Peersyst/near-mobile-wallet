import { Col, useSetTab } from "@peersyst/react-native-components";
import stakeRecoilState from "module/staking/state/StakeState";
import { useRecoilState } from "recoil";
import { useTranslate } from "module/common/hook/useTranslate";
import { useState } from "react";
import TextField from "module/common/component/input/TextField/TextField";
import Typography from "module/common/component/display/Typography/Typography";
import StakingList from "module/staking/component/core/StakingList/StakingList";
import { SendScreens } from "module/staking/component/core/AddStakeModal/AddStakeModal";
import { Validator } from "near-peersyst-sdk";

export interface SendForm {
    accountId: string;
}

const SelectValidatorScreen = () => {
    const translate = useTranslate();
    const [accountId, setAccountId] = useState("");
    const [, setStakeState] = useRecoilState(stakeRecoilState);
    const setTab = useSetTab();

    const onSelected = (validator: Validator) => {
        if (validator.accountId) {
            setStakeState((oldState) => ({ ...oldState, accountId: validator.accountId }));
            setTab(SendScreens.CONFIRM_VALIDATOR);
        }
    };

    return (
        <Col flex={1} gap={24} style={{ height: "100%" }}>
            <Typography color={(palette) => palette.gray["300"]} textAlign="center" variant="body3Strong">
                {translate("enter_new_validator")}
            </Typography>
            <TextField
                label={translate("enter_a_validator_account_id")!}
                placeholder={translate("validator_name_near")!}
                name="accountId"
                value={accountId}
                onChange={setAccountId}
                autoCapitalize="none"
                autoCorrect={false}
            />
            <Typography variant="body2Strong">{translate("or_select_a_validator")}</Typography>
            <StakingList search={accountId} onSelected={onSelected} />
        </Col>
    );
};

export default SelectValidatorScreen;
