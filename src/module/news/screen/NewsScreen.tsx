import EmptyListComponent from "module/common/component/display/EmptyListComponent/EmptyListComponent";
import BaseMainScreen from "module/main/component/layout/BaseMainScreen/BaseMainScreen";
import useGetNews from "module/news/query/useGetNews";
import { Animated } from "@peersyst/react-native-components";
import SimpleNewsCard from "../component/display/SimpleNewsCard/SimpleNewsCard";
import { NewsList, NewsSpacer } from "./NewsScreen.styles";

const AnimatedSimpleNewsCard = Animated.createAnimatedComponent.fade(SimpleNewsCard, { duration: 300, appear: true });

const NewsScreen = (): JSX.Element => {
    const { data = [], refetch, isLoading } = useGetNews();
    return (
        <BaseMainScreen>
            <NewsList
                renderItem={({ item, index }) => {
                    return <AnimatedSimpleNewsCard loading={isLoading} in {...item} key={index} />;
                }}
                refreshControlProps={{ tintColor: "black" }}
                onRefresh={refetch}
                keyExtractor={(_, index) => index.toString()}
                data={isLoading ? new Array(5).fill({}) : data}
                ItemSeparatorComponent={() => <NewsSpacer />}
                ListFooterComponent={() => <NewsSpacer style={{ paddingTop: 40 }} />}
                ListEmptyComponent={isLoading ? undefined : <EmptyListComponent />}
            />
        </BaseMainScreen>
    );
};

export default NewsScreen;
