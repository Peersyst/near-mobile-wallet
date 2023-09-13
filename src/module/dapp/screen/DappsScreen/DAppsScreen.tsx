import RecommendedDApps from "module/signer/containers/RecommendedDApps/RecommendedDApps";
import { DAppsScreenRoot } from "./DAppsScreen.styles";

const DAppsScreen = (): JSX.Element => {
    return (
        <DAppsScreenRoot>
            <RecommendedDApps />
        </DAppsScreenRoot>
    );
};

export default DAppsScreen;
