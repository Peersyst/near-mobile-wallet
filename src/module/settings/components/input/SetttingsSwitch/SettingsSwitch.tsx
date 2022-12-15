import { Switch, SwitchProps } from "@peersyst/react-native-components";
import SettingsCard from "../../display/SettingsCard/SettingsCard";

export interface SettingsSwitchProps extends SwitchProps {
    label: string;
}

const SettingsSwitch = ({ ...rest }: SettingsSwitchProps) => {
    return (
        <SettingsCard>
            <Switch {...rest} />
        </SettingsCard>
    );
};

export default SettingsSwitch;
