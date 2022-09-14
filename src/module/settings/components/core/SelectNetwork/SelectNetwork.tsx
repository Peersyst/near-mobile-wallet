import { translate } from "locale";
import SelectGroup, { optionType } from "module/common/component/input/SelectGroup/SelectGroup";
import settingsState, { NetworkType } from "module/settings/state/SettingsState";
import { useRecoilState } from "recoil";
import { SettingsStorage } from "module/settings/SettingsStorage";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import { config } from "config";

const SelectNetwork = (): JSX.Element => {
    const networkOptions: optionType[] = [
        {
            label: translate("network_name", { name: "Mainnet" }),
            value: "mainnet",
        },
        {
            label: translate("network_name", { name: "Testnet" }),
            value: "testnet",
        },
    ];
    const [settings, setSettings] = useRecoilState(settingsState);

    const handleNetworkChange = (value: NetworkType) => {
        //Use another thread
        setTimeout(async () => {
            for (let i = 0; i < serviceInstancesMap.size; i += 1) {
                await serviceInstancesMap.get(i)?.[value]?.synchronize();
            }
        });
        setSettings({ ...settings, network: value as NetworkType });
        SettingsStorage.set({ network: value });
    };

    return (
        <SelectGroup
            disabled={!config.enableMainnet}
            options={networkOptions}
            value={settings.network}
            label={translate("select_your_network")}
            onChange={(value) => handleNetworkChange(value as NetworkType)}
        />
    );
};

export default SelectNetwork;
