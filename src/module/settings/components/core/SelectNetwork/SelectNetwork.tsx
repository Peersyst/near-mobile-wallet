import settingsState, { NetworkType } from "module/settings/state/SettingsState";
import { useRecoilState } from "recoil";
import { SettingsStorage } from "module/settings/SettingsStorage";
import { config } from "config";
import { SelectOption } from "@peersyst/react-native-components";
import { useTranslate } from "module/common/hook/useTranslate";
import SettingsSelect from "../../input/SettingsSelect/SettingsSelect";
import { Chains } from "near-peersyst-sdk";
import ServiceInstance from "module/wallet/state/ServiceInstance/ServiceInstance";
import useWalletState from "module/wallet/hook/useWalletState";

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
    const { setWallets } = useWalletState();

    const handleNetworkChange = (network: NetworkType) => {
        setSettings({ ...settings, network });
        SettingsStorage.set({ network });
        setWallets([]);
    };

    return (
        <SettingsSelect
            disabled={!config.enableMainnet}
            options={networkOptions}
            value={settings.network}
            label={translate("select_your_network")}
            onChange={(value) => handleNetworkChange(value)}
        />
    );
};

export default SelectNetwork;
