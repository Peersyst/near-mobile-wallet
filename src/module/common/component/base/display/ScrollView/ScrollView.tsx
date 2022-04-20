import {
    RefreshControl,
    RefreshControlPropsAndroid,
    RefreshControlPropsIOS,
    ScrollView as BaseScrollView,
    ScrollViewProps as BaseScrollViewProps,
    TouchableWithoutFeedback,
} from "react-native";
import { useState } from "react";

export interface ScrollViewProps extends Omit<BaseScrollViewProps, "refreshControl" | "refreshing"> {
    refreshControlProps?: RefreshControlPropsIOS & RefreshControlPropsAndroid;
    loading?: boolean;
    onRefresh?: () => Promise<any>;
}

const ScrollView = ({ onRefresh, loading = false, refreshControlProps, children, ...rest }: ScrollViewProps): JSX.Element => {
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = async () => {
        setRefreshing(true);
        await onRefresh?.();
        setRefreshing(false);
    };

    return (
        <BaseScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }} horizontal scrollEnabled={false}>
            <BaseScrollView
                refreshControl={
                    onRefresh ? (
                        <RefreshControl refreshing={loading || refreshing} onRefresh={handleRefresh} {...refreshControlProps} />
                    ) : undefined
                }
                {...rest}
            >
                <TouchableWithoutFeedback>{children}</TouchableWithoutFeedback>
            </BaseScrollView>
        </BaseScrollView>
    );
};

export default ScrollView;
