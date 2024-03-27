import Typography from "module/common/component/display/Typography/Typography";
import SettingsTouchableCard from "../../input/SettingsTouchableCard/SettingsTouchableCard";
import { ReactElement } from "react";
import { View, ViewStyle } from "react-native";

export interface SettingsMenuItemProps {
    text: string;
    onPress?: () => void;
    destructive?: boolean;
    children?: ReactElement;
    style?: ViewStyle;
}

const SettingsMenuItem = ({ text, children, onPress, style, destructive = false }: SettingsMenuItemProps): JSX.Element => (
    <SettingsTouchableCard onPress={onPress}>
        <View style={style}>
            <Typography variant="body3Strong" color={destructive ? "status.error" : "text"}>
                {text}
            </Typography>
            {children}
        </View>
    </SettingsTouchableCard>
);

export default SettingsMenuItem;
