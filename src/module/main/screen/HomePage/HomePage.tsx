import Button from "module/common/component/input/Button/Button";
import BasePage from "module/common/component/layout/BasePage/BasePage";
import { useAuth } from "module/auth/hook/useAuth";
import Slider from "module/common/component/layout/Slider/Slider";
import AddAccountCard from "module/common/component/input/AddAccountCard/AddAccountCard";
import { Col } from "react-native-components";
import { ScrollView } from "react-native";

const DATA = [
    {
        id: "0",
        title: "First Item",
    },
    {
        id: "1",
        title: "Second Item",
    },
    {
        id: "2",
        title: "Third Item",
    },
    {
        id: "3",
        title: "Third Item",
    },
];

const HomePage = (): JSX.Element => {
    const { logout } = useAuth();

    return (
        <BasePage appearance="light" showIcons>
            <ScrollView>
                <Slider
                    style={{ marginTop: "4%" }}
                    pagginationGap={0}
                    keyExtractor={(item) => item.id}
                    data={DATA}
                    renderItem={() => <AddAccountCard />}
                />
                <Col style={{ paddingHorizontal: "5%" }}>
                    <Button onPress={logout}>Log out</Button>
                </Col>
            </ScrollView>
        </BasePage>
    );
};

export default HomePage;
