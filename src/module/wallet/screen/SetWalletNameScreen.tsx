import { Col, Form } from "@peersyst/react-native-components";
import TextField from "module/common/component/input/TextField/TextField";
import Button from "module/common/component/input/Button/Button";
import useCreateWallet from "module/wallet/hook/useCreateWallet";
import { useTranslate } from "module/common/hook/useTranslate";
import Typography from "module/common/component/display/Typography/Typography";
import { useDebounce } from "@peersyst/react-hooks";
import useCheckNameAvailability from "../query/useCheckNameIdAvailability";
import ExplanationList from "module/common/component/display/ExplanationList/ExplanationList";
import { TransaltionResourceType } from "locale";

interface SetWalletNameForm {
    walletName: string;
}

export interface SetWalletNameScreenProps {
    onSubmit: () => void;
    submitText: string;
}

const ALLOWED_INIDICATIONS: TransaltionResourceType[] = ["allowed_lowercase_chars", "allowed_digits", "allowed_separators_chars"];

const NOT_ALLOWED_INIDICATIONS: TransaltionResourceType[] = ["not_allowed_chars", "near_account_min_chars", "near_account_max_chars"];

const SetWalletNameScreen = ({ onSubmit, submitText }: SetWalletNameScreenProps): JSX.Element => {
    const { setName } = useCreateWallet();
    const translate = useTranslate();
    const translateError = useTranslate("error");
    const { value, handleChange, debouncedValue, debouncing } = useDebounce("");
    const { data: available = false, isLoading: nameLoading } = useCheckNameAvailability(debouncedValue + ".near");

    const handleSubmit = ({ walletName }: SetWalletNameForm) => {
        setName(walletName);
        onSubmit();
    };

    const finalLoding = debouncing || nameLoading;
    const error = !available;
    const success = !finalLoding && available;

    return (
        <Form onSubmit={handleSubmit} style={{ flex: 1 }}>
            <Col flex={1} gap={30}>
                <Col gap="7%" flex={1}>
                    <TextField
                        suffix={
                            <Typography variant="body2Strong" style={{ fontSize: 16 }}>
                                .near
                            </Typography>
                        }
                        hint={success ? translate("name_available", { name: value }) : undefined}
                        name="walletName"
                        defaultValue={""}
                        value={value}
                        error={[error, translateError("invalid_name_ID", { nameID: value })]}
                        onChange={handleChange}
                        placeholder="mycooldid"
                        hideError={false}
                        validators={{ maxChars: 64, minChars: 2, address: true }}
                        label={translate("enter_your_custom_address")}
                        showValid={success}
                        required
                    />
                    <ExplanationList allowed>{ALLOWED_INIDICATIONS.map((key) => translate(key))}</ExplanationList>
                    <ExplanationList allowed={false}>{NOT_ALLOWED_INIDICATIONS.map((key) => translate(key))}</ExplanationList>
                </Col>
                <Button fullWidth type="submit" loading={finalLoding}>
                    {submitText}
                </Button>
            </Col>
        </Form>
    );
};

export default SetWalletNameScreen;
