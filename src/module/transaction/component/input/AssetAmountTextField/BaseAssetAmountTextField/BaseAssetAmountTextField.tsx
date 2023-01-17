import { Spinner } from "@peersyst/react-native-components";
import Typography from "module/common/component/display/Typography/Typography";
import NumericTextField, { NumericTextFieldProps } from "module/common/component/input/NumericTextField/NumericTextField";

export type BaseAssetAmountTextFieldProps = Omit<NumericTextFieldProps, "suffix"> & {
    loading?: boolean;
    units: string;
};

const BaseAssetAmountTextField = ({ loading = false, units, disabled, ...rest }: BaseAssetAmountTextFieldProps) => {
    return (
        <NumericTextField
            disabled={loading || disabled}
            suffix={loading ? <Spinner size="small" /> : <Typography variant="body4Strong">{units}</Typography>}
            {...rest}
        />
    );
};

export default BaseAssetAmountTextField;
