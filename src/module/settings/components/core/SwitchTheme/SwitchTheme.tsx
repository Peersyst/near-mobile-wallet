import { useSetTheme, useTheme } from "@peersyst/react-native-components";
import { useTranslate } from "module/common/hook/useTranslate";
import { MoonIcon } from "module/common/icons/MoonIcon";
import { SunIcon } from "module/common/icons/SunIcon";
import SettingsSwitch from "../../input/SetttingsSwitch/SettingsSwitch";
import { SwitchThemeIcon } from "./SwitchTheme.styles";

const SwitchTheme = () => {
    const setTheme = useSetTheme();
    const {
        palette: { mode },
    } = useTheme();
    const translate = useTranslate();
    const value = mode === "light";
    const changeTheme = async () => {
        setTheme(value ? "dark" : "light");
    };

    return (
        <SettingsSwitch onChange={changeTheme} value={value} label={translate("select_theme")}>
            {[
                <SwitchThemeIcon key="moon">
                    <MoonIcon />
                </SwitchThemeIcon>,
                <SwitchThemeIcon key="sun">
                    <SunIcon />
                </SwitchThemeIcon>,
            ]}
        </SettingsSwitch>
    );
};

export default SwitchTheme;
