import {
    RefreshControl,
    RefreshControlPropsAndroid,
    RefreshControlPropsIOS,
    ScrollView as BaseScrollView,
    ScrollViewProps as BaseScrollViewProps,
} from "react-native";
import { useState } from "react";

export interface ScrollViewProps extends Omit<BaseScrollViewProps, "refreshControl" | "refreshing"> {
    refreshControlProps?: RefreshControlPropsIOS & RefreshControlPropsAndroid;
    loading?: boolean;
    onRefresh?: () => Promise<any>;
}

const ScrollView = ({ onRefresh, loading = false, refreshControlProps, ...rest }: ScrollViewProps): JSX.Element => {
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = async () => {
        setRefreshing(true);
        await onRefresh?.();
        setRefreshing(false);
    };

    return (
        <BaseScrollView
            refreshControl={<RefreshControl refreshing={loading || refreshing} onRefresh={handleRefresh} {...refreshControlProps} />}
            {...rest}
        />
    );
};

export default ScrollView;
