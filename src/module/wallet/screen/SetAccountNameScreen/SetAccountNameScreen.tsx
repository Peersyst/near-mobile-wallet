import { Col, Form } from "@peersyst/react-native-components";
import Button from "module/common/component/input/Button/Button";
import useCreateWallet from "module/wallet/hook/useCreateWallet";
import { useTranslate } from "module/common/hook/useTranslate";
import Typography from "module/common/component/display/Typography/Typography";
import { useDebounce } from "@peersyst/react-hooks";
import useCheckNameAvailability from "../../query/useCheckNameIdAvailability";
import GuidelinesList from "module/common/component/display/GuidelinesList/GuidelinesList";
import { TransaltionResourceType } from "locale";
import { AccountNameTextField } from "./SetAccountNameScreen.styles";
import { BaseAddWalletModalScreenProps } from "module/wallet/component/core/AddWalletModal/AddWalletModal.types";
import { useRecoilValue } from "recoil";
import settingsState from "module/settings/state/SettingsState";
import { Chains } from "near-peersyst-sdk";

interface SetWalletNameForm {
    walletName: string;
}

const ALLOWED_INIDICATIONS: TransaltionResourceType[] = ["allowed_lowercase_chars", "allowed_digits", "allowed_separators_chars"];

const NOT_ALLOWED_INIDICATIONS: TransaltionResourceType[] = ["not_allowed_chars", "near_account_min_chars", "near_account_max_chars"];

const SetAccountNameScreen = ({ onSubmit, submitText }: BaseAddWalletModalScreenProps): JSX.Element => {
    const {
        setName,
        state: { name = "" },
    } = useCreateWallet();
    const translate = useTranslate();
    const translateError = useTranslate("error");
    const { network } = useRecoilValue(settingsState);
    const suffix = network === Chains.MAINNET ? ".near" : ".testnet";
    const { value, handleChange, debouncedValue, debouncing } = useDebounce(name.substring(0, name.length - suffix.length));
    const finalName = debouncedValue + suffix;
    const { data: available = false, isLoading: nameLoading } = useCheckNameAvailability(finalName);

    const handleSubmit = ({ walletName }: SetWalletNameForm) => {
        setName(walletName + suffix);
        onSubmit();
    };

    const finalLoding = debouncing || nameLoading;
    const error = !available && debouncedValue.length > 0 && debouncedValue.length < 59;
    const success = !finalLoding && available && finalName !== name;

    return (
        <Form onSubmit={handleSubmit} style={{ flex: 1 }}>
            <Col flex={1} gap={30}>
                <Col gap="7%" flex={1}>
                    <AccountNameTextField
                        suffix={
                            <Typography variant="body2Strong" style={{ fontSize: 16 }}>
                                {suffix}
                            </Typography>
                        }
                        hint={success ? translate("name_available", { name: finalName }) : undefined}
                        name="walletName"
                        defaultValue={""}
                        value={value}
                        error={[error, translateError("invalid_name_ID", { nameID: finalName })]}
                        onChange={handleChange}
                        placeholder="mycoolid"
                        hideError={finalLoding}
                        validators={{ maxChars: 64, minChars: 2, address: true }}
                        label={translate("enter_your_custom_address")}
                        showValid={success}
                        required
                    />
                    <GuidelinesList allowed>{ALLOWED_INIDICATIONS.map((key) => translate(key))}</GuidelinesList>
                    <GuidelinesList allowed={false}>{NOT_ALLOWED_INIDICATIONS.map((key) => translate(key))}</GuidelinesList>
                </Col>
                <Button fullWidth type="submit" loading={finalLoding}>
                    {submitText || translate("continue")}
                </Button>
            </Col>
        </Form>
    );
};

export default SetAccountNameScreen;
