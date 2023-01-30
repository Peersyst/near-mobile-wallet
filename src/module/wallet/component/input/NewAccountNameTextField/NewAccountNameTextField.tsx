import Typography from "module/common/component/display/Typography/Typography";
import { NewAccountNameTextFieldRoot } from "./NewAccountNameTextField.styles";
import { TextFieldProps } from "module/common/component/input/TextField/TextField.types";
import useNewAccountNameTextField from "./hook/useNewAccountNameTextField";

export type NewAccountNameTextFieldProps = Omit<TextFieldProps, "onChange" | "value" | "error" | "inputProps"> & {
    walletIndex?: number;
};

const NewAccountNameTextField = ({
    defaultValue,
    hideError: hideErrorProp,
    hint: hintProp,
    suffix: suffixProp,
    walletIndex,
    showValid: showValidProp,
    ...rest
}: NewAccountNameTextFieldProps) => {
    const { hint, suffix, onChange, value, error, hideError, showValid } = useNewAccountNameTextField({ defaultValue, walletIndex });

    return (
        <NewAccountNameTextFieldRoot
            autoCapitalize="none"
            suffix={
                suffixProp || (
                    <Typography variant="body2Strong" style={{ fontSize: 16 }}>
                        {suffix}
                    </Typography>
                )
            }
            textContentType="nickname"
            hint={hintProp || hint}
            value={value}
            maxLength={64 - suffix.length}
            error={error}
            onChange={onChange}
            hideError={hideErrorProp || hideError}
            validators={{ minChars: 2 }}
            showValid={showValidProp || showValid}
            {...rest}
        />
    );
};

export default NewAccountNameTextField;
