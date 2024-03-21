import { AlertProps as BaseAlertPros, ThemePalette } from "@peersyst/react-native-components";
import { AlertRoot } from "module/common/component/feedback/Alert/Alert.styles";

export interface AlertProps extends BaseAlertPros {
    color?: keyof ThemePalette;
}
const Alert = ({ color, ...rest }: AlertProps): JSX.Element => {
    return <AlertRoot color={color} {...rest} />;
};

export default Alert;
