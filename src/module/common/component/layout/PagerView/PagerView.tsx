import BasePagerView, { PagerViewProps } from "react-native-pager-view";
import { Col } from "react-native-components";
import { Children, useState } from "react";
import { NativeSyntheticEvent, View, ViewStyle } from "react-native";
import { PagerViewOnPageSelectedEventData } from "react-native-pager-view/src/types";
import DottedPagination from "module/common/component/display/DottedPagination/DottedPagination";

const PagerView = ({
    children,
    showPageIndicator,
    style,
    onPageSelected,
    initialPage = 0,
    height,
    ...rest
}: PagerViewProps & { height: ViewStyle["height"] }): JSX.Element => {
    const [currentPage, setCurrentPage] = useState(initialPage);
    const handlePageSelected = (e: NativeSyntheticEvent<PagerViewOnPageSelectedEventData>) => {
        setCurrentPage(e.nativeEvent.position);
        onPageSelected?.(e);
    };

    return (
        <Col style={[style, { height }]} gap={10}>
            <BasePagerView style={{ flex: 1 }} initialPage={initialPage} onPageSelected={handlePageSelected} {...rest}>
                {Children.map(children, (child, key) => (
                    <View style={{ alignItems: "center" }} collapsable key={key}>
                        {child}
                    </View>
                ))}
            </BasePagerView>
            {showPageIndicator && <DottedPagination pages={Children.count(children)} currentPage={currentPage + 1} />}
        </Col>
    );
};

export default PagerView;
