import SelectGroup from "module/common/component/input/SelectGroup/SelectGroup";
import settingsState, { NetworkType } from "module/settings/state/SettingsState";
import { useRecoilState } from "recoil";

const SelectNetwork = (): JSX.Element => {
    const options: NetworkType[] = ["testnet", "mainnet"];
    const [state, setState] = useRecoilState(settingsState);
    return <SelectGroup options={options} label="Select your network" onChange={(value) => setState({...state, network: value as NetworkType})} />;
};

export default SelectNetwork;
