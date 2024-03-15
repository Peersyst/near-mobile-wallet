import { Row } from "@peersyst/react-native-components";
import Typography from "module/common/component/display/Typography/Typography";
import SettingsTouchableCard from "../../input/SettingsTouchableCard/SettingsTouchableCard";

export interface SettingsMenuItemProps {
    text: string;
    onPress?: () => void;
    destructive?: boolean;
}

const SettingsMenuItem = ({ text, onPress, destructive = false }: SettingsMenuItemProps): JSX.Element => (
    <SettingsTouchableCard onPress={onPress}>
        <Row flex={1} alignItems="center">
            <Typography variant="body3Strong" color={destructive ? "status.error" : "text"}>
                {text}
            </Typography>
        </Row>
    </SettingsTouchableCard>
);

export default SettingsMenuItem;
