import BaseMainScreen from "module/main/component/layout/BaseMainScreen/BaseMainScreen";
import BigNewsCard from "module/news/component/display/BigNewsCard/BigNewsCard";
import useGetNews from "module/news/query/useGetNews";
import { useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import SimpleNewsCard from "../../component/display/SimpleNewsCard/SimpleNewsCard";
import { NewsScreenRoot } from "./NewsScreen.styles";

const NewsScreen = (): JSX.Element => {
    const { data = [], isLoading, refetch } = useGetNews();
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };

    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <BaseMainScreen title={"News"}>
                <NewsScreenRoot>
                    {data.map((New, index) => {
                        return index % 3 === 0 ? (
                            <BigNewsCard loading={isLoading || refreshing} {...New} key={index} />
                        ) : (
                            <SimpleNewsCard {...New} loading={isLoading || refreshing} key={index} />
                        );
                    })}
                </NewsScreenRoot>
            </BaseMainScreen>
        </ScrollView>
    );
};

export default NewsScreen;
