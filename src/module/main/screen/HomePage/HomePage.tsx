import Button from "module/common/component/input/Button/Button";
import BasePage from "module/common/component/layout/BasePage/BasePage";
import { useAuth } from "module/auth/hook/useAuth";
import {
    View,
    Text,
    ScrollView,
    Dimensions,
    FlatList,
    StyleSheet,
    NativeScrollEvent,
    Animated,
    ViewToken,
    useWindowDimensions,
} from "react-native";
import { createRef, useEffect, useRef, useState } from "react";
import { Row } from "react-native-components";
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
interface PaginatorProps {
    scrollX: Animated.Value;
}
const Paginator = ({ scrollX }: PaginatorProps) => {
    const { width } = useWindowDimensions();

    return (
        <View style={{ flexDirection: "row", height: 64 }}>
            {DATA.map((_, i) => {
                //PreviousDot, currentDot, nextDot
                const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [10, 20, 10],
                    extrapolate: "clamp",
                });

                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.3, 1, 0.3],
                    extrapolate: "clamp",
                });

                return (
                    <Animated.View
                        style={[
                            styles.dot,
                            {
                                width: dotWidth,
                                opacity,
                            },
                        ]}
                        key={i.toString()}
                    />
                );
            })}
        </View>
    );
};

const HomePage = (): JSX.Element => {
    const { logout } = useAuth();
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const flatListRef = createRef<FlatList<any>>();
    const scrollX = useRef(new Animated.Value(0)).current;

    const onViewRef = useRef((info: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
        if (info && info.viewableItems[0]) setActiveIndex(info.viewableItems[0]?.index || 0);
    });

    const viewConfig = useRef({ waitForInteraction: true, viewAreaCoveragePercentThreshold: 50 });
    return (
        <BasePage appearance="light" showIcons>
            <Button onPress={logout}>Log out</Button>
            <View style={styles.container}>
                <FlatList
                    ref={flatListRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    renderItem={({ item }) => {
                        return <Item item={item} />;
                    }}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                        useNativeDriver: false,
                    })}
                    bounces={false}
                    scrollEventThrottle={32}
                    keyExtractor={(item) => item.title}
                    data={DATA}
                    onViewableItemsChanged={onViewRef.current}
                    viewabilityConfig={viewConfig.current}
                />
            </View>
            <Row justifyContent="center" alignItems="center"> 
                <Paginator scrollX={scrollX} />
            </Row>
        </BasePage>
    );
};
const styles = StyleSheet.create({
    container: {
        height: 200,
    },
    item: {
        width: Dimensions.get("window").width * 0.8,
        borderWidth: 2,
        borderRadius: 20,
        marginVertical: 8,
        marginHorizontal: Dimensions.get("window").width * 0.1,
    },
    item1: {
        backgroundColor: "blue",
    },
    item2: {
        backgroundColor: "yellow",
    },
    title: {
        fontSize: 32,
    },
    dot: {
        height: 10,
        borderRadius: 5,
        backgroundColor: "#000",
        marginHorizontal: 4,
    },
});
export default HomePage;
