import BaseDAppsScreen from "module/dapp/components/layout/BaseDAppsScreen";
import DAppsScreenCTA from "./DAppsScreenCTA/DAppsScreenCTA";
import FavouritesDApps from "module/dapp/containers/FavouritesDApps/FavouritesDApps";
import { Col } from "@peersyst/react-native-components";
import SearchModal from "module/dapp/containers/SearchModal/SearchModal";
import DAppsScreenHeader from "./DAppsScreenHeader/DAppsScreenHeader";
import { useDAppsScreen } from "./hooks/useDAppsScreen";

const DAppsScreen = (): JSX.Element => {
    const { handleOnOpen, setOpen, open, handleOnClose, setSearch, onRefresh } = useDAppsScreen();

    return (
        <>
            <BaseDAppsScreen onRefresh={onRefresh}>
                <Col flex={1} gap={20}>
                    <DAppsScreenHeader onPress={() => setOpen(true)} />
                    <DAppsScreenCTA />
                    <FavouritesDApps />
                </Col>
            </BaseDAppsScreen>
            <SearchModal open={open} onOpen={handleOnOpen} onClose={handleOnClose} onSearch={setSearch} />
        </>
    );
};

export default DAppsScreen;
