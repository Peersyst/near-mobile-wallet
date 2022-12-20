import settingsState, { NetworkType } from "module/settings/state/SettingsState";
import { useRecoilState } from "recoil";
import { SettingsStorage } from "module/settings/SettingsStorage";
import { SelectOption, useConfig } from "@peersyst/react-native-components";
import { useTranslate } from "module/common/hook/useTranslate";
import SettingsSelect from "../../input/SettingsSelect/SettingsSelect";
import { Chains } from "near-peersyst-sdk";

const SelectNetwork = (): JSX.Element => {
    const translate = useTranslate();
    const networkOptions: SelectOption<NetworkType>[] = [
        {
            label: translate("network_name", { name: "Mainnet" }),
            value: Chains.MAINNET,
        },
        {
            label: translate("network_name", { name: "Testnet" }),
            value: Chains.TESTNET,
        },
    ];
    const [settings, setSettings] = useRecoilState(settingsState);

    const handleNetworkChange = (network: NetworkType) => {
        setSettings({ ...settings, network });
        SettingsStorage.set({ network });
    };

    const enableChangeNetwork = useConfig("enableChangeNetwork");

    return (
        <SettingsSelect
            disabled={!enableChangeNetwork}
            options={networkOptions}
            value={settings.network}
            label={translate("select_your_network")}
            onChange={(value) => handleNetworkChange(value)}
        />
    );
};

export default SelectNetwork;
