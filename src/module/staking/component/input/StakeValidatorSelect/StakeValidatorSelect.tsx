import { useTranslate } from "module/common/hook/useTranslate";
import { useState } from "react";
import TextField from "module/common/component/input/TextField/TextField";
import ValidatorListSelect from "../ValidatorListSelect/ValidatorListSelect";
import { Col, Label } from "@peersyst/react-native-components";

const StakeValidatorSelect = () => {
    const translate = useTranslate();
    const [accountId, setAccountId] = useState("");

    return (
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
            <Label variant="body2Strong" label={translate("or_select_a_validator")}>
                <ValidatorListSelect search={accountId} />
            </Label>
        </Col>
    );
};

export default StakeValidatorSelect;
