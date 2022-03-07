import Button from "module/common/component/input/Button/Button";
import BasePage from "module/common/component/layout/BasePage/BasePage";
import AddAccountCard from "module/wallet/component/input/AddAccountCard/AddAccountCard";
import { Col } from "react-native-components";
import { ScrollView } from "react-native";
import Slider from "module/common/component/layout/Slider/Slider";
import { useSetRecoilState } from "recoil";
import walletState from "module/wallet/state/WalletState";
import AccountCard from "module/wallet/component/core/AccountCard/AccountCard";

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
    const setWalletState = useSetRecoilState(walletState);
    return (
        <BasePage appearance="light" showIcons>
            <ScrollView>
                <Slider
                    style={{ marginTop: "4%" }}
                    pagginationGap={0}
                    keyExtractor={(item) => item.id}
                    data={DATA}
                    renderItem={() => <AccountCard />}
                />
                <Col style={{ paddingHorizontal: "5%" }}>
                    <Button onPress={() => setWalletState((state) => ({ ...state, isAuthenticated: false }))}>Log out</Button>
                </Col>
            </ScrollView>
        </BasePage>
    );
};

export default HomePage;
