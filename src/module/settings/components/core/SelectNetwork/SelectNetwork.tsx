import SelectGroup from "module/common/component/input/SelectGroup/SelectGroup";
import settingsState, { NetworkType } from "module/settings/state/SettingsState";
import { Alert } from "react-native";
import { useRecoilState, useSetRecoilState } from "recoil";

const SelectNetwork = (): JSX.Element => {
    const options: NetworkType[] = ["testnet", "mainnet"];
    const [value, setState] = useRecoilState(settingsState);
    console.log(value);
    return <SelectGroup options={options} title="Select your network" onChange={(value) => Alert.alert(`Switched to ${value} network`)} />;
};

export default SelectNetwork;
