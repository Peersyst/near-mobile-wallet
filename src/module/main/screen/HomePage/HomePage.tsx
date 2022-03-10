import Button from "module/common/component/input/Button/Button";
import BasePage from "module/common/component/layout/BasePage/BasePage";
import { useSetRecoilState } from "recoil";
import walletState from "module/wallet/state/WalletState";
import { WalletStorage } from "module/wallet/WalletStorage";
import { Col } from "react-native-components";
import MainSlider from "module/main/component/core/MainSlider";
import { MAIN_SCREEN_PADDING } from "module/main/MainNavigatorGroup";
import {View, StyleSheet} from "react-native";

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
    {
        id: "4",
        title: "Third Item",
    },
    {
        id: "5",
        title: "Third Item",
    },
];
interface ItemProps {
    item: {
        id?: string;
        title?: string;
    };
}
const Item = ({ item }: ItemProps): JSX.Element => {
    const flattenStyle = StyleSheet.flatten([styles.item, item.id === "1" && styles.item1, item.id === "2" && styles.item2]);
    return <View style={flattenStyle} />;
};


const HomePage = (): JSX.Element => {
    const setWalletState = useSetRecoilState(walletState);
    return (
        <BasePage appearance="light" showIcons>
            <Button onPress={() => setWalletState((state) => ({ ...state, isAuthenticated: false }))}>Log out</Button>
            <Button
                onPress={async () => {
                    await WalletStorage.clear();
                    setWalletState({ isAuthenticated: false, hasWallet: false, name: undefined });
                }}
            >
                Erase
            </Button>
            <MainSlider />
            <Col style={{ paddingHorizontal: MAIN_SCREEN_PADDING }}>
                <Button onPress={() => setWalletState((state) => ({ ...state, isAuthenticated: false }))}>Log out</Button>
            </Col>
        </BasePage>
    );
};

export default HomePage;
