import { useTranslate } from "module/common/hook/useTranslate";
import { useState } from "react";
import TextField from "module/common/component/input/TextField/TextField";
import Typography from "module/common/component/display/Typography/Typography";
import StakingList from "module/staking/component/core/StakingList/StakingList";
import { Validator } from "near-peersyst-sdk";

export interface StakeValidatorSelectProps {
    onSelected: (validator: Validator) => void;
}

const StakeValidatorSelect = ({ onSelected }: StakeValidatorSelectProps) => {
    const translate = useTranslate();
    const [accountId, setAccountId] = useState("");

    return (
        <>
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
        </>
    );
};

export default StakeValidatorSelect;
