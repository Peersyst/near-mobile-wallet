import { useTranslate } from "module/common/hook/useTranslate";
import TextField from "module/common/component/input/TextField/TextField";
import ValidatorListSelect from "./ValidatorListSelect/ValidatorListSelect";
import { Col } from "@peersyst/react-native-components";
import { ValidatorSelectProvider } from "./context/ValidatorSelectContext";
import Typography from "module/common/component/display/Typography/Typography";
import useStakingValidatorController from "./hook/useStakingValidatorController";
import { ValidatorStakingBalanceProps } from "module/staking/component/display/ValidatorInformation/ValidatorStakingBalance/ValidatorStakingBalance";
import { Validator } from "near-peersyst-sdk";

export interface StakeValidatorSelectProps extends Pick<ValidatorStakingBalanceProps, "stakingBalanceType"> {
    validators: Validator[];
    loading: boolean;
    onSelected: (validator: Validator) => void;
    withSearch?: boolean;
}

const StakeValidatorSelect = ({ validators, loading, onSelected, withSearch = false, ...rest }: StakeValidatorSelectProps): JSX.Element => {
    const translate = useTranslate();
    const { queryValidators, setAccountId, accountId, isPending } = useStakingValidatorController(validators);

    const ValidatorList = (
        <Col style={{ height: "100%" }}>
            <Typography variant="body2Strong">{translate(withSearch ? "or_select_a_validator" : "select_validator")!}</Typography>
            {isPending ? (
                <Col style={{ paddingTop: "3%" }}>
                    <Typography light variant="body2Regular" textAlign="center">
                        {translate("loading") + "..."}
                    </Typography>
                </Col>
            ) : (
                <ValidatorListSelect validators={queryValidators} isLoading={loading} {...rest} />
            )}
        </Col>
    );

    return (
        <ValidatorSelectProvider value={{ setSelectedValidator: onSelected }}>
            <Col flex={1}>
                {withSearch ? (
                    <Col gap="8%">
                        <TextField
                            label={translate("enter_a_validator_account_id")!}
                            placeholder={translate("validator_name_near")!}
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
