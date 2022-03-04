import Button from "module/common/component/input/Button/Button";
import BasePage from "module/common/component/layout/BasePage/BasePage";
import Breadcrumb from "module/common/component/display/Breadcrumb/Breadcrumb";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamsList } from "stack-navigator";
import { View, Text, Dimensions } from "react-native";

const Card = (): JSX.Element => {
    const width = Dimensions.get("window").width * 0.8;
    return (
        <View style={{borderRadius: 30, flex: 0.8, alignItems: "center", justifyContent: "center", backgroundColor: "white", width: width}}>
            <Text>My card</Text>
        </View>
    );
};

const HomePage = (): JSX.Element => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

    return (
        <BasePage appearance="light" showIcons>
            <View style={{ height: 200, backgroundColor: "red", alignItems: "center", justifyContent: "center"}}>
                <Card />
            </View>
            <Button onPress={() => navigation.navigate("Login")}>Log out</Button>
        </BasePage>
    );
};

export default HomePage;
