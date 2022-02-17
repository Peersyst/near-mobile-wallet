import PadItem from "module/common/component/input/PadItem/PadItem";
import PasswordLayout from "module/common/component/layout/PasswordLayout/PasswordLayout";
//import { useState } from "react";
import { Dimensions, FlatList, SafeAreaView, StatusBar, View } from "react-native";
import { Row } from "react-native-components";
import { ZeroToNine } from "module/common/component/input/PadItem/PadItem.types";
import { ReactElement } from "react";

const Data: { icon?: ReactElement; key?: string; num?: ZeroToNine }[] = [
    {
        num: 9,
    },
    {
        num: 8,
    },
    {
        num: 7,
    },
    {
        num: 6,
    },
    {
        num: 5,
    },
    {
        num: 4,
    },
];

const LoginPage = (): JSX.Element => {
    //const [password, setPassword] = useState("");

    return (
        <SafeAreaView
            style={{
                marginTop: StatusBar.currentHeight,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "black",
                height: "100%",
            }}
        >
            <View style={{ alignItems: "center" }}>
                <PasswordLayout activated={2} />
            </View>
            <View style={{ height: "40%" }}>
                <FlatList style={{ flex: 1 }} data={Data} numColumns={3} renderItem={({ item }) => <PadItem number={item.num} />} />
            </View>
        </SafeAreaView>
    );
};

export default LoginPage;
