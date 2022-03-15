import Select from "module/common/component/input/Select/Select";
import { Paper, SelectItem } from "react-native-components";

const SendToAddressScreen = () => {
    return (
        <Paper>
            <Select placeholder="Select" title="Select a letter">
                <SelectItem value="A">A</SelectItem>
                <SelectItem value="B">B</SelectItem>
                <SelectItem value="C">C</SelectItem>
                <SelectItem value="D">D</SelectItem>
                <SelectItem value="E">E</SelectItem>
                <SelectItem value="F">F</SelectItem>
                <SelectItem value="G">G</SelectItem>
            </Select>
        </Paper>
    );
};

export default SendToAddressScreen;
