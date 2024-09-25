import BaseDAppsScreen from "module/dapp/components/layout/BaseDAppsScreen";
import { DAppsScreenHeaderWrapper } from "./DAppsScreen.styles";
import Typography from "module/common/component/display/Typography/Typography";
import SearchBar from "module/common/component/input/SearchBar/SearchBar";
import DAppsScreenCTA from "./DAppsScreenCTA/DAppsScreenCTA";

const DAppsScreen = (): JSX.Element => {
    return (
        <BaseDAppsScreen>
            <DAppsScreenHeaderWrapper flex={1}>
                <Typography variant="body2Strong">Discover new apps</Typography>
                <SearchBar placeholder="Search or type and URL" />
                <DAppsScreenCTA />
            </DAppsScreenHeaderWrapper>
        </BaseDAppsScreen>
    );
};

export default DAppsScreen;
