import { FeeRate } from "ckb-peersyst-sdk";
import { translate } from "locale";
import { SettingsStorage } from "module/settings/SettingsStorage";
import settingsState, { FeeType } from "module/settings/state/SettingsState";
import { useRecoilState } from "recoil";
import Select from "module/common/component/input/Select/Select";
import { SelectOption } from "@peersyst/react-native-components";

const SelectFee = (): JSX.Element => {
    const feeOptions: SelectOption<FeeType>[] = [
        {
            label: translate("slow"),
            value: FeeRate.SLOW,
        },
        {
            label: translate("average"),
            value: FeeRate.NORMAL,
        },
        {
            label: translate("fast"),
            value: FeeRate.FAST,
        },
    ];
    const [settings, setSettings] = useRecoilState(settingsState);
    const handleSelect = async (value: FeeType) => {
        setSettings((s) => ({ ...s, fee: value }));
        SettingsStorage.set({ fee: value });
    };
    return (
        <Select
            value={settings.fee}
            onChange={(fee) => handleSelect(fee as FeeType)}
            options={feeOptions}
            label={translate("modify_default_fee")}
        />
    );
};

export default SelectFee;
