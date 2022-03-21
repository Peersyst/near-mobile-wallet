import { translate } from "locale";
import SelectGroup, { optionType } from "module/common/component/input/SelectGroup/SelectGroup";
import { SettingsStorage } from "module/settings/SettingsStorage";
import settingsState, { FeeType } from "module/settings/state/SettingsState";
import { useRecoilState } from "recoil";

const SelectFee = (): JSX.Element => {
    const feeOptions: optionType[] = [
        {
            label: translate("slow"),
            value: "slow",
        },
        {
            label: translate("average"),
            value: "average",
        },
        {
            label: translate("fast"),
            value: "fast",
        },
    ];
    const [settings, setSettings] = useRecoilState(settingsState);
    const handleSelect = async (value: FeeType) => {
        setSettings((s) => ({ ...s, fee: value }));
        SettingsStorage.set({ fee: value });
    };
    return (
        <SelectGroup
            value={settings.fee}
            onChange={(fee) => handleSelect(fee as FeeType)}
            options={feeOptions}
            label={translate("modify_default_fee")}
        />
    );
};

export default SelectFee;
