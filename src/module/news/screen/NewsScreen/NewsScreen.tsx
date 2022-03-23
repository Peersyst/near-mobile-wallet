import { translate } from "locale";
import BaseMainScreen from "module/main/component/layout/BaseMainScreen/BaseMainScreen";
import useGetNews from "module/news/query/useGetNews";
import { useFormatNews } from "module/news/utils/useFormatNews";
import { useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { Animated } from "react-native-components";
import SimpleNewsCard from "../../component/display/SimpleNewsCard/SimpleNewsCard";
import { NewsScreenRoot } from "./NewsScreen.styles";

const AnimatedSimpleNewsCard = Animated.createAnimatedComponent.fade(SimpleNewsCard, { duration: 300, appear: true });

const NewsScreen = (): JSX.Element => {
    const { data = [], refetch } = useGetNews();
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };

    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <BaseMainScreen title={translate("news")}>
                <NewsScreenRoot>
                    {data.map((News, index) => {
                        let formatedNew = useFormatNews(News);
                        return  <AnimatedSimpleNewsCard in {...formatedNew}  key={index} />
                    })}
                </NewsScreenRoot>
            </BaseMainScreen>
        </ScrollView>
    );
};

export default NewsScreen;
