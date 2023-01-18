import { useTranslate } from "module/common/hook/useTranslate";
import { useState } from "react";
import TextField from "module/common/component/input/TextField/TextField";
import ValidatorListSelect from "../ValidatorListSelect/ValidatorListSelect";
import { Col, Label } from "@peersyst/react-native-components";
import { StakingValidator } from "module/staking/hook/useGetStakingValidators";
import { ValidatorSelectProvider } from "module/staking/component/context/ValidatorSelectContext";

interface StakeValidatorSelectProps {
    validators: StakingValidator[] | undefined;
    loading: boolean;
    onSelected: (validator: StakingValidator) => void;
    withSearch?: boolean;
}

const StakeValidatorSelect = ({ validators, loading, onSelected, withSearch = false }: StakeValidatorSelectProps): JSX.Element => {
    const translate = useTranslate();
    const [accountId, setAccountId] = useState("");

    return (
        <ValidatorSelectProvider value={{ validators: validators, isLoading: loading, onSelected: onSelected }}>
            <Col flex={1}>
                {withSearch ? (
                    <Col gap={12}>
                        <TextField
                            label={translate("enter_a_validator_account_id")!}
                            placeholder={translate("validator_name_near")!}
                            name="accountId"
                            value={accountId}
                            onChange={setAccountId}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        <Label variant="body2Strong" label={translate("or_select_a_validator")!} style={{ height: "100%" }}>
                            <ValidatorListSelect search={accountId} />
                        </Label>
                    </Col>
                ) : (
                    <Label variant="body2Strong" label={translate("select_validator")!} style={{ height: "100%" }}>
                        <ValidatorListSelect />
                    </Label>
                )}
            </Col>
        </ValidatorSelectProvider>
    );
};

export default StakeValidatorSelect;
