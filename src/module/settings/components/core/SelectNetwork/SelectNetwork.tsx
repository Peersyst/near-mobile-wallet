import SelectGroup from "module/common/component/input/SelectGroup/SelectGroup";
import { Alert } from "react-native";

const SelectNetwork = (): JSX.Element => {
    const options = ["testnet", "mainnet"];
    return <SelectGroup options={options} title="Select your network" onChange={(value) => Alert.alert(`Switched to ${value} network`)} />;
};

export default SelectNetwork;
