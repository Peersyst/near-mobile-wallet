import { useRecoilState } from "recoil";
import settingsState from "module/settings/state/SettingsState";
import SettingsSwitch from "module/settings/components/input/SetttingsSwitch/SettingsSwitch";
import useTranslate from "module/common/hook/useTranslate";
import ControllerFactory from "refactor/ui/adapter/ControllerFactory";

const BiometricsSwitch = (): JSX.Element => {
    const translate = useTranslate();

    const [settings, setSettings] = useRecoilState(settingsState);

    const handleChange = (biometrics: boolean) => {
        setSettings((s) => ({ ...s, biometrics }));
        // <<< refactor
        ControllerFactory.settingsController.set({ biometrics });
        // refactor >>>
    };

    return <SettingsSwitch value={settings.biometrics} onChange={handleChange} label={translate("biometricAuthentication")} />;
};

export default BiometricsSwitch;
