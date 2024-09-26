import BaseDAppsScreen from "module/dapp/components/layout/BaseDAppsScreen";
import { DAppsScreenHeaderWrapper } from "./DAppsScreen.styles";
import Typography from "module/common/component/display/Typography/Typography";
import SearchBar from "module/common/component/input/SearchBar/SearchBar";
import DAppsScreenCTA from "./DAppsScreenCTA/DAppsScreenCTA";
import FavouritesDApps from "module/dapp/containers/FavouritesDApps/FavouritesDApps";
import { Col, ScrollView } from "@peersyst/react-native-components";

const DAppsScreen = (): JSX.Element => {
    return (
        <ScrollView>
            <BaseDAppsScreen>
                <Col flex={1} gap={20}>
                    <DAppsScreenHeaderWrapper>
                        <Typography variant="body2Strong">Discover new apps</Typography>
                        <SearchBar placeholder="Search or type and URL" />
                        <DAppsScreenCTA />
                    </DAppsScreenHeaderWrapper>
                    <FavouritesDApps />
                </Col>
            </BaseDAppsScreen>
        </ScrollView>
    );
};

export default DAppsScreen;
