import { AlertProps } from "@peersyst/react-native-components";
import { AlertRoot } from "module/common/component/feedback/Alert/Alert.styles";

const Alert = (props: AlertProps): JSX.Element => {
    return <AlertRoot {...props} />;
};

export default Alert;
