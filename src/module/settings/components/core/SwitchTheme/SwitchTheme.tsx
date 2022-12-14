import { Row, useSetTheme, useTheme } from "@peersyst/react-native-components";
import { useTranslate } from "module/common/hook/useTranslate";
import { MoonIcon } from "module/common/icons/MoonIcon";
import { SunIcon } from "module/common/icons/SunIcon";
import SettingsSwitch from "../../input/SetttingsSwitch/SettingsSwitch";

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
        <SettingsSwitch onChange={changeTheme} label={translate("select_theme")}>
            {[
                <Row flex={1} alignItems="center">
                    <SunIcon style={{ fontSize: 12 }} />
                </Row>,
                <Row flex={1} alignItems="center" justifyContent="flex-end" style={{ marginRight: -2 }}>
                    <MoonIcon style={{ fontSize: 15 }} />
                </Row>,
            ]}
        </SettingsSwitch>
    );
};

export default SwitchTheme;
