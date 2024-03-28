import Typography from "module/common/component/display/Typography/Typography";
import SettingsTouchableCard from "../../input/SettingsTouchableCard/SettingsTouchableCard";
import { ReactNode } from "react";
import { Col } from "@peersyst/react-native-components";
import { ViewStyle } from "react-native";

export interface SettingsMenuItemProps {
    text: string;
    onPress?: () => void;
    destructive?: boolean;
    children?: ReactNode;
    style?: ViewStyle;
}

const SettingsMenuItem = ({ text, children, onPress, style, destructive = false }: SettingsMenuItemProps): JSX.Element => {
    return (
        <SettingsTouchableCard onPress={onPress} style={style}>
            <Col gap={10}>
                <Typography variant="body3Strong" color={destructive ? "status.error" : "text"}>
                    {text}
                </Typography>
                {children}
            </Col>
        </SettingsTouchableCard>
    );
};

export default SettingsMenuItem;
