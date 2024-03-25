import { AlertProps as BaseAlertPros } from "@peersyst/react-native-components";
import { AlertRoot } from "module/common/component/feedback/Alert/Alert.styles";
import { ReactElement } from "react";

export interface AlertProps extends BaseAlertPros {
    icon?: boolean | ReactElement;
}
const Alert = ({ icon, ...rest }: AlertProps): JSX.Element => {
    return <AlertRoot icon={icon} {...rest} />;
};

export default Alert;
