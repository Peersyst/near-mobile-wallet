import { translate } from "locale";
import SelectGroup, { optionType } from "module/common/component/input/SelectGroup/SelectGroup";
import { SettingsStorage } from "module/settings/SettingsStorage";
import settingsState, { NetworkType, SettingsState } from "module/settings/state/SettingsState";
import { useRecoilState } from "recoil";
import { SettingsStorage } from "module/settings/SettingsStorage";

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
    const handleNetworkChange = (value: NetworkType) => {
        setSettings({ ...settings, network: value as NetworkType });
        SettingsStorage.set({ network: value });
    };

    return (
        <SelectGroup
            options={options}
            value={settings.network}
            label={translate("select_your_network")}
            onChange={(value) => handleNetworkChange(value as NetworkType)}
        />
    );
};

export default SelectNetwork;
