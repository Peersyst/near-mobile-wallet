import { Spinner } from "@peersyst/react-native-components";
import TextField from "module/common/component/input/TextField/TextField";
import { TextFieldProps } from "module/common/component/input/TextField/TextField.types";
import { useTranslate } from "module/common/hook/useTranslate";
import { useAddressTextField } from "./hooks/useAddressTextField";

export type AddressTextFieldProps = Omit<TextFieldProps, "value" | "onChange" | "autoCapitalize" | "autoCorrect"> & {
    senderWalletIndex?: number;
};

const AddressTextField = ({
    defaultValue = "",
    senderWalletIndex,
    placeholder,
    label,
    error: errorProp,
    suffix,
    hideError: hideErrorProp,
    ...rest
}: AddressTextFieldProps) => {
    const translate = useTranslate();
    const { value, onChange, isLoading, error, hideError } = useAddressTextField({ defaultValue, senderWalletIndex });
    const finalSuffix = suffix ? suffix : <></>;

    return (
        <TextField
            label={label || translate("send_to")}
            placeholder={placeholder || translate("address")}
            hideError={hideErrorProp || hideError}
            suffix={isLoading ? <Spinner /> : finalSuffix}
            error={errorProp || error}
            value={value}
            onChange={onChange}
            autoCapitalize="none"
            autoCorrect={false}
            {...rest}
        />
    );
};

export default AddressTextField;
