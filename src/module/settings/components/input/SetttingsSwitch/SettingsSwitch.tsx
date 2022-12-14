import { Row, Switch, SwitchProps } from "@peersyst/react-native-components";
import Typography from "module/common/component/display/Typography/Typography";
import SettingsCard from "../../display/SettingsCard/SettingsCard";

export interface SettingsSwitchProps extends Pick<SwitchProps, "onChange" | "children" | "value" | "name" | "defaultValue"> {
    label: string;
}

const SettingsSwitch = ({ label, ...rest }: SettingsSwitchProps) => {
    return (
        <SettingsCard>
            <Row justifyContent="space-between">
                <Typography variant="body2Strong">{label}</Typography>
                <Switch {...rest} />
            </Row>
        </SettingsCard>
    );
};

export default SettingsSwitch;
