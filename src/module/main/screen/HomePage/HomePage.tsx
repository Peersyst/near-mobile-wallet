import Button from "module/common/component/input/Button/Button";
import BasePage from "module/common/component/layout/BasePage/BasePage";
import { useAuth } from "module/auth/hook/useAuth";
import { View, Dimensions, StyleSheet } from "react-native";
import Slider from "module/common/component/layout/Slider/Slider";

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
    }
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
    const { logout } = useAuth();
    return (
        <BasePage appearance="light" showIcons>
            <Button onPress={logout}>Log out</Button>
            <Slider data={DATA} renderItem={({ item }) => <Item item={item} />} />
        </BasePage>
    );
};
const styles = StyleSheet.create({
    item: {
        width: Dimensions.get("window").width * 0.9,
        height: 180,
        borderWidth: 2,
        borderRadius: 20,
        marginHorizontal: Dimensions.get("window").width * 0.05,
    },
    item1: {
        backgroundColor: "blue",
    },
    item2: {
        backgroundColor: "yellow",
    },
});

export default HomePage;
