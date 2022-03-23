import { translate } from "locale";
import EmptyListComponent from "module/common/component/display/EmptyListComponent/EmptyListComponent";
import BaseMainScreen from "module/main/component/layout/BaseMainScreen/BaseMainScreen";
import useGetNews from "module/news/query/useGetNews";
import { useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { Animated, List } from "react-native-components";
import SimpleNewsCard from "../../component/display/SimpleNewsCard/SimpleNewsCard";
import { NewsScreenRoot, NewsSpacer } from "./NewsScreen.styles";

const AnimatedSimpleNewsCard = Animated.createAnimatedComponent.fade(SimpleNewsCard, { duration: 300, appear: true });

const NewsScreen = (): JSX.Element => {
    const { data = [], refetch, isLoading } = useGetNews();
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
                    <List
                        renderItem={({ item, index }) => {
                            return <AnimatedSimpleNewsCard loading={isLoading} in {...item} key={index} />;
                        }}
                        keyExtractor={(item) => item.title}
                        data={data}
                        ItemSeparatorComponent={() => <NewsSpacer />}
                        ListFooterComponent={() => <NewsSpacer style={{ paddingTop: "30%" }} />}
                        ListEmptyComponent={<EmptyListComponent message={translate("no_news")} />}
                    />
                </NewsScreenRoot>
            </BaseMainScreen>
        </ScrollView>
    );
};

export default NewsScreen;
