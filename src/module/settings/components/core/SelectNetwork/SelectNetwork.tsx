import settingsState from "module/settings/state/SettingsState";
import { useRecoilState } from "recoil";
import { SettingsStorage } from "module/settings/SettingsStorage";
import { config } from "config";
import { SelectOption } from "@peersyst/react-native-components";
import { Chain } from "module/common/service/CkbSdkService.types";
import { useTranslate } from "module/common/hook/useTranslate";
import SettingsSelect from "../../input/SettingsSelect/SettingsSelect";
import { serviceInstancesMap } from "module/wallet/state/WalletState";

const SelectNetwork = (): JSX.Element => {
    const translate = useTranslate();
    const networkOptions: SelectOption<Chain>[] = [
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

    const handleNetworkChange = (network: Chain) => {
        //Use another thread
        setTimeout(async () => {
            for (let i = 0; i < serviceInstancesMap.size; i += 1) {
                await serviceInstancesMap.get(i)?.[network]?.synchronize();
            }
        });
        setSettings({ ...settings, network });
        SettingsStorage.set({ network });
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
