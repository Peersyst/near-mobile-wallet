import settingsState, { NetworkType } from "module/settings/state/SettingsState";
import { useRecoilState } from "recoil";
import { SelectOption, useConfig } from "@peersyst/react-native-components";
import { useTranslate } from "module/common/hook/useTranslate";
import SettingsSelect from "../../input/SettingsSelect/SettingsSelect";
import { Chains } from "near-peersyst-sdk";
import ChangeNetworkModal from "module/wallet/component/core/ChangeNetworkModal/ChangeNetworkModal";

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

    const enableChangeNetwork = useConfig("enableChangeNetwork");

    return (
        <ChangeNetworkModal>
            {({ showModal }) => {
                const handleNetworkChange = async (network: NetworkType) => {
                    setSettings({ ...settings, network });
                    showModal();
                };
                return (
                    <SettingsSelect
                        disabled={!enableChangeNetwork}
                        options={networkOptions}
                        value={settings.network}
                        label={translate("select_your_network")}
                        onChange={(value) => handleNetworkChange(value)}
                    />
                );
            }}
        </ChangeNetworkModal>
    );
};

export default SelectNetwork;
