import { useRef } from "react";
import { Animated, FlatList } from "react-native";
import { Col } from "react-native-components";
import { SliderProps } from "./Slider.types";
import SliderPagination from "./SliderPagination/SliderPagination";

const Slider = ({
    data,
    renderItem,
    keyExtractor,
    dotColor,
    style,
    showPaginaton = true,
    pagginationGap = 14,
}: SliderProps): JSX.Element => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const viewConfig = useRef({ waitForInteraction: true, viewAreaCoveragePercentThreshold: 50 });
    return (
        <Col gap={(showPaginaton && pagginationGap) || undefined}>
            <FlatList
                style={style}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                renderItem={renderItem}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                    useNativeDriver: false,
                })}
                bounces={false}
                scrollEventThrottle={32}
                keyExtractor={keyExtractor}
                data={data}
                viewabilityConfig={viewConfig.current}
            />
            {showPaginaton && <SliderPagination dotColor={dotColor} data={data} scrollX={scrollX} />}
        </Col>
    );
};

export default Slider;
