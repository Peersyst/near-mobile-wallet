import { Col, Form } from "@peersyst/react-native-components";
import TextField from "module/common/component/input/TextField/TextField";
import Button from "module/common/component/input/Button/Button";
import useCreateWallet from "module/wallet/hook/useCreateWallet";
import { useTranslate } from "module/common/hook/useTranslate";
import Typography from "module/common/component/display/Typography/Typography";
import { useDebounce } from "@peersyst/react-hooks";
import useCheckNameAvailability from "../query/useCheckNameIdAvailability";

interface SetWalletNameForm {
    walletName: string;
}

export interface SetWalletNameScreenProps {
    onSubmit: () => void;
    submitText: string;
}

const SetWalletNameScreen = ({ onSubmit, submitText }: SetWalletNameScreenProps): JSX.Element => {
    const {
        setName,
        state: { name },
    } = useCreateWallet();
    const translate = useTranslate();
    const translateError = useTranslate("error");
    const { value, handleChange, debouncedValue, debouncing } = useDebounce("");
    const { data: available = false, isLoading: nameLoading } = useCheckNameAvailability(debouncedValue + ".near");

    const handleSubmit = ({ walletName }: SetWalletNameForm) => {
        setName(walletName);
        onSubmit();
    };

    const finalLoding = debouncing || nameLoading;
    const error = !available && !finalLoding;

    return (
        <Form onSubmit={handleSubmit} style={{ flex: 1 }}>
            <Col flex={1} justifyContent="space-between">
                <Col gap={30} flex={1}>
                    <TextField
                        suffix={
                            <Typography variant="body2Strong" style={{ fontSize: 16 }}>
                                .near
                            </Typography>
                        }
                        name="walletName"
                        defaultValue={""}
                        value={value}
                        error={[!available, translateError("invalid_name_ID", { nameID: name })]}
                        onChange={handleChange}
                        placeholder="mycooldid"
                        hideError={false}
                        label={translate("enter_your_custom_address")}
                        showValid={!finalLoding && !available}
                        required
                    />
                    <Button fullWidth>{error ? "error" : "no error"}</Button>
                </Col>
                <Button fullWidth type="submit">
                    {submitText}
                </Button>
            </Col>
        </Form>
    );
};

export default SetWalletNameScreen;
