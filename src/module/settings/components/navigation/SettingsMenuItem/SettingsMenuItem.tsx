import { SettingsMenuItemRoot, SettingsMenuItemText } from "module/settings/components/navigation/SettingsMenuItem/SettingsMenuItem.styles";
import { TouchableOpacity } from "react-native";

export interface SettingsMenuItemProps {
    text: string;
    onPress: () => void;
    destructive?: boolean;
}

const SettingsMenuItem = ({ text, onPress, destructive = false }: SettingsMenuItemProps): JSX.Element => (
    <TouchableOpacity onPress={onPress}>
        <SettingsMenuItemRoot>
            <SettingsMenuItemText destructive={destructive} variant="body1">
                {text}
            </SettingsMenuItemText>
        </SettingsMenuItemRoot>
    </TouchableOpacity>
);

export default SettingsMenuItem;
