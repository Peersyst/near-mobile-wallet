import { Spinner } from "@peersyst/react-native-components";
import Typography from "module/common/component/display/Typography/Typography";
import NumericInput, { NumericInputProps } from "module/common/component/input/NumericInput/NumericInput";

export type BaseAssetAmountInputProps = Omit<NumericInputProps, "suffix"> & {
    loading?: boolean;
    units: string;
};

const BaseAssetAmountInput = ({ loading = false, units, disabled, ...rest }: BaseAssetAmountInputProps) => {
    return (
        <NumericInput
            disabled={loading || disabled}
            suffix={loading ? <Spinner size="small" /> : <Typography variant="body4Strong">{units}</Typography>}
            {...rest}
        />
    );
};

export default BaseAssetAmountInput;
