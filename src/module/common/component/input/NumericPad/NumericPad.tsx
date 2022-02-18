import { useState } from "react";
import { View } from "react-native";
import { Col } from "react-native-components";
import PasswordLayout, { ZeroToFour } from "../../layout/PasswordLayout/PasswordLayout";
import PadItem from "../PadItem/PadItem";
import { PadItemType, zeroToNine } from "../PadItem/PadItem.types";
import { Keyboard } from "./NumericPad.styles";

const NumericPad = (): JSX.Element => {
    const [password, setPassword] = useState<string>("");
    const zeroToFour: ZeroToFour[] = [0, 1, 2, 3, 4];

    const hadleClick = (item: PadItemType) => {
        console.log(item)

        switch (item) {
            case "X":
                setPassword("");
                return;
            case "<":
                if (password.length != 0) setPassword(password.slice(0, -1));
                return;
            default:
                if (password.length + 1 === 4) {
                    //TODO: check pw
                }
                setPassword(password + item);
        }
    };

    return (
        <Col gap={40}>
            <View style={{ alignItems: "center" }}>
                <PasswordLayout activated={zeroToFour[password.length]} />
            </View>
            <Keyboard>
                {zeroToNine.map((num, i) => {
                    return i > 0 && <PadItem onPress={()=>hadleClick("2")} key={Math.random() * 1000 + i} item={num} />;
                })}
                <PadItem item={"X"} onPress={() => hadleClick("X")} />
                <PadItem item={"0"} onPress={() => hadleClick("0")} />
                <PadItem item={"<"} onPress={() => hadleClick("<")} />
            </Keyboard>
        </Col>
    );
};

export default NumericPad;
