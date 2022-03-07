import Button from "module/common/component/input/Button/Button";
import BasePage from "module/common/component/layout/BasePage/BasePage";
import { useAuth } from "module/auth/hook/useAuth";
import { View, Text, ScrollView, Dimensions, FlatList, StyleSheet, NativeScrollEvent, Animated } from "react-native";
import { createRef, useEffect, useRef, useState } from "react";
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

const HomePage = (): JSX.Element => {
    const { logout } = useAuth();
    const [activeIndex, setActiveIndex] = useState<number>();
    const flatListRef = createRef<FlatList<any>>();

    // const onChange = (nativeEvent: NativeScrollEvent) => {
    //     const offset = nativeEvent.contentOffset.x;
    //     const layoutWidth = nativeEvent.layoutMeasurement.width;
    //     const slide: number = Math.ceil(offset / layoutWidth);
    //     console.log("1");
    //     if (slide !== activeIndex) {
    //         setActiveIndex(slide);
    //     }
    // };

    // const onDragEnd = (nativeEvent: NativeScrollEvent) => {
    //     // if (activeIndex === 2 && nativeEvent.velocity && nativeEvent.velocity.x < -1) {
    //     //     flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
    //     // }
    //     // const offset = nativeEvent.contentOffset.x;
    //     // const layoutWidth = nativeEvent.layoutMeasurement.width;
    //     // const slide: number = Math.ceil(offset / layoutWidth);
    //     // if (slide !== activeIndex) {
    //     //     setActiveIndex(slide);
    //     // }
    // };

    const scrollX = useRef(new Animated.Value(0)).current;
    return (
        <BasePage appearance="light" showIcons>
            <Button onPress={logout}>Log out</Button>
            <View style={styles.container}>
                <FlatList
                    ref={flatListRef}
                    horizontal
                    // onScroll={({ nativeEvent }) => onChange(nativeEvent)}
                    // onScrollBeginDrag={({ nativeEvent }) => console.log("Start", nativeEvent.velocity?.x)}
                    //onScrollEndDrag={({ nativeEvent }) => onDragEnd(nativeEvent)}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    renderItem={({ item }) => {
                        return <Item item={item} />;
                    }}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                        useNativeDriver: false,
                    })}
                    bounces={false}
                    keyExtractor={(item) => item.title}
                    data={DATA}
                />
            </View>
            <Text>{activeIndex}</Text>
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
});
export default HomePage;
