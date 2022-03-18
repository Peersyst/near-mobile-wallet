import { translate } from "locale";
import SelectGroup from "module/common/component/input/SelectGroup/SelectGroup";
import { SettingsStorage } from "module/settings/SettingsStorage";
import settingsState, { FeeType, SettingsState } from "module/settings/state/SettingsState";
import { useRecoilState } from "recoil";

const SelectFee = (): JSX.Element => {
    const feeOptions: FeeType[] = ["slow", "average", "fast"];
    const [settings, setSettings] = useRecoilState(settingsState);
    const handleSelect = async (value: unknown) => {
        const newSettings: SettingsState = { ...settings, fee: value as FeeType };
        await SettingsStorage.set(newSettings);
        setSettings(newSettings);
    };
    return <SelectGroup value={settings.fee} onChange={handleSelect} options={feeOptions} label={translate("modify_default_fee")} />;
};

export default SelectFee;
