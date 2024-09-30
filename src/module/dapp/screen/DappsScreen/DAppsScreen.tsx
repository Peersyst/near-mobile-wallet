import BaseDAppsScreen from "module/dapp/components/layout/BaseDAppsScreen";
import DAppsScreenCTA from "./DAppsScreenCTA/DAppsScreenCTA";
import FavouritesDApps from "module/dapp/containers/FavouritesDApps/FavouritesDApps";
import { Col, ScrollView } from "@peersyst/react-native-components";
import { useEffect, useState } from "react";
import SearchModal from "module/dapp/containers/SearchModal/SearchModal";
import useGetDAppsHistory from "module/dapp/query/useGetSearchHistory";
import useNavigation from "module/common/hook/useNavigation";
import { DAppScreens } from "module/dapp/navigator/DAppsNavigator.types";
import DAppsScreenHeader from "./DAppsScreenHeader/DAppsScreenHeader";

const DAppsScreen = (): JSX.Element => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const { navigate } = useNavigation();

    useGetDAppsHistory(); // Preload DApps history

    useEffect(() => {
        if (search && !open) {
            navigate(DAppScreens.WEBVIEW, { url: search });
        }
    }, [search, open]);

    function handleOnClose() {
        setOpen(false);
    }

    function handleOnOpen() {
        setSearch("");
        setOpen(true);
    }

    return (
        <>
            <ScrollView>
                <BaseDAppsScreen>
                    <Col flex={1} gap={20}>
                        <DAppsScreenHeader onPress={() => setOpen(true)} />
                        <DAppsScreenCTA />
                        <FavouritesDApps />
                    </Col>
                </BaseDAppsScreen>
            </ScrollView>
            <SearchModal open={open} onOpen={handleOnOpen} onClose={handleOnClose} onSearch={setSearch} />
        </>
    );
};

export default DAppsScreen;
