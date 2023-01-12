import { Col, Form } from "@peersyst/react-native-components";
import Button from "module/common/component/input/Button/Button";
import stakeRecoilState from "module/staking/state/StakeState";
import { useRecoilState } from "recoil";
import { useTranslate } from "module/common/hook/useTranslate";
import { useState } from "react";
import TextField from "module/common/component/input/TextField/TextField";
import Typography from "module/common/component/display/Typography/Typography";
import { gradient } from "config/theme/baseTheme";

export interface SendForm {
    accountId: string;
}

const SelectValidatorScreen = () => {
    const translate = useTranslate();
    const [accountId, setAccountId] = useState("");
    const [, setStakeState] = useRecoilState(stakeRecoilState);

    const handleSubmit = ({ accountId }: SendForm) => {
        setStakeState((oldState) => ({ ...oldState, accountId: accountId }));
    };

    return (
        <>
            <Form onSubmit={handleSubmit} style={{ height: "100%" }}>
                <Col flex={1}>
                    <Col flex={1} gap={24}>
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
                    </Col>
                    <Col gap={8}>
                        <Button type="submit" fullWidth>
                            {translate("next")}
                        </Button>
                    </Col>
                </Col>
            </Form>
        </>
    );
};

export default SelectValidatorScreen;
