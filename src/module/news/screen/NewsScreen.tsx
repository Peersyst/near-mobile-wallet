import { translate } from "locale";
import EmptyListComponent from "module/common/component/display/EmptyListComponent/EmptyListComponent";
import BaseMainScreen from "module/main/component/layout/BaseMainScreen/BaseMainScreen";
import useGetNews from "module/news/query/useGetNews";
import { Animated, List, ScrollView } from "react-native-components";
import SimpleNewsCard from "../component/display/SimpleNewsCard/SimpleNewsCard";
import { NewsScreenRoot, NewsSpacer } from "./NewsScreen.styles";

const AnimatedSimpleNewsCard = Animated.createAnimatedComponent.fade(SimpleNewsCard, { duration: 300, appear: true });

const NewsScreen = (): JSX.Element => {
    const { data = [], refetch, isLoading } = useGetNews();

    return (
        <ScrollView refreshControlProps={{ tintColor: "black" }} onRefresh={refetch}>
            <BaseMainScreen title={translate("news")}>
                <NewsScreenRoot>
                    <List
                        renderItem={({ item, index }) => {
                            return <AnimatedSimpleNewsCard loading={isLoading} in {...item} key={index} />;
                        }}
                        scrollEnabled={false}
                        keyExtractor={(_, index) => index.toString()}
                        data={isLoading ? new Array(5).fill({}) : data}
                        ItemSeparatorComponent={() => <NewsSpacer />}
                        ListFooterComponent={() => <NewsSpacer style={{ paddingTop: "30%" }} />}
                        ListEmptyComponent={isLoading ? undefined : <EmptyListComponent message={translate("no_news")} />}
                    />
                </NewsScreenRoot>
            </BaseMainScreen>
        </ScrollView>
    );
};

export default NewsScreen;
