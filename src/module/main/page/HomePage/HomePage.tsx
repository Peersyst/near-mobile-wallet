import Button from "module/common/component/input/Button/Button";
import BasePage from "module/common/component/layout/BasePage/BasePage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamsList } from "stack-navigator";

const HomePage = (): JSX.Element => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

    return (
        <BasePage appearance="light" showIcons>
            <Button onPress={() => navigation.navigate("Login")}>Log out</Button>
        </BasePage>
    );
};

export default HomePage;
