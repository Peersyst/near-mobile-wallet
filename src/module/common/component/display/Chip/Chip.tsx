import { Text } from "react-native";
import { ChipProps } from "./Chip.types";

const Chip = ({ title, appearance="light" }: ChipProps): JSX.Element => {
    return <Text>{title}</Text>;
};

export default Chip;
