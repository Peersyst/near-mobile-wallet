import { View, StyleSheet } from "react-native";
import PagerView from "module/common/component/layout/PagerView/PagerView";
import BaseMainScreen from "module/main/component/layout/BaseMainScreen/BaseMainScreen";
import { Col } from "react-native-components";
import MainTabs from "module/main/component/navigation/MainTabs/MainTabs";
import { CardBackground } from "./HomeScreen.styles";

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

const HomeScreen = (): JSX.Element => {
    return (
        <BaseMainScreen>
            <Col flex={1} gap={20}>
                <PagerView showPageIndicator height={200}>
                    {DATA.map((item, i) => (
                        <Item item={item} key={i} />
                    ))}
                </PagerView>
                <MainTabs />
                <CardBackground />
            </Col>
        </BaseMainScreen>
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

export default HomeScreen;
