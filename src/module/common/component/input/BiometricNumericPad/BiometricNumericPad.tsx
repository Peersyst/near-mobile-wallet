import { BiometricNumericPadProps } from "module/common/component/input/BiometricNumericPad/BiometricNumericPad.types";
import useBiometrics from "module/auth/hook/useBiometrics";
import { KeyboardItem } from "module/common/component/input/Keyboard/Keyboard";
import { AuthenticationType } from "expo-local-authentication";
import { FaceIdIcon, FingerprintIcon } from "icons";
import NumericPad from "module/common/component/input/NumericPad/NumericPad";
import { useRecoilValue } from "recoil";
import settingsState from "module/settings/state/SettingsState";

const BiometricNumericPad = ({ onBiometricsSuccess, onBiometricsError, ...numericPadProps }: BiometricNumericPadProps): JSX.Element => {
    const { biometrics: biometricsEnabled } = useRecoilValue(settingsState);

    const { biometric, authenticate } = useBiometrics({
        authenticateOnMount: biometricsEnabled,
        onAuthenticationSuccess: onBiometricsSuccess,
        onAuthenticationError: onBiometricsError,
    });

    const keyboardBiometricsItem: KeyboardItem = {
        icon: biometric === AuthenticationType.FACIAL_RECOGNITION ? <FaceIdIcon /> : <FingerprintIcon />,
        onPress: authenticate,
    };

    return <NumericPad optionalItem={biometricsEnabled ? keyboardBiometricsItem : undefined} {...numericPadProps} />;
};

export default BiometricNumericPad;
