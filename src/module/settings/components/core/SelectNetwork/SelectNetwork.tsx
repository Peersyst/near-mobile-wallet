import { translate } from "locale";
import SelectGroup, { optionType } from "module/common/component/input/SelectGroup/SelectGroup";
import { SettingsStorage } from "module/settings/SettingsStorage";
import settingsState, { NetworkType, SettingsState } from "module/settings/state/SettingsState";
import { useRecoilState } from "recoil";

const SelectNetwork = (): JSX.Element => {
    const networkOtions: optionType[] = [
        {
            label: translate("network_name").replace("{n}", "Mainnet"),
            value: "mainnet",
        },
        {
            label: translate("network_name").replace("{n}", "Testnet"),
            value: "testnet",
        },
    ];
    const [settings, setSettings] = useRecoilState(settingsState);
    const handleSelect = async (value: unknown) => {
        const newSettings: SettingsState = { ...settings, network: value as NetworkType };
        await SettingsStorage.set(newSettings);
        setSettings(newSettings);
    };
    return (
        <SelectGroup options={networkOtions} value={settings.network} label={translate("select_your_network")} onChange={handleSelect} />
    );
};

export default SelectNetwork;
