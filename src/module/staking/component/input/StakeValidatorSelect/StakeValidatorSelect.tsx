import { useTranslate } from "module/common/hook/useTranslate";
import { useState } from "react";
import TextField from "module/common/component/input/TextField/TextField";
import ValidatorListSelect from "./ValidatorListSelect/ValidatorListSelect";
import { Col, Label } from "@peersyst/react-native-components";
import { Validator } from "near-peersyst-sdk";
import { ValidatorSelectProvider } from "./context/ValidatorSelectContext";

export interface StakeValidatorSelectProps {
    validators: Validator[] | undefined;
    loading: boolean;
    onSelected: (validator: Validator) => void;
    withSearch?: boolean;
}

const StakeValidatorSelect = ({ validators, loading, onSelected, withSearch = false }: StakeValidatorSelectProps): JSX.Element => {
    const translate = useTranslate();
    const [accountId, setAccountId] = useState("");

    const ValidatorList = (
        <Label
            variant="body2Strong"
            label={translate(withSearch ? "or_select_a_validator" : "select_validator")!}
            style={{ height: "100%" }}
        >
            <ValidatorListSelect search={withSearch ? accountId : undefined} />
        </Label>
    );

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
                        {ValidatorList}
                    </Col>
                ) : (
                    ValidatorList
                )}
            </Col>
        </ValidatorSelectProvider>
    );
};

export default StakeValidatorSelect;
