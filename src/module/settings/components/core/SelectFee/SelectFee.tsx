import { FeeRate } from "ckb-peersyst-sdk";
import { SettingsStorage } from "module/settings/SettingsStorage";
import settingsState, { FeeType } from "module/settings/state/SettingsState";
import { useRecoilState } from "recoil";
import { SelectOption } from "@peersyst/react-native-components";
import { useTranslate } from "module/common/hook/useTranslate";
import SettingsSelect from "../../input/SettingsSelect/SettingsSelect";

const SelectFee = (): JSX.Element => {
    const translate = useTranslate();
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
    const handleSelect = (fee: FeeType) => {
        setSettings((s) => ({ ...s, fee }));
        SettingsStorage.set({ fee });
    };
    return (
        <SettingsSelect
            value={settings.fee}
            onChange={(fee) => handleSelect(fee)}
            options={feeOptions}
            label={translate("modify_default_fee")}
        />
    );
};

export default SelectFee;
