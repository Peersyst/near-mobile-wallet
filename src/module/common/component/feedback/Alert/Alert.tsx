import { AlertAction, AlertRoot } from "./Alert.styles";
import { AlertProps } from "./Alert.types";
import useGetAlertIcon from "./hook/useGetAlertIcon";
import { Row, Icon, Col } from "@peersyst/react-native-components";
import { Text } from "react-native";
import useAlertStyles from "./hook/useAlertStyles";
import { useMergeDefaultProps } from "@peersyst/react-components-core";

const Alert = (props: AlertProps): JSX.Element => {
    const { icon: iconProp = true, message, type, action, style, elevation = 0, square } = useMergeDefaultProps("Alert", props);

    const defaultIcon = useGetAlertIcon(type);
    const icon = iconProp ? defaultIcon : iconProp;

    const { text: textStyle, container: containerStyle } = useAlertStyles(style || {}, type);

    return (
        <AlertRoot type={type} style={containerStyle} elevation={elevation} square={square}>
            <Col flex={1} style={{ padding: 14 }}>
                <Row flex={1} alignItems="center" gap={10}>
                    {icon && (
                        <Row>
                            <Icon style={textStyle}>{icon}</Icon>
                        </Row>
                    )}
                    <Row flex={1}>
                        <Text style={textStyle} lineBreakMode="head">
                            {message}
                        </Text>
                    </Row>
                </Row>
                {action && <AlertAction style={textStyle}>{action}</AlertAction>}
            </Col>
        </AlertRoot>
    );
};

export default Alert;
