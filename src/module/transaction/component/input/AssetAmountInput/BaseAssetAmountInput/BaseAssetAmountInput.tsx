import { Spinner } from "@peersyst/react-native-components";
import Typography from "module/common/component/display/Typography/Typography";
import NumericTextField, { NumericTextFieldProps } from "module/common/component/input/NumericTextField/NumericTextField";

export type BaseAssetAmountInputProps = Omit<NumericTextFieldProps, "suffix"> & {
    loading?: boolean;
    units: string;
};

const BaseAssetAmountInput = ({ loading = false, units, disabled, ...rest }: BaseAssetAmountInputProps) => {
    return (
        <NumericTextField
            disabled={loading || disabled}
            suffix={loading ? <Spinner size="small" /> : <Typography variant="body4Strong">{units}</Typography>}
            {...rest}
        />
    );
};

export default BaseAssetAmountInput;
