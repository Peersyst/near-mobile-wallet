import { NumericPadProps } from "module/common/component/input/NumericPad/NumericPad.types";

export interface BiometricNumericPadProps extends Omit<NumericPadProps, "optionalItem"> {
    onBiometricsSuccess: () => void;
    onBiometricsError?: () => void;
}
