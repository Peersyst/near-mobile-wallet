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
            <PagerView showPageIndicator height={200}>
                {DATA.map((item, i) => (
                    <Item item={item} key={i} />
                ))}
            </PagerView>
        </BasePage>
    );
};
const styles = StyleSheet.create({
    item: {
        width: "90%",
        height: 180,
        borderWidth: 2,
        borderRadius: 20,
    },
    item1: {
        backgroundColor: "blue",
    },
    item2: {
        backgroundColor: "yellow",
    },
});

export default HomePage;
