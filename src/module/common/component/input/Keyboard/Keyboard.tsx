import { Dispatch, SetStateAction } from "react";
import { Row } from "../../base/layout/Row";
import PadItem from "../PadItem/PadItem";
import { PadItemType } from "../PadItem/PadItem.types";
import { KeyboardRoot } from "./Keyboard.styles";

export interface KeyboardProps {
    setValue: Dispatch<SetStateAction<string>>;
}

const Keyboard = ({ setValue }: KeyboardProps): JSX.Element => {
    const handlePress = async (item: PadItemType) => {
        switch (item) {
            case "X":
                setValue("");
                break;
            case "<":
                setValue((value) => (value.length > 0 ? value.slice(0, -1) : ""));
                break;
            default:
                setValue((value) => value + item);
                break;
        }
    };

    return (
        <KeyboardRoot>
            <Row>
                <PadItem item={"1"} onPress={() => handlePress("1")} />
                <PadItem item={"2"} onPress={() => handlePress("2")} />
                <PadItem item={"3"} onPress={() => handlePress("3")} />
            </Row>
            <Row>
                <PadItem item={"4"} onPress={() => handlePress("4")} />
                <PadItem item={"5"} onPress={() => handlePress("5")} />
                <PadItem item={"6"} onPress={() => handlePress("6")} />
            </Row>
            <Row>
                <PadItem item={"7"} onPress={() => handlePress("7")} />
                <PadItem item={"8"} onPress={() => handlePress("8")} />
                <PadItem item={"9"} onPress={() => handlePress("9")} />
            </Row>
            <Row>
                <PadItem item={"X"} onPress={() => handlePress("X")} />
                <PadItem item={"0"} onPress={() => handlePress("0")} />
                <PadItem item={"<"} onPress={() => handlePress("<")} />
            </Row>
        </KeyboardRoot>
    );
};

export default Keyboard;
