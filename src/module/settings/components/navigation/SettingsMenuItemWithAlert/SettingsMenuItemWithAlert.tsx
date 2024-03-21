import { Col } from "@peersyst/react-native-components";
import Typography from "module/common/component/display/Typography/Typography";
import SettingsTouchableCard from "../../input/SettingsTouchableCard/SettingsTouchableCard";
import { ReactElement } from "react";

export interface SettingsMenuItemWithAlertProps {
    text: string;
    onPress?: () => void;
    destructive?: boolean;
    children?: ReactElement;
}

const SettingsMenuItemWithAlert = ({ text, onPress, destructive = false, children }: SettingsMenuItemWithAlertProps): JSX.Element => (
    <SettingsTouchableCard onPress={onPress}>
        <Col alignItems="flex-start" gap={8}>
            <Typography variant="body3Strong" color={destructive ? "status.error" : "text"}>
                {text}
            </Typography>
            {children}
        </Col>
    </SettingsTouchableCard>
);

export default SettingsMenuItemWithAlert;
