import { Spinner } from "@peersyst/react-native-components";
import Typography from "module/common/component/display/Typography/Typography";
import NumericTextField, { NumericTextFieldProps } from "module/common/component/input/NumericTextField/NumericTextField";

export type BaseAssetAmountTextFieldProps = NumericTextFieldProps & {
    loading?: boolean;
    units: string;
    maxDecimals?: number;
};

const BaseAssetAmountTextField = ({ loading = false, units, disabled, suffix, maxDecimals, ...rest }: BaseAssetAmountTextFieldProps) => {
    const finalSuffix = suffix || (loading ? <Spinner size="small" /> : <Typography variant="body4Strong">{units}</Typography>);
    return <NumericTextField validators={{ decimals: maxDecimals }} disabled={loading || disabled} suffix={finalSuffix} {...rest} />;
};

export default BaseAssetAmountTextField;
