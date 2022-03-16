import { translate } from "locale";
import SelectGroup from "module/common/component/input/SelectGroup/SelectGroup";
import settingsState, { NetworkType } from "module/settings/state/SettingsState";
import { useRecoilState } from "recoil";

const SelectNetwork = (): JSX.Element => {
    const options: NetworkType[] = ["mainnet", "testnet"];
    const [settings, setSettings] = useRecoilState(settingsState);
    return (
        <SelectGroup
            options={options}
            value={settings.network}
            label={translate("select_your_network")}
            onChange={(value) => setSettings({ ...settings, network: value as NetworkType })}
        />
    );
};

export default SelectNetwork;
