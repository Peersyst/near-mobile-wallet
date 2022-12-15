import { Row, useSetTheme, useTheme } from "@peersyst/react-native-components";
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
    const changeTheme = async () => {
        setTheme(mode === "light" ? "dark" : "light");
    };
    return (
        <SettingsSwitch
            LabelProps={{
                alignment: "space-between",
            }}
            style={{ backgroundColor: "red" }}
            onChange={changeTheme}
            value={mode === "light"}
            label={translate("select_theme")}
        >
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
