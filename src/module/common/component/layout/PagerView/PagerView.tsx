import BasePagerView, { PagerViewProps as BasePagerViewProps } from "react-native-pager-view";
import { Col, ColProps } from "react-native-components";
import { Children, useEffect, useRef } from "react";
import { NativeSyntheticEvent, View, ViewStyle } from "react-native";
import { PagerViewOnPageSelectedEventData } from "react-native-pager-view/src/types";
import DottedPagination from "module/common/component/display/DottedPagination/DottedPagination";
import { useControlled } from "@peersyst/react-hooks";

interface PagerViewProps extends Omit<BasePagerViewProps, "onPageSelected"> {
    currentPage?: number;
    height: ViewStyle["height"];
    gap?: ColProps["gap"];
    onPageSelected?: (page: number) => void;
    pagePadding?: {
        all?: ViewStyle["padding"];
        top?: ViewStyle["paddingTop"];
        bottom?: ViewStyle["paddingTop"];
        left?: ViewStyle["paddingTop"];
        right?: ViewStyle["paddingTop"];
        vertical?: ViewStyle["paddingTop"];
        horizontal?: ViewStyle["paddingTop"];
    };
}

const PagerView = ({
    currentPage: currentPageProp,
    children,
    showPageIndicator,
    style,
    onPageSelected,
    initialPage = 0,
    height,
    pageMargin,
    gap = 10,
    pagePadding: {
        all: padding,
        top: paddingTop,
        left: paddingLeft,
        bottom: paddingBottom,
        right: paddingRight,
        horizontal: paddingHorizontal,
        vertical: paddingVertical,
    } = {},
    ...rest
}: PagerViewProps): JSX.Element => {
    const [currentPage, setCurrentPage] = useControlled(initialPage, currentPageProp, onPageSelected);
    const pagerViewRef = useRef<BasePagerView | null>(null);

    useEffect(() => {
        if (currentPageProp !== undefined) pagerViewRef.current?.setPageWithoutAnimation(currentPage);
    }, [currentPageProp]);

    const handlePageSelected = (e: NativeSyntheticEvent<PagerViewOnPageSelectedEventData>) => {
        setCurrentPage?.(e.nativeEvent.position);
    };

    return (
        <Col style={[style, { height }]} gap={gap}>
            <BasePagerView
                style={{ flex: 1 }}
                pageMargin={pageMargin}
                initialPage={initialPage}
                onPageSelected={handlePageSelected}
                ref={(r) => (pagerViewRef.current = r)}
                {...rest}
            >
                {Children.map(children, (child, key) => (
                    <View
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            padding,
                            paddingTop,
                            paddingLeft,
                            paddingBottom,
                            paddingRight,
                            paddingHorizontal,
                            paddingVertical,
                        }}
                        collapsable
                        key={key}
                    >
                        {child}
                    </View>
                ))}
            </BasePagerView>
            {showPageIndicator && <DottedPagination pages={Children.count(children)} currentPage={currentPage + 1} />}
        </Col>
    );
};

export default PagerView;
