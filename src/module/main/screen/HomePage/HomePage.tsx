import Button from "module/common/component/input/Button/Button";
import BasePage from "module/common/component/layout/BasePage/BasePage";
import { View, StyleSheet } from "react-native";
import PagerView from "module/common/component/layout/PagerView/PagerView";
import { useSetRecoilState } from "recoil";
import walletState from "module/wallet/state/WalletState";

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
            <Button onPress={() => setWalletState((state) => ({ ...state, isAuthenticated: false }))}>Log out</Button>
            <PagerView showPageIndicator height={200}>
                {DATA.map((item, i) => (
                    <></>
                ))}
            </PagerView>
        </BasePage>
    );
};

export default HomePage;
